import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth"
import app from "../../utils/firebase/fbAuth";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    function signIn() {
        return signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                navigate("/Dashboard")
            })
            .catch(err => {
                console.log(err, "err")
            })
    }

    // return <>login
    //     <form id="loginForm">

    //         <label htmlFor="emailInput">Email</label>
    //         <input id="emailInput" type="text" />

    //         <label htmlFor="passwordInput">Password</label>
    //         <input type="text" id="passwordInput" />
    //     </form>
    //     <span>or</span>
    //     <GoogleLoginButton onClick={() => signIn()} style={{width: "fit-content"}}/>
    // </>

    return (
        <section className="login-page">
            <section>
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