import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../utils/firebase/fbAuth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import "../../styles/Login/login.scss";

export default function Login() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    function signIn() {
        return signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                navigate("/Home")
            })
            .catch(err => {
                console.log(err, "err")
            })
    }

    return (
        <section className="login-page">
            <section className="form">
                <form id="loginForm">

                    <label htmlFor="emailInput">Email</label>
                    <input id="emailInput" type="text" />

                    <label htmlFor="passwordInput">Password</label>
                    <input type="text" id="passwordInput" />
                </form>
                <span>or</span>
                <GoogleLoginButton onClick={() => signIn()} style={{ width: "fit-content" }} />
            </section>
            <img src={"./media/login.jpg"} alt="login-image" />
        </section>
    )
}