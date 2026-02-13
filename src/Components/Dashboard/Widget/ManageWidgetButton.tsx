import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import type { WidgetType } from "../DashBoardRightSec";

type Props = {
  widgets: WidgetType[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetType[]>>;
};

export default function ManageWidgetButton({
  widgets,
  setWidgets,
}: Props): React.ReactElement {
  const addWidget = (widget: WidgetType) => {
    if (!widgets.includes(widget)) {
      setWidgets([...widgets, widget]);
    }
  };

  const removeWidget = (widget: WidgetType) => {
    setWidgets(widgets.filter((w) => w !== widget));
  };

  return (
    <>
      <button
        className="rounded-pill py-2 widgetButton"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <i className="bi bi-plus-circle-fill me-2"></i>
        Manage Widget
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Manage Widgets
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ minHeight: "30vh" }}>
              <div className="dropdown mb-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select widget
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => addWidget("weather")}
                    >
                      Weather
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => addWidget("wisdom")}
                    >
                      Random wisdom
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => addWidget("funfact")}
                    >
                      Fun fact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Show current widgets with remove option */}
              {widgets.length === 0 ? (
                <p className="text-muted">No widgets added yet.</p>
              ) : (
                widgets.map((widget) => (
                  <div key={widget} className="mb-3 border rounded p-2">
                    <span className="me-2">{widget}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeWidget(widget)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
