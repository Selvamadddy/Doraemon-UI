import React, { useState, useEffect, useRef } from "react";
import ToDoButtons from "./ToDoButtons/TaskButton";
import "./DashBoardRightSec.css";
import ManageWidgetButton from "./Widget/ManageWidgetButton";
import DailyWisdomWidget from "./Widget/DailyWisdomWidget";
import FunFactWidget from "./Widget/FunFactWidget";
import WeatherWidget from "./Widget/WeatherWidget";

import { GetUserWidget } from "./Api/Widget";
import type { Widget } from "./Model/DashboardModel";

const ToDoButtonMinPixel: number = 800;

export type WidgetType = "weather" | "Random Wisdom" | "Fun Fact";

export default function DashBoardRightSec(): React.ReactElement {
  const [userWidgets, setuserWidgets] = useState<Widget[]>([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const response = await GetUserWidget();
      if (response.success) {
        setuserWidgets(response.data != null ? response.data.widgets : [])
      }
      else {
        console.log("api error");
      }
    };

    fetchData();

  }, []);

  const renderWidget = (widgetId: number): React.ReactNode => {
    switch (widgetId) {
      case 1:
        return <WeatherWidget />;
      case 2:
        return <DailyWisdomWidget />;
      case 3:
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
        {userWidgets.length === 0 ? (
          <p className="text-muted">No widgets selected yet.</p>
        ) : (
          userWidgets.map((widget) => (
            <div key={widget.id} className="mb-3">
              {renderWidget(widget.id)}
            </div>
          ))
        )}

        {/* Pass state + updater to ManageWidgetButton */}
        <ManageWidgetButton widgets={userWidgets} setWidgets={setuserWidgets} />
      </div>
    </div>
  );
}
