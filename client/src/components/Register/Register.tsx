import { useState } from "react";
import "../../styles/Register/register.scss";
import { GoogleLoginButton } from "react-social-login-buttons";
import { checkEmailIfExist, registerUser, postUser } from "../../utils/axios/user";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../utils/firebase/fbAuth";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [fbRegisterError, setFBRegisterError] = useState(false);

    function handleNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }
    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();

            const { user } = await signInWithPopup(auth, provider);


            if (user.email && user.displayName) {
                const registered = await checkEmailIfExist(user.email);

                if (!registered) {
                    const { _id } = await postUser(user.displayName, user.email);

                    const userDetails = {
                        uid: _id,
                        displayName: user.displayName,
                        email: user.email,
                        accessToken: await user.getIdToken()
                    };

                    dispatch(actions.login(userDetails))
                }
                navigate("/Home")
            }


        } catch (err) {
            console.log(err)
        }
    }

    async function handleSubmit(name: string, email: string, password: string) {
        try {
            const newUser = await registerUser(name, email, password);
            const userDetails = {
                uid: newUser._id,
                displayName: newUser.name,
                email: newUser.email,
                accessToken: newUser.accessToken
            };

            dispatch(actions.login(userDetails));
            navigate("/Home");
        } catch (err) {
            setFBRegisterError(true);
        }
    }

    return (
        <section className="register-page">

            <div className="form">
                <div className="form-header">
                    <h1>Our Community</h1>

                    <span className="header-text">Register</span>

                    <div className={`error ${fbRegisterError ? "show" : "hide"}`}>
                        <span>
                            Email already exist.
                        </span>
                    </div>
                </div>

                <form id="register-form">
                    <div className="form-name">
                        <label htmlFor="nameInput">Name: </label>
                        <input id="nameInput" type="text" onChange={handleNameInput} />
                    </div>

                    <div className="form-email">
                        <label htmlFor="emailInput">Email: </label>
                        <input id="emailInput" type="text" onChange={handleEmailInput} />
                    </div>

                    <div className="form-password">
                        <label htmlFor="passwordInput">Password: </label>
                        <input type="password" id="passwordInput" onChange={handlePasswordInput} />
                    </div>

                    <button className="submit-button" type="submit" form="login-form" onClick={() => handleSubmit(name, email, password)} value="Submit">Continue</button>
                </form>

                <div className="form-divider">
                    <div className="line"></div>
                    <span className="text">or</span>
                    <div className="line"></div>
                </div>

                <GoogleLoginButton className="google-login" onClick={() => signInWithGoogle()} style={{ width: "fit-content" }} />
            </div>
        </section>
    )
}