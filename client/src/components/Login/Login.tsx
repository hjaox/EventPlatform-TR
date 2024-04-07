import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../utils/firebase/fbAuth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login/login.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import { useState } from "react";
import { checkEmailIfExist, loginUser } from "../../utils/axios/user";
import { IoMdClose } from "react-icons/io";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fbLoginError, setFBLoginError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();

            const { user } = await signInWithPopup(auth, provider);
            const userDetails = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                accessToken: await user.getIdToken()
            };

            if (user.email) {
                const registered = await checkEmailIfExist(user.email);

                if (!registered) {
                    setRedirect(true);
                } else {
                    dispatch(actions.login(userDetails))
                    navigate("/Home")
                }
            }


        } catch (err) {
            console.log(err)
        }

    }

    async function signInWithFirebase(e: React.FormEvent, email: string, password: string) {
        e.preventDefault();

        const userDetails = await loginUser(email, password);
        if (userDetails) {
            dispatch(actions.login(userDetails))
            navigate("/Home")
        }

        setFBLoginError(() => true);
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

            <section className="form">
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
                        <input type="text" id="passwordInput" onChange={handlePasswordInput} />
                    </div>

                    <button className="submit-button" type="submit" form="login-form" value="Submit">Continue</button>
                </form>

                <span className="form-divider">
                    <div className="line"></div>
                    <span className="text">or</span>
                    <div className="line"></div>
                </span>
                <GoogleLoginButton className="google-login" onClick={() => signInWithGoogle()} style={{ width: "fit-content" }} />
            </section>

            {
                <div className={`redirect ${redirect ? "show" : "hide"}-redirect`} >
                    <div className="message">
                        <p>Email is not a registered user. Please register first.</p>

                        <div className="navigation">
                            <button className="register" onClick={() => navigate("/Register")}>Register</button>
                            <button className="home" onClick={() => navigate("/Home")}>Home</button>

                        </div>

                        <IoMdClose className="close-redirect" onClick={() => setRedirect(false)}/>
                    </div>
                </div>
            }
        </section>
    )
}