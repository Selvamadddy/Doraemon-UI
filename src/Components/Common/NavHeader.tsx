import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavHeader.css'

import Logo from '/src/Asset/Logo.png'
import ProfilePic from '/src/Asset/ProfilePic.jpg'
import Walking from '/src/Asset/DoraemonFlying.gif'
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from "../../ReduxManager/Hooks/hooks";
import { updateMenuBarSelection } from "../../ReduxManager/Slices/MenuBarSlice";

const mobileViewWidth : number = 400;

export default function NavHeader() {
    const [isProfileMenuVisible, setIsProfileMenuVisble] = useState(false);
    const [isNotificationDisplayVisible, setIsNotificationDisplayVisble] = useState(false);
    const [notificationCount, setnotificationCount] = useState<number>(11);

    const dispatch = useAppDispatch();
    const menuBarState = useAppSelector(state => state.menuBar);

    const updateMenuBarState = (isExpand : boolean, menu : string | null) =>{
            dispatch(updateMenuBarSelection({ 
                isExpanded: (isExpand ? !menuBarState.isExpanded : menuBarState.isExpanded), 
                selectedMenu: (menu == null ? menuBarState.selectedMenu : menu )
            }))

    }

    return (
        <>
            <div className="container-full d-flex flex-row fixed-top" style={{ height: '10vh', backgroundColor: '#2b7cee', zIndex : "10" }}>

                {/* Websit name and logo*/}
                <div className='d-flex flex-row align-items-center justify-content-start' style={{ width: '80%'}}>
                    <img className='rounded-circle shadow border border-white border-2 me-3' src={Logo} alt='Logo'
                        style={{ height: '8vh', marginRight: '1vw', marginLeft: '1vw' }} onClick={() => window.innerWidth < 400 ? updateMenuBarState(true, null) : ""} />
                    <h2 style={{ marginTop: '0.5vw', color: "white", fontFamily: "Fredoka, sans-serif", fontSize: "250%" }}>
                        Doraemon
                    </h2>
                </div>

                {window.innerWidth > mobileViewWidth &&
                    <div className="gif-container">
                        <img className='rounded-circle me-3 moving-gif' src={Walking} alt='Logo'
                            style={{ height: '8vh'}} />
                    </div>
                }

                {/* Notification and user profile */}
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

                    <span className='me-2 hide-on-mobile' style={{ fontFamily: "Fredoka, sans-serif" }}>Nobita Nobi</span>

                    <div className=' d-flex flex-row align-items-center position-relative'>
                        <img className='rounded-circle profile-pic' src={ProfilePic}
                            onClick={() => setIsProfileMenuVisble(!isProfileMenuVisible)} />

                        {isProfileMenuVisible &&
                            <div className='position-absolute profile-menu fw-bold pt-2' onMouseLeave={() => setIsProfileMenuVisble(false)}>
                                {window.innerWidth < mobileViewWidth &&
                                    <p className='m-2 mb-3'>Nobita Nobi</p>
                                }
                                {window.innerWidth < mobileViewWidth &&
                                <div className='d-flex flex-row profile-menu-option'>
                                    <i className="bi bi-bell mx-2"></i>
                                    <p className='me-2'>Notification</p>
                                </div>
}
                                <div className='d-flex flex-row profile-menu-option'>
                                    <i className="bi bi-person mx-2"></i>
                                    <p className='me-2'>Account</p>
                                </div>
                                <div className='d-flex flex-row profile-menu-option'>
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