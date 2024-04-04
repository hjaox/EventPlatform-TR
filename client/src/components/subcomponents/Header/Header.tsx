import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/Header/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { TReduxUser } from "../../../common/types";
import { useState } from "react";
import { PiUserLight } from "react-icons/pi";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { actions } from "../../../utils/redux/reducers";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state: TReduxUser) => state.isLoggedIn);
    const userEmail = useSelector((state: TReduxUser) => state.userDetails.email);

    const [settingsExpand, setSettingsExpand] = useState(false);

    function signOut() {
        dispatch(actions.logout());
        navigate("/Home")
    }

    return (
        <header className="header-component">
            <section className="platform-name">
                <span className="text">Our Community</span>
            </section>
            <section className="state">
                {
                    isLoggedIn
                        ? (
                            <div className="loggedIn">
                                <button id="header-settings" onClick={() => setSettingsExpand(settingsExpand => !settingsExpand)} className={`settings ${settingsExpand ? "settings-expanded": ""}`}>
                                    <PiUserLight className="user-icon" size={30} />

                                    <span className="user-email">{userEmail}</span>

                                    {
                                        settingsExpand
                                            ? (
                                                <RiArrowUpSLine className="settings-arrow up" />
                                            )
                                            : (
                                                <RiArrowDownSLine className="settings-arrow down" />
                                            )
                                    }


                                </button>
                                <ul id="header-options"  className={`options options--${settingsExpand ? "show" : "hide"}`}>
                                    <li className="options-item">Dashboard</li>
                                    <li className="options-item" onClick={() => signOut()} >Logout</li>

                                </ul>
                            </div>
                        )
                        : (
                            <div className="loggedOut">
                                <button className="login" onClick={() => navigate("/Login")}>Login</button>

                                <button className="register" onClick={() => navigate("/Register")}>Sign Up</button>
                            </div>
                        )
                }



            </section>
        </header>
    )
}