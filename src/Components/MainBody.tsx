import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../ReduxManager/Store";
import ChatPage from "./ChatBot/ChatPage";
import NavComp from "./Common/NavComp";
import { useAppDispatch } from "../ReduxManager/Hooks/hooks";
import { updateMenuBarSelection } from "../ReduxManager/Slices/MenuBarSlice";
import UnderConstruction from "./Common/UnderConstruction";

export interface MainBodyProps {
    screen: string;
}

export default function MainBody({ screen }: MainBodyProps) {
    const dispatch = useAppDispatch();

    const menuBarStatus = useSelector(
        (state: RootState) => state.menuBar
    );

    useEffect(() => {
        if (screen != null) {
            dispatch(updateMenuBarSelection({
                isExpanded: (menuBarStatus.isExpanded),
                selectedMenu: (screen)
            }))
        }
    }, []);

    const mobileViewWidth = 400;
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= mobileViewWidth
    );

    console.log(menuBarStatus);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileViewWidth);
        };

        window.addEventListener("resize", handleResize);
        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    const BodyStyle = {
        marginTop: "9vh",
        marginLeft: isMobile ? "0" : menuBarStatus.isExpanded ? "15vw" : "5vw",
        padding: "2px",
        transition: "margin-left 0.3s ease"
    };

    const displayScreen = () => {
        switch (menuBarStatus.selectedMenu) {
            case 'Chat with me':
                return <ChatPage />
            case 'Dashboard':
                return <Dashboard />
            case 'To do List':
                return <UnderConstruction />
            case 'Gym':
                return <UnderConstruction />
            case 'Expense tracker':
                return <UnderConstruction />
            case 'Fish monitor':
                return <UnderConstruction />
            case 'Setting':
                return <UnderConstruction />
            default:
                return <Dashboard />
        }
    }

    return (
        <>
            <NavComp />
            <div className="container-full" style={BodyStyle}>
                {displayScreen()}
            </div>
        </>
    );
}
