import { useMemo, useState } from "react";
import type { Exercise, SaveWorkout } from "../../Model/Exercise";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import TodayExerciseCard from "./TodayExerciseCard";
import DailyWorkoutPlanner from "../WorkoutSchedule/DailyWorkoutPlanner";
import { UpdateWorkoutExercise } from "../../../../ReduxManager/Slices/GymTracker/WorkoutSlice";
import NoWorkout from "./NoWorkout";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { SaveDailyWorkout } from "../../Api/GymTrackerApi";
import { useToast } from "../../../Common/ErrorToast/ToastContext";

const initialData: SaveWorkout = {
    id: 0,
    name: "kikoki",
    description: "",
    workoutDate: new Date,
    exercises: []
}

export default function TodayWorkoutTracker({ switchScreen }: { switchScreen: (screen: string) => void }) {
    const [selectedWorkoutExerciseId, setSelectedWorkoutExerciseId] = useState<number>();

    const exercises = useAppSelector(state => state.exercise);
    const workOuts = useAppSelector(state => state.workout);
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const todaySession = useMemo(() => {
        const todayStr = new Date().toDateString();

        return (
            workOuts.find(x =>
                new Date(x.workoutDate).toDateString() === todayStr
            ) ?? initialData
        );
    }, [workOuts]);

    const selectedWorkoutExercise = todaySession?.exercises?.find(
        x => x.id === selectedWorkoutExerciseId
    );

    const selectedExerciseData = useMemo(() => {
        return exercises.find(x => x.id === selectedWorkoutExercise?.id);
    }, [exercises, selectedWorkoutExercise]);

    const handleSelectedExercise = (id: number) => {
        setSelectedWorkoutExerciseId(id);
    };

    const handleSetCompletion = async(id: number) => {
        const existing = todaySession.exercises.find(x => x.id === id);

        if (existing) {
            var updatedExercise = {...existing, completedSets : (existing.completedSets || 0) + 1};
            updatedExercise.status = updatedExercise.sets == updatedExercise.completedSets
            dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise}));  

            if(updatedExercise.status)
            {
                var updatedSession = { ...todaySession, exercises: todaySession.exercises.map(x => x.id === id ? updatedExercise : x)};
                const response = await SaveDailyWorkout(updatedSession);
                if(response.status){
                    const id = response.data;
                    if(id != null && id != 0)
                    {
                        showToast("Saved Workout", "success");
                    }
                    else
                    {
                        showToast("Failed to save Workouts", "error");
                    }
                }
            }
        }
    };

    const handleCurrentWeight = (id: number, weight: number) => {
        const existing = todaySession.exercises.find(x => x.id === id);

        if (existing) {
            const updatedExercise = { ...existing, weight: weight};
            dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise}));
        }
    };

    const renderTooltip = (text: string) => (
        <Tooltip id="button-tooltip">
            {text}
        </Tooltip>
    );

    return (
        <>
            {todaySession.id == 0 ?
                <NoWorkout switchScreen={switchScreen} />
                :
                <>

                    <div className="container-fluid p-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <small className="text-primary">TODAY'S FOCUS</small>
                                        <h2 className="fw-bold">{todaySession.name}</h2>
                                        <p className="text-muted">
                                            {todaySession.description}
                                        </p>
                                    </div>
                                    <div>
                                        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("View Today's workouts")}>
                                            <div className="d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("ExerciseLibrary")}>
                                                <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>View All 🏋🏻‍♂️</span>
                                            </div>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("Edit workouts")}>
                                            <div className="ms-1 mt-2 d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("EditWorkout")}>
                                                <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>Edit 💪🏻</span>
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="row g-3 mt-3">
                                    {todaySession.exercises.map((ex) => (
                                        <TodayExerciseCard key={ex.id} exercise={ex} isSelected={ex.id == selectedWorkoutExercise?.id} setSelected={handleSelectedExercise} />
                                    ))}
                                </div>
                            </div>


                            {selectedWorkoutExercise != undefined && <div className="col-lg-4">
                                <div className="card p-4 shadow border-0">
                                    <h5 className="fw-bold mb-3">{selectedExerciseData?.name}</h5>

                                    {/* progress bar */}
                                    <div className="text-center mb-3">
                                        <div className="rounded-circle border border-4 border-primary d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: 120, height: 120 }}>
                                            <h3 className="fw-bold"> {selectedWorkoutExercise.completedSets}/{selectedWorkoutExercise?.sets} </h3>
                                        </div>
                                        <small className="text-muted">SETS DONE</small>
                                    </div>

                                    {/* Weight Control */}
                                    <div className="mb-3">
                                        <small className="text-muted">CURRENT WEIGHT (KG)</small>
                                        <div className="input-group">
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentWeight(selectedWorkoutExercise.id, selectedWorkoutExercise.weight - 1)}>
                                                -
                                            </button>
                                            <input className="form-control text-center" value={selectedWorkoutExercise?.weight} readOnly />
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentWeight(selectedWorkoutExercise.id, selectedWorkoutExercise.weight + 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* sets and reps */}
                                    <div className="mb-3">
                                        <small className="text-muted">REPS TRACKER</small>
                                        <div className="d-flex gap-2 mt-2">
                                            {Array.from({ length: selectedWorkoutExercise.completedSets }, (_, i) => (
                                                <span key={i} className="badge bg-primary p-3 rounded-circle">
                                                    {selectedWorkoutExercise.reps}
                                                </span>
                                            ))}

                                            {Array.from({ length: selectedWorkoutExercise.sets - selectedWorkoutExercise.completedSets }, (_, i) => (
                                                <span className="badge bg-light text-dark p-3 rounded-circle">
                                                    {selectedWorkoutExercise.reps}
                                                </span>
                                            ))}

                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="mb-3">
                                        <small className="text-muted">COACH NOTES</small>
                                        <textarea className="form-control" placeholder="How did this set feel?" />

                                    </div>

                                    <button className="btn btn-primary w-100 rounded-pill" onClick={() => handleSetCompletion(selectedWorkoutExercise.id)} disabled={selectedWorkoutExercise.sets <= selectedWorkoutExercise.completedSets}>
                                        {selectedWorkoutExercise.sets > selectedWorkoutExercise.completedSets ? "Completed Current Set" : "Completed Exercise"}
                                    </button>

                                </div>
                            </div>
                            }
                        </div>
                    </div>


                </>
            }
        </>
    );
};

