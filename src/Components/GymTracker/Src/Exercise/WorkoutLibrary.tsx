import { useCallback, useEffect, useMemo, useState } from "react";
import { GetAllExercises } from "../../Api/GymTrackerApi";
import { useToast } from "../../../Common/ErrorToast/ToastContext";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import { AddExercise } from "../../../../ReduxManager/Slices/GymTracker/ExerciseSlice";
import ExerciseModal from "./ExerciseModal";
import type { Exercise } from "../../Model/Exercise";
import FilterDropdown from "../Common/FilterDropdown";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const categoryList = ['Strength', 'Cardio', 'Powerlifting', 'Core', 'Yoga', 'Flexibility'];
const muscleList = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core', 'Legs', 'Glutes', 'Abs', 'Traps', 'Calves', 'Forearms'];
const equipmentList = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Resistance Band', 'Bench', 'Treadmill', 'Outdoor', 'None'];

export default function WorkoutLibrary({ switchScreen }: { switchScreen: (screen: string) => void }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const itemsPerPage = 12;
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(state => state.exercise);
  const [filters, setFilters] = useState({ category: "", muscle: "", equipment: "" });

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await GetAllExercises();

      if (response.success && response.data) {
        dispatch(AddExercise(response.data ?? []));
      }
      else {
        showToast("Failed to fetch Workouts", "error");
      }
    };

    if (exercises == null || exercises == undefined || exercises.length <= 0) {
      fetchExercises();
    }
    setLoading(false);
  }, [dispatch]);

  const nameSorted = exercises.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
  const filtered = useMemo(() => {
    return nameSorted.filter((item) => {
      setCurrentPage(1);
      return (
        (filters.category === '' || item.category === filters.category) &&
        (filters.equipment === '' || item.equipment === filters.equipment) &&
        (filters.muscle === '' || item.muscleGroup === filters.muscle)
      );
    });
  }
    , [exercises, filters, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
  const startItem = filtered.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, filtered.length);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }
    else {
      pages.push(1);
      if (currentPage > 3)
        pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++)
        pages.push(i);

      if (currentPage < totalPages - 2)
        pages.push("...");

      pages.push(totalPages);
    }
    return pages;
  };

  const OpenExerciseModal = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  }, []);

  const CloseExerciseModal = useCallback(() => {
    setShowExerciseDetail(false);
  }, []);

  const renderTooltip = (text: string) => (
    <Tooltip id="button-tooltip">
      {text}
    </Tooltip>
  );

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-end align-items-center mb-3">
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("View Today's workouts")}>
          <div className="d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("TodayWorkout" )}>
            <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>Today 🏋🏻‍♂️</span>
          </div>
        </OverlayTrigger>

        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("Create workouts")}>
          <div className="ms-1 d-flex align-items-center border border-primary px-2 py-1 rounded-pill bg-white shadow-sm" onClick={() => switchScreen("CreateWorkout")}>
            <span className="fw-semibold" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>Create 💪🏻</span>
          </div>
        </OverlayTrigger>
      </div>


      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="text-primary" style={{ fontSize: "10px" }}>
            EXERCISE DATABASE
          </span>
          <h3 className="fw-bold">Workout Library</h3>
        </div>
        <input className="form-control w-25" placeholder="Search exercises..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
      </div>
      {loading && <p>Loading...</p>}

      <div className="mb-2">
        <button className="btn btn-outline-primary rounded-pill" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
          Filters ⇣
        </button>

        <div className="collapse mt-1" id="collapseFilter">
          <div className="card card-body">
            <div className="container">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <FilterDropdown label="Category" value={filters.category} options={categoryList} onChange={(v) => setFilters(p => ({ ...p, category: v }))} />
                </div>
                <div className="col-md-3 mb-2">
                  <FilterDropdown label="Target Muscle" value={filters.muscle} options={muscleList} onChange={(v) => setFilters(p => ({ ...p, muscle: v }))} />
                </div>
                <div className="col-md-3 mb-2">
                  <FilterDropdown label="Equipment" value={filters.equipment} options={equipmentList} onChange={(v) => setFilters(p => ({ ...p, equipment: v }))} />
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn btn-outline-primary rounded-pill" onClick={() => setFilters(prev => ({ ...prev, category: "", equipment: "", muscle: "" }))}>
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {paginatedData.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <div className="card shadow-sm rounded-4">
              <div className="position-relative">
                <img className="card-img-top p-2 rounded-4" src={item.imageUrl == null || item.imageUrl == "" ? "https://i.pinimg.com/736x/e8/ee/07/e8ee0728e1ba12edd484c111c1f492f2.jpg" : item.imageUrl} alt="im" style={{ height: "194px", width: "100%", objectFit: "cover" }} />
                <span className="position-absolute start-0 m-3 px-2 rounded-pill bg-dark text-white small">
                  {item.difficultyLevel}
                </span>
              </div>

              <div className="card-body">
                <h6 className="fw-bold">{item.name}</h6>
                <div>
                  <span className="badge bg-info text-dark small">
                    {item.muscleGroup.toUpperCase()}
                  </span>
                  <span className="text-muted ms-2 small">
                    {item.equipment?.toUpperCase()}
                  </span>
                </div>

                <div className="d-flex mt-2 justify-content-end" onClick={() => OpenExerciseModal(item)}>
                  <small className="text-primary fw-semibold">
                    VIEW DETAILS
                  </small>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filtered && filtered?.length > 0 &&
        <div className="d-flex justify-content-between align-items-center mt-4 mx-3 mx-md-5 flex-wrap gap-2">

          <div className="text-muted" style={{ fontSize: "clamp(12px, 1.2vw, 16px)" }}>
            Showing <strong>{startItem}-{endItem}</strong> of{" "}
            <strong>{filtered.length}</strong>
          </div>

          <ul className="pagination mb-0 flex-wrap">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link border-0 bg-transparent" style={{ fontSize: "clamp(11px, 1vw, 14px)" }} onClick={() => setCurrentPage((p) => p - 1)}>
                ‹ <span className="d-none d-sm-inline">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <li key={index} className="page-item disabled">
                  <span className="page-link border-0 bg-transparent" style={{ fontSize: "clamp(11px, 1vw, 14px)" }}>
                    ...
                  </span>
                </li>
              ) : (
                <li key={index} className="page-item">
                  <button className={`page-link border-0 rounded-circle ${currentPage === page ? "bg-primary text-white" : "bg-transparent"}`}
                    onClick={() => setCurrentPage(Number(page))}
                    style={{
                      fontSize: "clamp(11px, 1vw, 14px)",
                      width: "clamp(32px, 3vw, 40px)",
                      height: "clamp(32px, 3vw, 40px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {page}
                  </button>
                </li>
              )
            )}

            {/* Next */}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link border-0 bg-transparent" style={{ fontSize: "clamp(11px, 1vw, 14px)" }} onClick={() => setCurrentPage((p) => p + 1)}>
                <span className="d-none d-sm-inline">Next</span> ›
              </button>
            </li>
          </ul>
        </div>}
      <ExerciseModal show={showExerciseDetail} handleClose={CloseExerciseModal} exercise={selectedExercise} canEdit={true} />
    </div>
  );
}