import React, { useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { GetWidget, AddUserWidget, RemoveUserWidget } from ".././Api/Widget";
import type { Widget } from "../Model/DashboardModel";

import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { updateWidget } from "../../../ReduxManager/Slices/Dashboard/WidgetSlice";

type Props = {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
};

export default function ManageWidgetButton({ widgets, setWidgets }: Props): React.ReactElement {

  const dispatch = useAppDispatch();
  const widget = useAppSelector(state => state.widget);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const response = await GetWidget();
      if (response.success) {
        if (response.data != null) {
          response.data.widgets.forEach(element => {
            dispatch(updateWidget(element));
          });
        }
      }
      else {
        console.log("api error");
      }
    };
    if (widget == null || widget.length <= 0) {
      fetchData();
    }
  }, []);

  console.log(widget);

  const addWidget = async(widget: Widget) => {
    if (!widgets.some(x => x.id == widget.id)) {
      setWidgets([...widgets, widget]);
      const response = await AddUserWidget(widget.id);
      if(!response.success){
        console.log("Add widget api failed");
      }
    }
  };

  const removeWidget = async(widget: Widget) => {
    setWidgets(widgets.filter((w) => w !== widget));
    const response = await RemoveUserWidget(widget.id);
      if(!response.success){
        console.log("Remove widget api failed");
      }
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
                  {
                    widget.map(x =>
                      <li >
                        <button
                          className="dropdown-item"
                          onClick={() => addWidget(x)}
                        >
                          {x.name}
                        </button>
                      </li>
                    )
                  }
                </ul>
              </div>

              {/* Show current widgets with remove option */}
              {widgets.length === 0 ? (
                <p className="text-muted">No widgets added yet.</p>
              ) : (
                widgets.map((widget) => (
                  <div key={widget.id} className="mb-3 border rounded p-2">
                    <span className="me-2">{widget.name}</span>
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
