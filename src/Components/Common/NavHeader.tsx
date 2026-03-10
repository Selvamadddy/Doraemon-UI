import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavHeader.css'

import Logo from '/src/Asset/Logo.png'
import Walking from '/src/Asset/DoraemonFlying.gif'
import { useState, memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { updateMenuBarSelection } from "../../ReduxManager/Slices/MenuBarSlice";

import { SignOut } from "../../API/Login";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ErrorToast/ToastContext";

const mobileViewWidth: number = 400;

function NavHeader() {
    const [isProfileMenuVisible, setIsProfileMenuVisble] = useState(false);
    const [isNotificationDisplayVisible, setIsNotificationDisplayVisble] = useState(false);
    const [notificationCount, setnotificationCount] = useState<number>(11);

    const navigate = useNavigate();
    const { showToast } = useToast();
    const dispatch = useAppDispatch();
    const menuBarState = useAppSelector(state => state.menuBar);
    const userDetail = useAppSelector(state => state.userDetail);

    const updateMenuBarState = useCallback((isExpand: boolean, menu: string | null) => {
        dispatch(updateMenuBarSelection({
            isExpanded: (isExpand ? !menuBarState.isExpanded : menuBarState.isExpanded),
            selectedMenu: (menu == null ? menuBarState.selectedMenu : menu)
        }));
    }, [dispatch, menuBarState]);

    const HandleLogoutButton = useCallback(async (): Promise<void> => {
        const response = await SignOut();
        if (response == null || response === 200 || response === 400) {
            showToast("Logged out", "success");
        }
        localStorage.removeItem("auth_token");
        navigate('/login');
    }, [navigate, showToast]);

    return (
        <>
            <div className="container-full d-flex flex-row fixed-top" style={{ height: '10vh', backgroundColor: '#2b7cee', zIndex: "10" }}>

                <div className='d-flex flex-row align-items-center justify-content-start' style={{ width: '80%' }}>
                    <img className='rounded-circle shadow border border-white border-2 me-3' src={Logo} alt='Logo'
                        style={{ height: '8vh', marginRight: '1vw', marginLeft: '1vw' }} onClick={() => window.innerWidth < 400 ? updateMenuBarState(true, null) : ""} />
                    <h2 style={{ marginTop: '0.5vw', color: "white", fontFamily: "Fredoka, sans-serif", fontSize: "250%" }}>
                        Doraemon
                    </h2>
                </div>

                {window.innerWidth > mobileViewWidth &&
                    <div className="gif-container">
                        <img className='rounded-circle me-3 moving-gif' src={Walking} alt='Logo'
                            style={{ height: '8vh' }} />
                    </div>
                }

                <div className='d-flex flex-row align-items-center justify-content-end' style={{ width: '19vw' }}>
                    <div className=' d-flex flex-row align-items-center position-relative'
                        onMouseEnter={() => setIsNotificationDisplayVisble(true)} onMouseLeave={() => setIsNotificationDisplayVisble(false)}
                        onClick={() => alert('disply notification page')}>
                        <button type="button" className="btn btn-primary position-relative rounded-circle me-3 hide-on-mobile">
                            <i className="bi bi-bell"></i>
                            {notificationCount > 0 &&
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {notificationCount > 10 ? '10+' : notificationCount}
                                </span>
                            }
                        </button>
                        {isNotificationDisplayVisible &&
                            <div className='d-flex flex-column position-absolute text-white profile-menu p-2' style={{ width: '15vw', border: '1px solid whitesmoke' }}>
                                <span className='mb-1 small'>Yet to update tracker</span>
                                <span className='mb-1 small'>Call at 5pm</span>
                            </div>
                        }
                    </div>

                    <span className='me-2 hide-on-mobile text-white' style={{ fontFamily: "Fredoka, sans-serif" }} onClick={() => setIsProfileMenuVisble(!isProfileMenuVisible)}>
                        {userDetail.name}
                    </span>

                    <div className=' d-flex flex-row align-items-center position-relative'>
                        {userDetail.profileImage ? <img className='rounded-circle profile-pic' src={userDetail.profileImage} onClick={() => setIsProfileMenuVisble(!isProfileMenuVisible)} />
                            : <span className="fs-1 text-white"> {userDetail.name?.charAt(0) || "N"} </span>}

                        {isProfileMenuVisible &&
                            <div className='position-absolute profile-menu fw-bold pt-2' onMouseLeave={() => setIsProfileMenuVisble(false)}>
                                {window.innerWidth < mobileViewWidth &&
                                    <p className='m-2 mb-3'>{userDetail.name}</p>
                                }
                                {window.innerWidth < mobileViewWidth &&
                                    <div className='d-flex flex-row profile-menu-option'>
                                        <i className="bi bi-bell mx-2"></i>
                                        <p className='me-2'>Notification</p>
                                    </div>
                                }
                                <div className='d-flex flex-row profile-menu-option' onClick={() => navigate('/Setting')}>
                                    <i className="bi bi-person mx-2"></i>
                                    <p className='me-2'>Account</p>
                                </div>
                                <div className='d-flex flex-row profile-menu-option' onClick={HandleLogoutButton}>
                                    <i className="bi bi-box-arrow-right mx-2"></i>
                                    <p className='me-2'>LogOut</p>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default memo(NavHeader);