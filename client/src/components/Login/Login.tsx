import { useNavigate } from "react-router-dom";
import "../../styles/Login/login.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import { useState } from "react";
import { loginUser } from "../../utils/axios/user";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fbLoginError, setFBLoginError] = useState(false);

    async function signInWithFirebase(e: React.FormEvent, email: string, password: string) {
        e.preventDefault();

        try {
            const userDetails = await loginUser(email, password);
            if (userDetails) {
                dispatch(actions.login(userDetails))
                navigate("/Home")
            }
            setFBLoginError(() => true);
        } catch {
            setFBLoginError(() => true);
        }
    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFBLoginError(() => false);
        setEmail(e.target.value);
    }
    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFBLoginError(() => false);
        setPassword(e.target.value);
    }

    return (
        <section className="login-page">

            <div className="form">
                <div className="form-header">
                    <h1>Our Community</h1>
                    <span className="header-text">Login</span>
                    <div className={`error ${fbLoginError ? "show" : "hide"}`}>
                        <span>
                            Incorrect email or password
                        </span>
                    </div>
                </div>


                <form id="login-form" onSubmit={e => signInWithFirebase(e, email, password)}>
                    <div className="form-email">
                        <label htmlFor="emailInput">Email: </label>
                        <input id="emailInput" type="text" onChange={handleEmailInput} />
                    </div>

                    <div className="form-password">
                        <label htmlFor="passwordInput">Password: </label>
                        <input type="password" id="passwordInput" onChange={handlePasswordInput} />
                    </div>

                    <button className="submit-button" type="submit" form="login-form" value="Submit">Continue</button>
                </form>
            </div>
        </section>
    )
}