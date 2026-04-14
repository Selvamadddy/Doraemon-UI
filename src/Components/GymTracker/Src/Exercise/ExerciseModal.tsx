import { Modal } from "react-bootstrap";
import type { Exercise, SaveExercisePayload } from "../../Model/Exercise";
import { useEffect, useState } from "react";
import FilterDropdown from "../Common/FilterDropdown";
import TextInput from "../Common/TextInput";
import { FaCamera } from "react-icons/fa";
import { SaveExercise } from "../../Api/GymTrackerApi";
import { useAppDispatch } from "../../../../Hooks/ReduxHook";
import { UpdateExercise } from "../../../../ReduxManager/Slices/GymTracker/ExerciseSlice";

export interface ExerciseModalProps {
    show: boolean;
    handleClose: () => void;
    exercise: Exercise | null;
    canEdit?: boolean;
}

const categoryList = ['Strength', 'Cardio', 'Powerlifting', 'Core', 'Yoga', 'Flexibility'];
const muscleList = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core', 'Legs', 'Glutes', 'Abs', 'Traps', 'Calves', 'Forearms'];
const equipmentList = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Resistance Band', 'Bench', 'Treadmill', 'Outdoor', 'None'];
const difficultyList = ["Beginner", "Intermediate", "Advanced"];

export default function ExerciseModal({ show, handleClose, exercise, canEdit = false }: ExerciseModalProps) {
    const [isEditMode, setEditMode] = useState(false);
    const [form, setForm] = useState<SaveExercisePayload>({
        name: "",
        category: "",
        muscleGroup: "",
        equipment: "",
        difficultyLevel: "",
        description: "",
        videoUrl: "",
        imageUrl: "",
        articleUrl: "",
        isCustom: true,
        userId: undefined,
        file: undefined,
        IsImageUpdated: false
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (exercise) {
            setForm({
                id: exercise.id,
                name: exercise.name ?? "",
                category: exercise.category ?? "",
                muscleGroup: exercise.muscleGroup ?? "",
                equipment: exercise.equipment ?? "",
                difficultyLevel: exercise.difficultyLevel ?? "",
                description: exercise.description ?? "",
                videoUrl: exercise.videoUrl ?? "",
                imageUrl: exercise.imageUrl ?? "",
                articleUrl: exercise.articleUrl ?? "",
                isCustom: exercise.isCustom ?? true,
                userId: exercise.userId,
                file: undefined,
                IsImageUpdated: false
            });
        }
    }, [exercise, isEditMode]);

    const handleModalClose = () => {
        setEditMode(false);
        handleClose();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 500 * 1024) {
            alert("Image must be less than 500KB");
            return;
        }
        setForm((prev) => ({ ...prev, file, imageUrl: URL.createObjectURL(file), IsImageUpdated : true }));
    };

    const handleSaveExercise = async () => {
        try {
            const payload: SaveExercisePayload = {
                ...form,
                createdAt: exercise?.createdAt ?? new Date().toISOString(),
                updatedAt: exercise?.updatedAt ?? new Date().toISOString(),
            };
            const response = await SaveExercise(payload);
            if (response.success) {
                const updatedExercise: Exercise = {
                    id: form.id ?? 0,
                    name: form.name,
                    category: form.category,
                    muscleGroup: form.muscleGroup,
                    equipment: form.equipment,
                    difficultyLevel: form.difficultyLevel,
                    description: form.description,
                    videoUrl: form.videoUrl,
                    imageUrl: form.file ? URL.createObjectURL(form.file) : form.imageUrl,
                    articleUrl: form.articleUrl,
                    createdAt: payload.createdAt!,
                    updatedAt: payload.updatedAt!,
                    isCustom: form.isCustom,
                    userId: form.userId
                };
                dispatch(UpdateExercise(updatedExercise));
                setEditMode(false);
                handleClose();
            }

        } catch (error) {
            console.error("Error saving exercise:", error);
        }
    };

    return (
        <>
            <style>
                {`
    .modal.fade .modal-dialog {
        transition: transform 0.15s ease-out, opacity 0.15s ease-out;
    }

    .glass-modal {
        transform: scale(0.96);
        opacity: 0;
        transition: transform 0.18s ease-out, opacity 0.18s ease-out;
        will-change: transform, opacity;
    }

    .modal.show .glass-modal {
        transform: scale(1);
        opacity: 1;
    }

    .glass-modal .modal-content {                   
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.3);
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    .modal-backdrop.show {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        transition: opacity 0.15s ease-out;
    }

    .glass-modal .modal-body {
        overscroll-behavior: contain;
    }

    .list-group-item {
        transition: all 0.15s ease;
    }

    .list-group-item:hover {
        background-color: rgba(0,0,0,0.04);
        transform: translateX(4px);
    }

    /* ✅ Responsive Fixes */
    @media (max-width: 768px) {
        .modal-dialog {
            margin: 0.5rem;
        }

        .left-panel {
            min-height: auto !important;
            max-height: none !important;
        }

        .right-panel {
            max-height: 55vh !important;
        }

        .exercise-title {
            font-size: 1.2rem;
        }

        .badge {
            font-size: 0.7rem;
        }

        .action-buttons {
            flex-direction: column;
        }

        .action-buttons button {
            width: 100%;
        }
    }
    `}
            </style>

            <Modal show={show} onHide={handleModalClose} size="lg" scrollable centered dialogClassName="glass-modal" animation={false}>
                <Modal.Body className="p-0 rounded-4">
                    <div className="row g-0 flex-column flex-md-row">
                        <div className="col-md-5 left-panel d-flex align-items-end p-3"
                            style={{overflowY: "auto", background: form.imageUrl ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${form.imageUrl}) center/cover no-repeat`
                                    : "linear-gradient(135deg, #c9d6a3, #9fb17a)"
                            }}>
                            <div className="w-100">
                               
                                {isEditMode && <><input type="file" id="upload" hidden accept="image/*" onChange={handleImageUpload} />
                                    <span className="text-white">Upload image </span>
                                    <label className="btn btn-primary rounded-circle mb-3" htmlFor="upload">
                                        <FaCamera size={12} />
                                    </label></>
                                }
                               
                                {isEditMode ? (<FilterDropdown label="Category" value={form.category} options={categoryList} onChange={(val) => setForm((p) => ({ ...p, category: val }))} />)
                                    : ( <span className="badge bg-primary mb-2">{exercise?.category}</span>)}
                                  
                                {isEditMode ? (<> <br /> <TextInput label="Name" value={form.name} onChange={(val) => setForm((p) => ({ ...p, name: val }))} maxChars={30} required={true} rows={1} /></>)
                                   : (<h5 className="text-white fw-bold exercise-title">{exercise?.name}</h5>
                                )}
                            </div>
                        </div>

                        
                        <div className="col-md-7 right-panel p-3 p-md-4" style={{ overflowY: "auto" }}>
                            
                            {!isEditMode ? (
                                <div className="d-flex gap-2 gap-md-3 mb-3 flex-wrap">
                                    <div className="border rounded-pill px-3 py-1 small">
                                        <small className="text-secondary">Target Muscle</small><br />
                                        <strong>{exercise?.muscleGroup}</strong>
                                    </div>
                                    <div className="border rounded-pill px-3 py-1 small">
                                        <small className="text-secondary">Equipment</small><br />
                                        <strong>{exercise?.equipment}</strong>
                                    </div>
                                    <div className="border rounded-pill px-3 py-1 small">
                                        <small className="text-secondary">Difficulty</small><br />
                                        <strong>{exercise?.difficultyLevel}</strong>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-2">
                                    <FilterDropdown label="Target Muscle" value={form.muscleGroup} options={muscleList} onChange={(v) => setForm(p => ({ ...p, muscleGroup: v }))} />
                                    <FilterDropdown label="Equipment" value={form.equipment ?? ""} options={equipmentList} onChange={(v) => setForm(p => ({ ...p, equipment: v }))} />
                                    <FilterDropdown label="Difficulty" value={form.difficultyLevel ?? ""} options={difficultyList} onChange={(v) => setForm(p => ({ ...p, difficultyLevel: v }))} />
                                </div>
                            )}


                            <h6 className="text-primary fw-bold mt-3">ABOUT THE EXERCISE</h6>
                            {isEditMode ? (
                                <TextInput label="Description" value={form.description ?? ""} onChange={(v) => setForm(p => ({ ...p, description: v }))} maxChars={100} required={true} />
                            ) : (
                                <p className="text-muted small">{exercise?.description}</p>
                            )}


                            <h6 className="text-primary fw-bold">TUTORIALS & RESOURCES</h6>
                            <div className="list-group">
                                {isEditMode ? <TextInput label="Video Url" value={form.videoUrl ?? ""} onChange={(v) => setForm(p => ({ ...p, videoUrl: v }))} maxChars={200} rows={1} />
                                    : <button className="list-group-item list-group-item-action d-flex justify-content-between" onClick={() => window.open(form.videoUrl, "_blank")}>
                                        🎥 Video Tutorial <span>›</span>
                                    </button>}
                                {isEditMode ? <TextInput label="Article Url" value={form.articleUrl ?? ""} onChange={(v) => setForm(p => ({ ...p, articleUrl: v }))} maxChars={200} rows={1} />
                                    : <button className="list-group-item list-group-item-action d-flex justify-content-between" onClick={() => window.open(form.articleUrl, "_blank")}>
                                        🌐 General Info <span>›</span>
                                    </button>}
                            </div>


                            <div className="d-flex justify-content-between gap-3 mt-3">
                               {canEdit ? <div>
                                    <button className="btn btn-success border px-3 rounded-pill" onClick={() => isEditMode ? handleSaveExercise() : setEditMode(!isEditMode)}>
                                        {isEditMode ? "Save" : "✏️ Edit"}
                                    </button>
                                    {isEditMode &&
                                        <button className="btn btn-warning border ms-2 px-3 rounded-pill" onClick={() => setEditMode(!isEditMode)}>
                                            Cancel
                                        </button>}
                                </div> : <div></div>}
                                <button className="btn btn-primary px-4 rounded-pill" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}