import React from "react";

interface TaskFiltersProps {
  sortBy: string;
  status: string;
  severity: number;
  search: string;
  onChange: (field: string, value: string | number) => void;
  onGet?: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  sortBy,
  status,
  severity,
  search,
  onChange
}) => {
  return (
    <div className="bg-light px-4 px-md-5 py-3">
      <div className="d-flex flex-wrap align-items-end gap-3">

        <div>
          <label className="form-label text-uppercase small text-secondary mb-1">
            Sort By
          </label>
          <select className="form-select rounded-pill" value={sortBy} onChange={(e) => onChange("sortBy", e.target.value)}>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="created">Created Date</option>
          </select>
        </div>

        <div>
          <label className="form-label text-uppercase small text-secondary mb-1">
            Status
          </label>
          <select className="form-select rounded-pill" value={status} onChange={(e) => onChange("status", e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="form-label text-uppercase small text-secondary mb-1">
            Priority
          </label>
          <select className="form-select rounded-pill" value={severity} onChange={(e) => onChange("severity", Number(e.target.value))}>
            <option value={0}>All</option>
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        <div className="flex-grow-1" style={{ minWidth: "200px" }}>
          <label className="form-label text-uppercase small text-secondary mb-1">
            Search
          </label>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onChange("search", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
};

export default React.memo(TaskFilters);