import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../utils/firebase/fbAuth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login/login.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import { useState } from "react";
import { loginUser } from "../../utils/axios/login";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayError, setDisplayError] = useState(false);

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const { user } = await signInWithPopup(auth, provider);
        const userDetails = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            accessToken: await user.getIdToken()
        };

        dispatch(actions.login(userDetails))
        navigate("/Home")
    }

    async function signInWithFirebase(e: React.FormEvent, email: string, password: string) {
        e.preventDefault();

        const userDetails = await loginUser(email, password);
        if(userDetails) {
            dispatch(actions.login(userDetails))
            navigate("/Home")
        }

        setDisplayError(() => true);
    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayError(() => false);
        setEmail(e.target.value);
    }
    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setDisplayError(() => false);
        setPassword(e.target.value);
    }

    return (
        <section className="login-page">
            {
                displayError && (
                    <span>
                        something went wrong
                    </span>
                )
            }
            <section className="form">
                <form id="login-form" onSubmit={e => signInWithFirebase(e, email, password)}>

                    <label htmlFor="emailInput">Email</label>
                    <input id="emailInput" type="text" onChange={handleEmailInput}/>

                    <label htmlFor="passwordInput">Password</label>
                    <input type="text" id="passwordInput" onChange={handlePasswordInput}/>

                    <button type="submit" form="login-form" value="Submit">Submit</button>
                </form>
                <span>or</span>
                <GoogleLoginButton onClick={() => signInWithGoogle()} style={{ width: "fit-content" }} />
            </section>
            <img src={"./media/login.jpg"} alt="login-image" />
        </section>
    )
}