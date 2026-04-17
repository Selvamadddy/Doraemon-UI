import { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { SaveWorkout } from "../../Model/Exercise";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import { AddWorkout as AddWorkoutSlice, UpdateWorkout } from "../../../../ReduxManager/Slices/GymTracker/WorkoutSlice"
import { SaveDailyWorkout } from "../../Api/GymTrackerApi";
import { useToast } from "../../../Common/ErrorToast/ToastContext";

interface props {
  workOut: SaveWorkout;
  setState: React.Dispatch<React.SetStateAction<SaveWorkout>>
}

export default function AddWorkout({ workOut, setState }: props) {
  const [savingData, setSavingData] = useState(false);
  const exercises = useAppSelector(state => state.exercise);
  const [disableSave, setDisableSave] = useState(true);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    const CanSaveData = () => {
      if (workOut.name == null || workOut.name == "" || workOut.name == undefined) {
        setDisableSave(true);
      }
      else if (workOut.exercises == null || workOut.exercises == undefined || workOut.exercises.length <= 0) {
        setDisableSave(true);
      }
      else if (workOut.workoutDate == null || workOut.workoutDate == undefined) {
        setDisableSave(true);
      }
      else{
        setDisableSave(false);
      }
    }

    CanSaveData();
  }, [workOut.name, workOut.exercises, workOut.workoutDate])

  const handleNameChange = (e: string) => {
    setState(prev => ({ ...prev, name: e }))
  }

  const handleDescriptionChange = (e: string) => {
    setState(prev => ({ ...prev, description: e }))
  }

  const handleDateChange = (e: Date | null) => {
    setState(prev => ({ ...prev, workoutDate: e == null ? new Date : e }))
  }

  const handleClearData = () => {
    setState({
      id: 0,
      name: "",
      description: "",
      workoutDate: new Date,
      exercises: []
    })
  }

  const handleSave = async () => {
    if (!disableSave) {
      setSavingData(true);
      const response = await SaveDailyWorkout(workOut);
      if (response.status) {
        const id = response.data;
        if (id != null) {
         if(workOut.id <= 0){
           workOut.id = id;
          dispatch(AddWorkoutSlice(workOut));
         }
         else{
          dispatch(UpdateWorkout(workOut));
         }
          showToast("Saved Workouts", "success");
        }
        else {
          showToast("Failed to save Workouts", "error");
        }
      }
      setSavingData(false);
    }
  }

  const workoutIds = new Set(workOut.exercises.map(e => e.exerciseId));

  const distinctExercise = Array.from(
    new Map(exercises.filter(x => workoutIds.has(x.id)).map(x => [x.muscleGroup, x])).values()
  );

  return (
    <div className="p-4 border bg-white rounded-3">
      <div className="mb-4">
        <label className="text-secondary" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px" }}>
          NAME
        </label>
        <TextInput label="" value={workOut.name} placeholder="Enter workout name.." onChange={handleNameChange} maxChars={30} rows={1} />
      </div>

      <div className="mb-4">
        <label className="text-secondary" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px" }}>
          DESCRIPTION
        </label>
        <TextInput label="" value={workOut.description} placeholder="" onChange={handleDescriptionChange} maxChars={200} rows={3} />
      </div>

      <hr />

      <div className="mb-4">
        <label className="text-secondary" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "1px" }}>
          Select Date
        </label>
        <div className="input-group">
          <span className="input-group-text" style={{ fontSize: "14px" }}>📅</span>
          <DatePicker minDate={new Date()} selected={workOut.workoutDate} onChange={(date: Date | null) => handleDateChange(date)} className="form-control" dateFormat="dd/MM/yyyy"
            customInput={<input className="form-control" style={{ fontSize: "14px" }} />} />
        </div>
      </div>

      <hr />

      <div className="mb-3">
        <label className="form-label text-muted small fw-semibold" style={{ fontSize: "10px", fontWeight: "700" }}>
          FOCUS AREAS
        </label>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {distinctExercise.length > 0 && distinctExercise.map((item) => (
            <span key={item.id} className="badge rounded-pill bg-primary px-3 py-2" style={{ fontSize: "9px", letterSpacing: "1px" }}>
              {item.muscleGroup}
            </span>
          ))}
        </div>
      </div>

      <hr />

      <div className="mb-3 d-flex justify-content-between">
        <button className="btn btn-success border px-3 rounded-pill" onClick={handleSave} disabled={disableSave}>
          {savingData ? "Saving...  " : "Save"}
          {savingData && <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>}
        </button>
        <button className="btn btn-light border px-3 rounded-pill" onClick={handleClearData}>
          clear
        </button>
      </div>
    </div>
  );
}