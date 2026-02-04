import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../ReduxManager/Store";
import ChatScreen from "./ChatBot/ChatScreen";

export default function MainBody() {
    const menuBarStatus = useSelector(
        (state: RootState) => state.menuBar
    );

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
        marginLeft: isMobile? "0" : menuBarStatus.isExpanded ? "15vw" : "5vw",
        padding: "2px",
        transition: "margin-left 0.3s ease"
    };

    const screen = () =>{
        switch(menuBarStatus.selectedMenu){
            case 'Chat with me' :
                return <ChatScreen />
            default :
                return  <Dashboard />
        }
    }

    return (
        <div className="container-full" style={BodyStyle}>
            {screen()}
        </div>
    );
}
