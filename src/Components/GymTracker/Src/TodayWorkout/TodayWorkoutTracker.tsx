import { useMemo, useState } from "react";
import type { Exercise, SaveWorkout } from "../../Model/Exercise";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import TodayExerciseCard from "./TodayExerciseCard";
import { UpdateWorkoutExercise } from "../../../../ReduxManager/Slices/GymTracker/WorkoutSlice";
import NoWorkout from "./NoWorkout";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { SaveDailyWorkout } from "../../Api/GymTrackerApi";
import { useToast } from "../../../Common/ErrorToast/ToastContext";
import TextInput from "../Common/TextInput";

const initialData: SaveWorkout = {
    id: 0,
    name: "kikoki",
    description: "",
    workoutDate: new Date,
    exercises: []
}

export default function TodayWorkoutTracker({ switchScreen }: { switchScreen: (screen: string) => void }) {
    const [selectedWorkoutExerciseId, setSelectedWorkoutExerciseId] = useState<number>();
    const [savingStatus, SetSavingStatus] = useState(false);

    const exercises = useAppSelector(state => state.exercise);
    const workOuts = useAppSelector(state => state.workout);
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const todaySession = useMemo(() => {
        return (workOuts.find(x => new Date(x.workoutDate).toDateString() === new Date().toDateString()) ?? initialData);
    }, [workOuts]);

    const OriginaltodaySession = useMemo(() => {
        return (workOuts.find(x => new Date(x.workoutDate).toDateString() === new Date().toDateString()) ?? initialData);
    }, [workOuts]);

    const selectedWorkoutExercise = todaySession?.exercises?.find(x => x.id === selectedWorkoutExerciseId);

    const selectedExerciseData = useMemo(() => {
        return exercises.find(x => x.id === selectedWorkoutExercise?.exerciseId);
    }, [exercises, selectedWorkoutExercise]);

    const currentSet = useMemo(() => {
        const set = selectedWorkoutExercise?.sets.find(x => !x.status);
        return set == undefined ? selectedWorkoutExercise?.sets[0] : set;
    }, [exercises, selectedWorkoutExercise]);

    const currentWeight = useMemo(() => {
        return currentSet == undefined ? 0 : currentSet.completedWeight > 0 ? currentSet.completedWeight : currentSet.weight;
    }, [currentSet]);

    const currentRep = useMemo(() => {
        return currentSet == undefined ? 0 : currentSet.completedReps > 0 ? currentSet.completedReps : currentSet.reps;
    }, [currentSet]);

    const handleSelectedExercise = (id: number) => {
        setSelectedWorkoutExerciseId(id);
    };

    const handleSetCompletion = async (exerciseId: number, setId: number) => {
        const existing = todaySession.exercises.find(x => x.id === exerciseId);

        if (!existing) return;

        const updatedSets = existing.sets.map(s => s.id === setId ? { ...s, status: true, isUpdated: true } : s);
        const completedSets = updatedSets.filter(s => s.status).length;
        const isExerciseCompleted = updatedSets.every(s => s.status);
        const updatedExercise = { ...existing, sets: updatedSets, completedSets, status: isExerciseCompleted, isUpdated: true };

        dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise }));

        const updatedSession = { ...todaySession, exercises: todaySession.exercises.map(x => x.id === exerciseId ? updatedExercise : x) };

        try {
            SetSavingStatus(true);
            const response = await SaveDailyWorkout(updatedSession);
            if (response.status && response.data) {
                showToast("Saved", "success");
            } else {
                showToast("Save failed", "error");
            }
        } catch (err) {
            showToast("Error saving workout", "error");
        } finally {
            SetSavingStatus(false);
        }
    };

    const handleReset = async (exerciseId: number) => {

        const existing = todaySession.exercises.find(x => x.id === exerciseId);
        if (!existing) return;

        // 1. Reset all sets
        const resetSets = existing.sets.map(s => ({
            ...s,
            completedReps: 0,
            completedWeight: 0,
            completedDuration: 0,
            status: false,
            isUpdated: true
        }));

        // 2. Reset exercise
        const updatedExercise = {
            ...existing,
            sets: resetSets,
            completedSets: 0,
            status: false,
            isUpdated: true
        };

        // 3. Update session
        const updatedSession = {
            ...todaySession,
            exercises: todaySession.exercises.map(x =>
                x.id === exerciseId ? updatedExercise : x
            )
        };

        try {
            SetSavingStatus(true);

            const response = await SaveDailyWorkout(updatedSession);

            if (response.status && response.data) {
                showToast("Workout Reset", "success");

                // 4. Update redux AFTER success
                dispatch(UpdateWorkoutExercise({
                    workoutid: todaySession.id,
                    exercise: updatedExercise
                }));
            } else {
                showToast("Failed to reset workout", "error");
            }

        } catch (err) {
            showToast("Error resetting workout", "error");
        } finally {
            SetSavingStatus(false);
        }
    };

    const handleCurrentWeight = (id: number, setId: number, weight: number) => {
        const existing = todaySession.exercises.find(x => x.id === id);

        if (existing && existing != undefined) {
            const updatedExercise = { ...existing, sets: existing.sets.map(s => s.id === setId ? { ...s, completedWeight: weight, isUpdated: true } : s) };
            dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise }));
        }
    };

    const handleCurrentRep = (id: number, setId: number, rep: number) => {
        const existing = todaySession.exercises.find(x => x.id === id);

        if (existing && existing != undefined) {
            const updatedExercise = { ...existing, sets: existing.sets.map(s => s.id === setId ? { ...s, completedReps: rep, isUpdated: true } : s) };
            dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise }));
        }
    };

    const handleNoteChange = (id: number, note: string) => {
        const existing = todaySession.exercises.find(x => x.id === id);

        if (existing) {
            const updatedExercise = { ...existing, note: note };
            dispatch(UpdateWorkoutExercise({ workoutid: todaySession.id, exercise: updatedExercise }));
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


                            {selectedWorkoutExercise != undefined && currentSet != undefined && <div className="col-lg-4 mt-2">
                                <div className="card p-4 shadow border-0">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <h5 className="fw-bold mb-3">{selectedExerciseData?.name}</h5>
                                        {selectedWorkoutExercise.status && <button className="btn btn-sm border-0" onClick={() => handleReset(selectedWorkoutExercise.id)}><h5> <i className="bi bi-arrow-counterclockwise"></i></h5></button>}
                                    </div>

                                    {/* progress bar */}
                                    <div className="text-center mb-3">
                                        <div className="rounded-circle border border-4 border-primary d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: 120, height: 120 }}>
                                            <h3 className="fw-bold"> {selectedWorkoutExercise.completedSets}/{selectedWorkoutExercise?.set} </h3>
                                        </div>
                                        <small className="text-muted">SETS DONE</small>
                                    </div>

                                    {/* Weight Control */}
                                    <div className="mb-3">
                                        <small className="text-muted">CURRENT WEIGHT (KG)</small>
                                        <div className="input-group">
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentWeight(selectedWorkoutExercise.id, currentSet.id, currentWeight - 1)} disabled={currentWeight <= 1 || currentSet.status}>
                                                -
                                            </button>
                                            <input className="form-control text-center" value={currentWeight} readOnly />
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentWeight(selectedWorkoutExercise.id, currentSet.id, currentWeight + 1)} disabled={currentSet.status}>
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* REPS TRACKER */}
                                    <div className="mb-3">
                                        <small className="text-muted">REPS TRACKER</small>
                                        <div className="input-group">
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentRep(selectedWorkoutExercise.id, currentSet.id, currentRep - 1)} disabled={currentRep <= 1 || currentSet.status}>
                                                -
                                            </button>
                                            <input className="form-control text-center" value={currentRep} readOnly />
                                            <button className="btn btn-outline-secondary" onClick={() => handleCurrentRep(selectedWorkoutExercise.id, currentSet.id, currentRep + 1)} disabled={currentSet.status}>
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* sets and reps */}
                                    <div className="mb-3">
                                        <small className="text-muted">SETS & REPS</small>
                                        <div className="d-flex gap-2 mt-2">
                                            {selectedWorkoutExercise.sets.map(x =>
                                                <span key={x.id} className={`badge ${x.status ? "bg-primary" : "bg-light text-dark"} p-3 rounded-circle`}>
                                                    {x.completedReps > 0 ? x.completedReps : x.reps}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="mb-3">
                                        <small className="text-muted">NOTES</small>
                                        <TextInput label="" value={selectedWorkoutExercise.note} placeholder="How did this set feel?" onChange={(p) => handleNoteChange(selectedWorkoutExercise.id, p)} maxChars={100} rows={1} disabled={currentSet.status}/>
                                    </div>

                                    <button className="btn btn-primary w-100 rounded-pill" onClick={() => handleSetCompletion(selectedWorkoutExercise.id, currentSet.id)} disabled={selectedWorkoutExercise.set <= selectedWorkoutExercise.completedSets}>
                                        {savingStatus ? "Saving..." : selectedWorkoutExercise.set > selectedWorkoutExercise.completedSets ? "Completed Current Set" : "Completed Exercise"}
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

