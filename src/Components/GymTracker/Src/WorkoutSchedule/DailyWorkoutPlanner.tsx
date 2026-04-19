import { useAppSelector } from "../../../../Hooks/ReduxHook";
import type { SaveWorkout, WorkoutExercise, WorkoutSet } from "../../Model/Exercise";
import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import AddWorkout from "./AddWorkout";
import ExerciseCanvas from "./ExerciseCanvas";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const initialData: SaveWorkout = {
    id: 0,
    name: "",
    description: "",
    workoutDate: new Date,
    exercises: []
};

interface DailyWorkoutPlannerprops {
    saveWorkOut: SaveWorkout | null;
    switchScreen: (screen: string) => void;
};

const AddNewSet = (id : number) :WorkoutSet  =>{
  return {
  id: id,
  set: id,
  reps : 10,
  weight: 0,
  duration: 0,
  completedReps: 0,
  completedDuration: 0,
  completedWeight: 0,
  status: false,
  isUpdated : false,
  isNew:true
};
}

export default function DailyWorkoutPlanner({ saveWorkOut, switchScreen }: DailyWorkoutPlannerprops) {
    const [data, setData] = useState<SaveWorkout>(saveWorkOut ?? initialData);
    const exercises = useAppSelector(state => state.exercise);

    useEffect(() => {
      console.log(data);
    }, [data]);

    const handleAddExercise = (id: number) => {
        const newExercise: WorkoutExercise = {
            id: data.exercises.length + 1,
            exerciseId: id,
            set: 3,
            sets: [AddNewSet(1), AddNewSet(2), AddNewSet(3)],
            completedSets: 0,
            note: "",
            status: false,
            isUpdated: true,
            isNew: true
        };
        setData(prevData => ({ ...prevData, exercises: [...prevData.exercises, newExercise] }));
    }

    const handleRemoveExercise = (id: number) => {
        setData(prevData => ({ ...prevData, exercises: prevData.exercises.filter(x => x.id != id) }));
    }

    const renderTooltip = (text: string) => (
        <Tooltip id="button-tooltip">
            {text}
        </Tooltip>
    );

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-end align-items-center mb-3">
                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("View Today's workouts")}>
                    <div className="d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("TodayWorkout")}>
                        <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>{saveWorkOut == null ? "Today's 💪🏻" : "Back ⬅️"}</span>
                    </div>
                </OverlayTrigger>

                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("View Today's workouts")}>
                    <div className="ms-2 d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("ExerciseLibrary")}>
                        <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>View All 🏋🏻‍♂️</span>
                    </div>
                </OverlayTrigger>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-7">

                    <div className="d-flex justify-content-between mb-3">

                        <div className="d-flex row">
                            <h4>{saveWorkOut == null ? "Create" : "Update"}WorkOut Planner</h4>
                            <span className="text-muted" style={{ fontSize: "12px", fontWeight: "400", letterSpacing: "1px" }}>
                                {new Date(data.workoutDate).toDateString()} : {data.exercises == undefined ? 0 : data.exercises.length} Exercises
                            </span>
                        </div>
                        <button type="button" className="btn btn-primary btn-sm rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ fontSize: "13px", height: "40px" }}>
                            + Add Exercise
                        </button>
                    </div>
                    {data.exercises?.map(e => <ExerciseCard key={e.id} exercise={exercises.find(x => x.id == e.exerciseId) ?? exercises[0]} cardData={e} setState={setData} removeExercise={handleRemoveExercise} />)}
                </div>

                <div className="col-md-4 mt-2">
                    <AddWorkout workOut={data} setState={setData} />
                </div>

            </div>
            <ExerciseCanvas exercises={exercises} AddExercise={handleAddExercise} selectedExercises={data.exercises.map(x => x.exerciseId)} />
        </div>
    );
}

