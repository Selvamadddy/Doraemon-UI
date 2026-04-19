import { useCallback, useEffect, useState } from "react";
import type { Exercise, SaveWorkout, WorkoutExercise, WorkoutSet } from "../../Model/Exercise";
import TextInput from "../Common/TextInput";
import ExerciseModal from "../Exercise/ExerciseModal";

interface prop {
  exercise: Exercise;
  removeExercise: (id: number) => void,
  cardData: WorkoutExercise;
  setState: React.Dispatch<React.SetStateAction<SaveWorkout>>
}

const newCard: WorkoutExercise = {
  id: 0,
  exerciseId: 0,
  set: 3,
  sets: [],
  note: "",
  completedSets: 0,
  status: false,
  isUpdated: false,
  isNew: true
}

const newSet: WorkoutSet = {
  id: 0,
  set: 0,
  reps: 10,
  weight: 0,
  duration: 0,
  completedReps: 0,
  completedDuration: 0,
  completedWeight: 0,
  status: false,
  isUpdated: false,
  isNew:true
}

export default function ExerciseCard({ exercise, removeExercise, cardData = newCard, setState }: prop) {
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleSetsChange = (newCount: number, isAdd: boolean) => {
    if(isAdd){
      const newSetValue = {...newSet, id : newCount, set : newCount};
      setState(prev => ({...prev, exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, set : newCount, sets : [...x.sets, newSetValue]} : x)}))
    }
    else{
      setState(prev => ({...prev, exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, set : newCount, sets : x.sets.slice(0, -1)} : x)}))
    }
  };

  const parseNumber = (value: string): number => {
    const num = Number(value);
    return Number.isNaN(num) || num < 0 ? 0 : num;
  };

  const handleUpdateSetField = (exerciseId: number, setId: number, field: "reps" | "weight" | "duration", value: string) => {
    const parsedValue = parseNumber(value);

    setState(prev => ({ ...prev, exercises: prev.exercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: (ex.sets ?? []).map(s =>
            s.id === setId
              ? { ...s, [field]: parsedValue }
              : s
          )
        };
      })
    }));
  };

  const handleNoteChange = (e: string) => {
    setState(prev => ({ ...prev, exercises: prev.exercises.map(x => x.id == cardData.id ? { ...x, note: e } : x) }))
  }

  const OpenExerciseModal = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  }, []);

  const CloseExerciseModal = useCallback(() => {
    setShowExerciseDetail(false);
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 mt-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center">
          <img src={exercise.imageUrl == "" ? "https://cdn-icons-png.flaticon.com/512/7922/7922326.png" : exercise.imageUrl} alt={exercise.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", background: "#e0e0e0", }} onClick={() => OpenExerciseModal(exercise)} />
          <div className="ms-3">
            <h5 className="mb-1 fw-semibold" onClick={() => OpenExerciseModal(exercise)}>{exercise.name}</h5>
            <small className="text-muted text-uppercase">
              {exercise.category} • {exercise.muscleGroup}
            </small>
          </div>
        </div>

        <button className="btn btn-sm btn-outline-warning border-0 text-muted" onClick={() => removeExercise(cardData.id)}>
          <i className="bi bi-trash text-body"></i>
        </button>
      </div>

      <div className="mt-3" style={{ width: "13rem" }}>
        <small className="text-muted">SETS</small>
        <div className="input-group">
          <button className="btn btn-outline-secondary" onClick={() => handleSetsChange(cardData.set - 1, false)} disabled={cardData.set <= 1}>
            -
          </button>
          <input className="form-control text-center" value={cardData.set} readOnly />
          <button className="btn btn-outline-secondary" onClick={() => handleSetsChange(cardData.set + 1, true)} disabled={cardData.set >= 5}>
            +
          </button>
        </div>
      </div>

      {cardData.sets && cardData.sets != undefined && cardData.sets?.map(x => (
        <div key={x.set} className="bg-light rounded-4 p-3 mt-2">
          <div className="row g-3 text-center">

            <div className="col-6 col-md-3">
              <label className="form-label small text-muted">SET</label>
              <input type="text" inputMode="numeric" className="form-control text-center rounded-pill" value={x.set} disabled={true} />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label small text-muted">REPS</label>
              <input type="text" inputMode="numeric" className="form-control text-center rounded-pill" value={x.reps} onChange={(e) => handleUpdateSetField(cardData.id, x.id, "reps", e.target.value)} />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label small text-muted">Weight (Kg)</label>
              <input type="text" inputMode="numeric" className="form-control text-center rounded-pill" value={x.weight} onChange={(e) => handleUpdateSetField(cardData.id, x.id, "weight", e.target.value)} />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label small text-muted">Duration (mins)</label>
              <input type="text" inputMode="numeric" className="form-control text-center rounded-pill" value={x.duration} onChange={(e) => handleUpdateSetField(cardData.id, x.id, "duration", e.target.value)} />
            </div>

          </div>
        </div>
      ))}

      <div className="mt-3 px-4">
        <TextInput label="" value={cardData.note} placeholder="Add specific notes for this exercise..." onChange={(p) => handleNoteChange(p)} maxChars={100} rows={1} />
      </div>
      <ExerciseModal show={showExerciseDetail} handleClose={CloseExerciseModal} exercise={selectedExercise} />
    </div>
  );
}