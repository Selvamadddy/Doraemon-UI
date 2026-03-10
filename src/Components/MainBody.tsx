import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "../ReduxManager/Store";

import { useAppDispatch } from "../Hooks/ReduxHook";
import { updateMenuBarSelection } from "../ReduxManager/Slices/MenuBarSlice";

import Dashboard from "./Dashboard/Dashboard";
import ChatPage from "./ChatBot/Src/ChatPage";
import NavComp from "./Common/NavComp";
import UnderConstruction from "./Common/UnderConstruction";
import ToDo from "./ToDoList/Src/ToDo";
import ProfilePage from "./Settings/Src/ProfilePage";
import { GetUserDetail } from "./Settings/API/ProfileSettingAPI";
import { AddUserDetail } from "../ReduxManager/Slices/User/UserSlice";
import { useToast } from "./Common/ErrorToast/ToastContext";
import useTokenValidator from "../Hooks/UseTokenValidator";

export interface MainBodyProps {
    screen: string;
}

export default function MainBody({ screen }: MainBodyProps) {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const menuBarStatus = useSelector((state: RootState) => state.menuBar);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (screen) {
            dispatch(updateMenuBarSelection({ isExpanded: menuBarStatus.isExpanded, selectedMenu: screen, }));
        }
    }, [screen, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            const response = await GetUserDetail();

            if (response.success && response.data) {
                dispatch(AddUserDetail(response.data));
            } else {
                showToast("Failed to load user details", "error");
            }
        };

        fetchData();
    }, [])

    const mobileBreakpoint = 400;

    const [isMobile, setIsMobile] = useState<boolean>(
        typeof window !== "undefined" &&
        window.innerWidth <= mobileBreakpoint
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= mobileBreakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const bodyStyle: React.CSSProperties = {
        marginTop: "9vh",
        marginLeft: isMobile
            ? "0"
            : menuBarStatus.isExpanded
                ? "15vw"
                : "5vw",
        padding: "2px",
        transition: "margin-left 0.3s ease-in-out"
    };

    const displayScreen = () => {
        switch (menuBarStatus.selectedMenu) {
            case 'Chat with me':
                return <ChatPage />
            case 'Dashboard':
                return <Dashboard />
            case 'To do Task':
                return <ToDo />
            case 'Gym':
                return <UnderConstruction />
            case 'Expense tracker':
                return <UnderConstruction />
            case 'Fish monitor':
                return <UnderConstruction />
            case 'Setting':
                return <ProfilePage />
        }
    }

    const currentScreen = displayScreen();
    useTokenValidator();

    return (
        <>
            <NavComp />
            <div className="container-fll" style={bodyStyle}>
                {currentScreen}
            </div>
        </>
    );
}