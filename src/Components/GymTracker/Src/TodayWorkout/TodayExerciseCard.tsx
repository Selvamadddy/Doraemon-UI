import type { WorkoutExercise } from "../../Model/Exercise";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";

interface TodayExerciseCardProp {
    exercise: WorkoutExercise;
    isSelected: boolean;
    setSelected: (id: number, exerciseId: number) => void
}

export default function TodayExerciseCard({ exercise, isSelected, setSelected }: TodayExerciseCardProp) {
    const exercises = useAppSelector(state => state.exercise);
    const exerciseData = exercises.find(x => x.id == exercise.exerciseId);
    return (
        <div key={exercise.id} className="col-md-6" onClick={() => setSelected(exercise.id, exerciseData == undefined ? 0 : exerciseData.id)}>
            <div className={`card p-3 border-1 rounded-4 ${isSelected ? " border-primary" : " border-light-subtle"}`}
                style={{ transform: isSelected ? "translateY(-6px)" : "", boxShadow: isSelected ? "0 8px 20px rgba(0, 0, 0, 0.12)" : "" }}>

                <div className="d-flex justify-content-between">
                    <img src={exerciseData == undefined ? "https://cdn-icons-png.flaticon.com/512/7922/7922326.png" : exerciseData.imageUrl != "" ? exerciseData.imageUrl : "https://cdn-icons-png.flaticon.com/512/7922/7922326.png"} 
                        alt={exerciseData == undefined ? "" : exerciseData.name} style={{ width: 48, height: 48, borderRadius: "30%", objectFit: "cover", background: "#e0e0e0", }} />
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
                        <div className="fw-bold">{exercise.weight}</div>
                    </div>
                    <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                        <small className="text-muted">SETS</small>
                        <div className="fw-bold">{exercise.sets} * {exercise.reps}</div>
                    </div>
                    <div className="bg-secondary-subtle w-100 rounded-2 ps-2 me-1 text-center">
                        <small className="text-muted">DURATION</small>
                        <div className="fw-bold">{exercise.duration} mins</div>
                    </div>
                </div>
            </div>
        </div>
    );
}