import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/Header/header.scss";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import auth from "../../../utils/firebase/fbAuth";
import instance from "../../../utils/axios/instance";

export default function Header() {
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

    function handleTest() {
        console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: test
          });
          google.accounts.id.prompt();

          function test(res: any) {
            console.log(res, "login")
            instance
            .get("/google/oauth2cb")
            .then(res => {
                console.log(res.data)
                window.open(res.data)
            })
          }
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
            <span onClick={() => handleTest()}>test</span>
        </header>
    )
}