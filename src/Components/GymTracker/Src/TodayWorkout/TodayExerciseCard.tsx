import type { Exercise, WorkoutExercise } from "../../Model/Exercise";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import ExerciseModal from "../Exercise/ExerciseModal";
import { useCallback, useState } from "react";

interface TodayExerciseCardProp {
    exercise: WorkoutExercise;
    isSelected: boolean;
    setSelected: (id: number, exerciseId: number) => void
}

export default function TodayExerciseCard({ exercise, isSelected, setSelected }: TodayExerciseCardProp) {
    const [showExerciseDetail, setShowExerciseDetail] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const exercises = useAppSelector(state => state.exercise);
    const exerciseData = exercises.find(x => x.id == exercise.exerciseId);

    const OpenExerciseModal = useCallback((exercise: Exercise | undefined) => {
        setSelectedExercise(exercise == undefined ? exercises[0] : exercise);
        setShowExerciseDetail(true);
    }, []);

    const CloseExerciseModal = useCallback(() => {
        setShowExerciseDetail(false);
    }, []);

    return (
        <div key={exercise.id} className="col-md-6" onClick={() => setSelected(exercise.id, exerciseData == undefined ? 0 : exerciseData.id)}>
            <div className={`card p-3 border-1 rounded-4 ${isSelected ? " border-primary" : " border-light-subtle"}`}
                style={{ transform: isSelected ? "translateY(-6px)" : "", boxShadow: isSelected ? "0 8px 20px rgba(0, 0, 0, 0.12)" : "" }}>

                <div className="d-flex justify-content-between">
                    <img src={exerciseData == undefined ? "https://cdn-icons-png.flaticon.com/512/7922/7922326.png" : exerciseData.imageUrl != "" ? exerciseData.imageUrl : "https://cdn-icons-png.flaticon.com/512/7922/7922326.png"}
                        alt={exerciseData == undefined ? "" : exerciseData.name} onClick={() => OpenExerciseModal(exerciseData)}
                        style={{ width: 48, height: 48, borderRadius: "30%", objectFit: "cover", background: "#e0e0e0", cursor: "pointer"}} />
                    <span className={`badge P-1 ${isSelected && !exercise.status ? "bg-success" : exercise.status ? "bg-dark-subtle text-dark" : "bg-primary-subtle text-dark"}`}
                        style={{ fontWeight: "550", maxHeight: "1rem" }}>
                        {isSelected && !exercise.status ? "IN PROGRESS" : exercise.status ? "COMPLETED" : "UPCOMING"}
                    </span>
                </div>

                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                    {exerciseData?.name}
                </span>
                <small className="text-muted">
                    {exerciseData?.muscleGroup}
                </small>

                <div className="d-flex justify-content-between align-items-centre mt-3">
                    <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                        <small className="text-muted">WEIGHT</small>
                        <div className="fw-bold">{Math.max(...(exercise.sets.map(x => x.weight)))}</div>
                    </div>
                    <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                        <small className="text-muted">SETS</small>
                        <div className="fw-bold">{exercise.set} * {Math.max(...(exercise.sets.map(x => x.reps)))}</div>
                    </div>
                    <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                        <small className="text-muted">DURATION</small>
                        <div className="fw-bold">{Math.max(...(exercise.sets.map(x => x.duration)))}mins</div>
                    </div>
                </div>
                <span className="badge rounded-pill text-bg-secondary mt-2" style={{ width: "25%", cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target={`#collapseFilter-${exercise.id}`} aria-expanded="false" aria-controls="collapseFilter">
                    View all sets ⇣
                </span>
                <div className="collapse mt-1" id={`collapseFilter-${exercise.id}`}>
                    <div className="card card-body">
                        {exercise.sets.map(x =>
                            <div className="d-flex justify-content-between align-items-centre mt-3">
                            <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                                <small className="text-muted">WEIGHT</small>
                                <div className="fw-bold">{x.weight}</div>
                            </div>
                            <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                                <small className="text-muted">Reps</small>
                                <div className="fw-bold">{x.reps}</div>
                            </div>
                            <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                                <small className="text-muted">DURATION</small>
                                <div className="fw-bold">{x.duration}mins</div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <ExerciseModal show={showExerciseDetail} handleClose={CloseExerciseModal} exercise={selectedExercise} />
        </div>
    );
}