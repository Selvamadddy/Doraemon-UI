import React, { useState } from "react";
import ToDoButtons from "./ToDoButtons/TaskButton";
import "./DashBoardRightSec.css";
import ManageWidgetButton from "./Widget/ManageWidgetButton";
import DailyWisdomWidget from "./Widget/DailyWisdomWidget";
import FunFactWidget from "./Widget/FunFactWidget";
import WeatherWidget from "./Widget/WeatherWidget";

const ToDoButtonMinPixel: number = 800;

export type WidgetType = "weather" | "wisdom" | "funfact";

export default function DashBoardRightSec(): React.ReactElement {
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  const renderWidget = (widget: WidgetType): React.ReactNode => {
    switch (widget) {
      case "weather":
        return <WeatherWidget />;
      case "wisdom":
        return <DailyWisdomWidget />;
      case "funfact":
        return <FunFactWidget />;
      default:
        return null;
    }
  };

  return (
    <div className="card-body d-flex flex-column">
      {window.innerWidth > ToDoButtonMinPixel && <ToDoButtons />}
      <div className="card-body d-flex flex-column mt-5">
        {/* Render selected widgets */}
        {widgets.length === 0 ? (
          <p className="text-muted">No widgets selected yet.</p>
        ) : (
          widgets.map((widget) => (
            <div key={widget} className="mb-3">
              {renderWidget(widget)}
            </div>
          ))
        )}

        {/* Pass state + updater to ManageWidgetButton */}
        <ManageWidgetButton widgets={widgets} setWidgets={setWidgets} />
      </div>
    </div>
  );
}
