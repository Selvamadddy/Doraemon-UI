import DailyWorkoutPlanner from "../WorkoutSchedule/DailyWorkoutPlanner";
import WorkoutLibrary from "../Exercise/WorkoutLibrary";
import TopStatusBar from "./TopStatusBar";
import TodayWorkoutTracker from "../TodayWorkout/TodayWorkoutTracker";
import { useEffect, useState } from "react";
import { GetAllExercises, GetDailyWorkouts } from "../../Api/GymTrackerApi";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import { AddExercise } from "../../../../ReduxManager/Slices/GymTracker/ExerciseSlice";
import { useToast } from "../../../Common/ErrorToast/ToastContext";
import type { GetDailyWorkoutsPayload, SaveWorkout } from "../../Model/Exercise";
import { AddWorkouts } from "../../../../ReduxManager/Slices/GymTracker/WorkoutSlice";
import GymLoading from "../../../../Asset/GymLoading.png"

const initialData: SaveWorkout = {
  id: 0,
  name: "kikoki",
  description: "",
  workoutDate: new Date,
  exercises: []
}

export default function GymScreen() {
  const [screen, setScreen] = useState("TodayWorkout"); // "CreateWorkout" "ExerciseLibrary"
  const [Loading, setLoading] = useState(true);
  const exercises = useAppSelector(state => state.exercise);
  const workOuts = useAppSelector(state => state.workout);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const today = new Date();
  const todaySession1 = workOuts.find(x => {
    const d = new Date(x.workoutDate);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });
  const todaySession = todaySession1 == undefined ? initialData : todaySession1;

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await GetAllExercises();

      if (response.success && response.data) {
        dispatch(AddExercise(response.data ?? []));
      }
      else {
        showToast("Failed to fetch Exercises", "error");
      }
    };

    const fetchWorkOuts = async () => {
      setLoading(true);
      const now = new Date();
      const request: GetDailyWorkoutsPayload = {
        startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        endDate: new Date(now.getFullYear(), now.getMonth() + 2, 0)
      }
      const response = await GetDailyWorkouts(request);

      if (response.success && response.data) {
        dispatch(AddWorkouts(response.data ?? []));
      }
      else {
        showToast("Failed to fetch Daily workout tracker", "error");
      }
      setLoading(false);
    };

    if (exercises == null || exercises == undefined || exercises.length <= 0) {
      fetchExercises();
    }
    else{
       setLoading(false);
    }
    if (workOuts == null || workOuts == undefined || workOuts.length <= 0) {
      fetchWorkOuts();
    }
    else{
       setLoading(false);
    }
  }, [dispatch]);

  const handleScreenChange = (switchScreen: string) => {
    setScreen(switchScreen);
  }

  const displayScreen = () => {
    switch (screen) {
      case "CreateWorkout":
        return <DailyWorkoutPlanner saveWorkOut={null} switchScreen={handleScreenChange} />
      case "EditWorkout":
        return <DailyWorkoutPlanner saveWorkOut={todaySession} switchScreen={handleScreenChange} />
      case "ExerciseLibrary":
        return <WorkoutLibrary switchScreen={handleScreenChange} />
      default:
        return <TodayWorkoutTracker switchScreen={handleScreenChange} />
    }
  }
  const displayScreenView = displayScreen();

  return (
    <div style={{ fontSize: "12px", fontWeight: "400", letterSpacing: "1px" }}>
      {Loading ?
        <div className="d-flex gap-5 flex-column align-items-center justify-content-center w-100" style={{ height: "80vh" }}>
          <img alt="" src={GymLoading} style={{ height: "50vh" }} />
          <h5>Loading data...</h5>
        </div>
        :
        <>
          <TopStatusBar />
          {displayScreenView}
        </>}
    </div>
  );
}