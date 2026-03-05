import React, { useState, useMemo, useEffect } from "react";
import TaskItem from "./TaskItem";
import type ToDoTaskModel from "../Model/ToDoTaskModel";

interface TaskListProps {
  tasks: ToDoTaskModel[];
  pageSize?: number;
}

const TaskList: React.FC<TaskListProps> = ({tasks, pageSize = 4,}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / pageSize);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [tasks, totalPages, currentPage]);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, currentPage, pageSize]);

  const startItem = tasks.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, tasks.length);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="text-center text-muted">No tasks found</div>
      ) : (
        <>
          {paginatedTasks.map((task) => (
            <TaskItem key={task.id} task={task}/>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
            <div className="text-muted">
              Showing <strong>{startItem}-{endItem}</strong> of{" "}
              <strong>{tasks.length}</strong> tasks
            </div>

            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link border-0 bg-transparent"
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ‹ Previous
                </button>
              </li>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <li key={index} className="page-item disabled">
                    <span className="page-link border-0 bg-transparent">
                      ...
                    </span>
                  </li>
                ) : (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => setCurrentPage(Number(page))}
                      className={`page-link border-0 rounded-circle ${ currentPage === page? "bg-primary text-white": "bg-transparent" }`}
                      style={{ width: "40px", height: "40px" }}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link border-0 bg-transparent"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next ›
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;