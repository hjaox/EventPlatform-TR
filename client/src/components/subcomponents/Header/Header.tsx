import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/Header/header.scss";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import app from "../../../utils/firebase/fbAuth";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function Header() {
    const navigate = useNavigate();
    const auth = getAuth(app)
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
        <header className="header-component">
            <section className="platform-name">
                <span className="text">The Community</span>
            </section>
            <section className="options">
                <span onClick={() => signIn()}>Login</span>
                <span>Sign Up</span>
                <span>settings</span>
            </section>
        </header>
    )
}