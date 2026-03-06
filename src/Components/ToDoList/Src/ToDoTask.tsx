import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import { GetTasks } from "../Api/ToDoList";
import type { GetTasksPayload } from "../Model/ToDoTaskModel";

import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { AddAllToDoTask } from "../../../ReduxManager/Slices/ToDoTask/ToDoTaskSlice";

export default function ToDoTask() {
  const dispatch = useAppDispatch();
  const toDoTasks = useAppSelector(state => state.toDoTask);

  const [filters, setFilters] = useState({ sortBy: "priority", status: "all", severity: 0, search: "" });
  const [showTaskModal, setShowTaskModal] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const payload: GetTasksPayload = {
        Filter: {
          Severity: null,
          Status: null,
          DueDate: null,
          CretaedDate: null
        },
        SearchKey: null,
        Pagination: {
          Count: 0,
          Offset: 0,
          Limit: 5,
          SortOrder: null,
          SortBy: null
        }
      };

      const response = await GetTasks(payload);
      if (response.success && response.data) {
        const formattedData = response.data.map(task => ({
          ...task,
          dueDate: new Date(task.dueDate)
        }));
        dispatch(AddAllToDoTask(formattedData ?? []));
      }
      else {
        console.log("api error");
      }
    };
    fetchData();
  }, [dispatch]);


  const OpenTaskModal = useCallback(() => {
    setShowTaskModal(true);
  }, []);

  const CloseTaskModal = useCallback(() => {
    setShowTaskModal(false);
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredTasks = useMemo(() => {
    let result = [...toDoTasks];

    if (filters.status !== "all") {
      const isCompleted = filters.status === "completed";
      result = result.filter((t) => t.status === isCompleted);
    }

    if (filters.severity != 0) {
      result = result.filter(
        (t) => t.severity == filters.severity
      );
    }

    if (filters.search.trim() !== "") {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.sortBy === "priority") {
      result.sort((a, b) => a.severity - b.severity);
    }
    else if (filters.sortBy === "dueDate") {
      result.sort(
        (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
      );
    }
    else if (filters.sortBy === "created") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [toDoTasks, filters]);

  return (
    <>
      <div className="card-body d-flex flex-column">

        <div className="d-flex justify-content-between align-items-center flex-wrap pb-3">
          <div>
            <h4 className="fw-bold mb-1 text-primary">To-Do List</h4>
            <p className="text-muted mb-0">
              Manage your tasks.
            </p>
          </div>

          <button
            className="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center mt-3 mt-md-0 shadow-sm"
            onClick={() => OpenTaskModal()}
          >
            <span className="fs-5 me-2 fw-bold">+</span>
            New Task
          </button>
        </div>

        <TaskFilters {...filters} onChange={handleChange} />

        <div className="container py-4">
          <div className="bg-light p-4 rounded-4 shadow-sm">

            <TaskList tasks={filteredTasks} pageSize={5} />

          </div>
        </div>
      </div>

      <AddTaskModal show={showTaskModal} handleClose={CloseTaskModal} />
    </>
  );
}