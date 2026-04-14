import { useCallback, useState } from "react";
import type { Exercise, SaveWorkout, WorkoutExercise } from "../../Model/Exercise";
import TextInput from "../Common/TextInput";
import ExerciseModal from "../Exercise/ExerciseModal";

interface prop {
  exercise : Exercise;
  removeExercise: (id :number) =>void,
  cardData : WorkoutExercise;
  setState : React.Dispatch<React.SetStateAction<SaveWorkout>>
}

const newCard : WorkoutExercise = {
  id : 0,
  exerciseId: 0,
  reps : 0,
  sets :0,
  weight : 0,
  duration : 0,
  note : "",
  completedSets: 0,
  completedReps: 0,
  completedDuration : 0,
  completedWeight : 0,
  status : false,
  isUpdated : false
}

export default function ExerciseCard({exercise, removeExercise, cardData = newCard, setState} : prop) {
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleSetsChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const newValue = Number(e.target.value);
    setState(prev => ({...prev,exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, sets : newValue} : x )}))
  }

  const handleRepsChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const newValue = Number(e.target.value);
    setState(prev => ({...prev,exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, reps : newValue} : x )}))
  }

  const handleWeightChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const newValue = Number(e.target.value);
    setState(prev => ({...prev,exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, weight : newValue} : x )}))
  }

  const handleDurationChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const newValue = Number(e.target.value);
    setState(prev => ({...prev,exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, duration : newValue} : x )}))
  }

  const handleNoteChange = (e : string) =>{
    setState(prev => ({...prev,exercises : prev.exercises.map(x => x.id == cardData.id ? {...x, note : e} : x )}))
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
          <img src={exercise == undefined ? "https://cdn-icons-png.flaticon.com/512/7922/7922326.png" : exercise.imageUrl} alt={exercise.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", background: "#e0e0e0", }} onClick={() => OpenExerciseModal(exercise)} />
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

      <div className="bg-light rounded-4 p-3 mt-3">
        <div className="row g-3 text-center">

          <div className="col-6 col-md-3">
            <label className="form-label small text-muted">SETS</label>
            <input type="number" className="form-control text-center rounded-pill" value={cardData.sets} onChange={handleSetsChange}/>
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label small text-muted">REPS</label>
            <input type="number" className="form-control text-center rounded-pill" value={cardData.reps} onChange={handleRepsChange}/>
          </div>

         <div className="col-6 col-md-3">
            <label className="form-label small text-muted">Weight (Kg)</label>
            <input type="number" className="form-control text-center rounded-pill" value={cardData.weight} onChange={handleWeightChange}/>
         </div>

          <div className="col-6 col-md-3">
            <label className="form-label small text-muted">Duration (mins)</label>
            <input type="number" className="form-control text-center rounded-pill" value={cardData.duration} onChange={handleDurationChange}/>
         </div>

        </div>
      </div>

      <div className="mt-3 px-4">
        <TextInput label="" value={cardData.note} placeholder="Add specific notes for this exercise..." onChange={(p) => handleNoteChange(p)} maxChars={100} rows={1} />
      </div>
      <ExerciseModal show={showExerciseDetail} handleClose={CloseExerciseModal} exercise={selectedExercise} />
    </div>
  );
}