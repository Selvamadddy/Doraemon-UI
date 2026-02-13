import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import pocket from '/src/Asset/Gadgets-Pocket.png'
import './NavBar.css'
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../ReduxManager/Hooks/hooks";
import { updateMenuBarSelection } from "../../ReduxManager/Slices/MenuBarSlice";
import { useNavigate } from "react-router-dom";
import { useResponsive } from '../../Utils/ResponsiveUtility/useResponsive';

interface MenuItemProps {
    icon: React.ReactNode;
    name: string;
    route: string;
    isExpand: boolean;
    isSelecetd: boolean,
    updateMenuBarState: (toggleExpand: boolean, menu: string | null, route: string | null) => void;
}

function MenuItem({ icon, name,route, isExpand, isSelecetd, updateMenuBarState }: MenuItemProps) {

    const [isHover, setIsHover] = useState(false);
    const { isMobile } = useResponsive();

    const menuStyle = {
        height: '7vh',
        border: isHover ? '1px solid white' : '',
        borderRadius: '20px',
        margin: '4%',
        fontWeight: '400',
        backgroundColor: isHover ? 'white' : "",
        color: isHover ? '#2b7ceee2' : ""
    };

    const SelectedMenuStyle = {
        height: '7vh',
        border: isHover ? '1px solid white' : '',
        borderRadius: '20px',
        margin: '4%',
        fontWeight: '400',
        backgroundColor: 'white',
        color: '#2b7ceee2'
    };

    const iconClass = "bi " + icon + " me-2";

    return (
        <>
            <div className='d-flex flex-row align-items-center' style={isSelecetd ? SelectedMenuStyle : menuStyle} onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)} onClick={() => updateMenuBarState((isMobile ? true : false) , name, route)} >
                <i className={iconClass} style={{ paddingLeft: "1.5vw" }}> </i>
                {isExpand && <span>{name}</span>}
            </div>
        </>
    );
}

export default function NavBar() {
    const [isMobileView, setMobileView] = useState(window.innerWidth > 400 ? false : true);

    const dispatch = useAppDispatch();
    const menuBarState = useAppSelector(state => state.menuBar);
    const navigate = useNavigate();

    const updateMenuBarState = (isExpand: boolean, menu: string | null, route : string | null) => {
        dispatch(updateMenuBarSelection({
            isExpanded: (isExpand ? !menuBarState.isExpanded : menuBarState.isExpanded),
            selectedMenu: (menu == null ? menuBarState.selectedMenu : menu)
        }))
        if(route != null){
            navigate(route);
        }        
    }

    const barStyle = {
        width: !isMobileView ? (menuBarState.isExpanded ? "15vw" : "5vw") : (menuBarState.isExpanded ? "40vw" : "0"),
        fontSize: !isMobileView ? '1.2vw' : '3vw',
        fontWeight: '300'
    }

    const MenuNameStyle = {
        paddingBottom: '2px',
        fontSize: !isMobileView ? '2vw' : '4vw',
        fontWeight: '500'
    }

    const MenuIcon = {
        height: !isMobileView ? '2vw' : '30px',
        marginBottom: '1.4vh',
        paddingRight: "3px"
    }

    console.log(window.innerWidth)
    return (
        <>
            {
                (!(isMobileView && !menuBarState.isExpanded) || menuBarState.isExpanded) &&

                <div className="bar text-white" style={barStyle}>
                    <div className="border-bottom border-top border-white d-flex flex-row align-items-end justify-content-center" style={{ height: '10vh' }}>
                        {!isMobileView && <img src={pocket} alt="" style={MenuIcon} onClick={() => updateMenuBarState(true, null, null)} />}
                        {menuBarState.isExpanded && <span style={MenuNameStyle}>Gadgets</span>}
                    </div>

                    <div style={{ height: "60vh", marginTop: "2vh" }}>
                        {[
                            { name: "Dashboard", icon: "bi-pip", route : "/dashboard" },
                            { name: "Chat with me", icon: "bi-robot", route : "/chatbot" },
                            { name: "To do List", icon: "bi-journal-bookmark", route : "/doTo" },
                            { name: "Gym", icon: "bi-person-walking", route : "/gym" },
                            { name: "Expense tracker", icon: "bi-wallet2", route : "/expensetracker" },
                            {name: "Fish monitor", icon: "fa-fish", route : "/fishmonitor"}
                        ].map(item => (
                            <MenuItem
                                key={item.name}
                                icon={item.icon}
                                name={item.name}
                                route={item.route}
                                isExpand={menuBarState.isExpanded}
                                isSelecetd={menuBarState.selectedMenu === item.name}
                                updateMenuBarState={updateMenuBarState}
                            />
                        ))}
                    </div>

                    <MenuItem icon={"bi-gear-fill"} name={"Setting"} isExpand={menuBarState.isExpanded} isSelecetd={menuBarState.selectedMenu === "Setting"} route="/setting" updateMenuBarState={updateMenuBarState} />

                    <div className="d-flex flex-row align-items-center justify-content-center border-top border-white" style={{ height: '10vh' }}
                        onClick={() => updateMenuBarState(true, null, null)}>

                        {!isMobileView ?
                            menuBarState.isExpanded ?
                                <i className="bi bi-chevron-double-left me-3"><i className="bi bi-chevron-double-left"></i>
                                    <i className="bi bi-chevron-double-left"></i></i>
                                : <i className="bi bi-chevron-double-right"></i>
                            : <i className="bi bi-chevron-double-up"></i>
                        }
                    </div>
                </div>
            }
        </>
    );
}