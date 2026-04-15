import { FiPlus, FiSearch } from "react-icons/fi";
import type { Exercise } from "../../Model/Exercise";
import { useState } from "react";


export default function ExerciseCanvas ({ exercises, AddExercise, selectedExercises }: { exercises: Exercise[], AddExercise: (id :number) =>void, selectedExercises : number[]})  {
     const [search, setSearch] = useState("");
     const filtered = exercises.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style={{ height: "90%", top: "auto", bottom: 0 }}>
            <div className="offcanvas-header">
                <h6 className="fw-bold">Exercise Library</h6>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div style={{ position: "relative" }}>
                    <FiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6c757d", pointerEvents: "none", }} size={18} />
                    <input type="text" className="form-control mb-3" placeholder="Search exercises..." style={{ paddingLeft: "36px" }} value={search} onChange={(e) => { setSearch(e.target.value) }}/>
                </div>

                {filtered.map((exercise) => (
                    <AddExerciseCard key={exercise.id} exercise={exercise} AddExercise={AddExercise} isAdded = {selectedExercises.filter(x => x === exercise.id).length > 0}/>
                ))}
            </div>
        </div>
    );
}

const AddExerciseCard = ({ exercise, AddExercise, isAdded }: { exercise: Exercise, AddExercise: (id :number) =>void, isAdded : boolean}) => {
    return (
        <div className="d-flex align-items-center justify-content-between py-2 px-3 rounded-pill mb-1" style={{ border: isAdded ? "2px solid green" : "1px solid #aeadad75" }}>
            <div className="d-flex align-items-center gap-3">
                <img src={exercise.imageUrl == "" ? "alt" : exercise.imageUrl} alt={exercise.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", background: "#e0e0e0", }} />

                <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1a1a1a" }}>
                        {exercise.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        {exercise.category} • {exercise.muscleGroup}
                    </div>
                </div>
            </div>

            <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 32, height: 32, padding: 0, border: isAdded ? "2px solid green" : "1px solid #e0e0e0" }}
                onClick={() => AddExercise(exercise.id)}>
                <FiPlus size={16} color= {isAdded ? "green" : "#555"} />
            </button>
        </div>
    );
};