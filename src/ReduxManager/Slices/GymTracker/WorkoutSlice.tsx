import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SaveWorkout, WorkoutExercise } from "../../../Components/GymTracker/Model/Exercise";

const initialState: SaveWorkout[] = [];

const workoutSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        AddWorkouts(_, action: PayloadAction<SaveWorkout[]>) {
            return action.payload;
        },

        AddWorkout(state, action: PayloadAction<SaveWorkout>) {
            return [...state, action.payload];
        },

        UpdateWorkout(state, action: PayloadAction<SaveWorkout>) {
            return state.map(workout => workout.id === action.payload.id ? { ...action.payload }: workout);
        },

        AddWorkoutExercises(state, action: PayloadAction<{ workoutid: number; exercises: WorkoutExercise[] }>) 
        {
            return state.map(workout => workout.id === action.payload.workoutid ? {...workout, exercises: [...action.payload.exercises],} : workout);
        },

        AddWorkoutExercise(state, action: PayloadAction<{ workoutid: number; exercise: WorkoutExercise }>) 
        {
            return state.map(workout =>
                workout.id === action.payload.workoutid
                    ? {
                          ...workout,
                          exercises: [
                              ...(workout.exercises || []),
                              action.payload.exercise,
                          ],
                      }
                    : workout
            );
        },

        UpdateWorkoutExercise(state, action: PayloadAction<{ workoutid: number; exercise: WorkoutExercise }>) {
            return state.map(workout => {
                if (workout.id !== action.payload.workoutid) return workout;

                return { ...workout, exercises: (workout.exercises || []).map(ex => ex.id === action.payload.exercise.id ? 
                    action.payload.exercise : ex),};
            });
        },
    },
});

export const {
    AddWorkouts,
    AddWorkout,
    UpdateWorkout,
    AddWorkoutExercises,
    AddWorkoutExercise,
    UpdateWorkoutExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;