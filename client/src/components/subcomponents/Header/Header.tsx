import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/Header/header.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../../../utils/firebase/fbAuth";
import { useDispatch, useSelector } from "react-redux";
import { TReduxUser } from "../../../common/types";
import { actions } from "../../../utils/redux/reducers";
// import instance from "../../../utils/axios/instance"; this is for google calendar test

export default function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: TReduxUser) => state.isLoggedIn)

    async function signIn() {
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/calendar");

        // return signInWithPopup(auth, provider)
        //     .then(result => {
        //         console.log(result)
        //         navigate("/Home")
        //     })
        //     .catch(err => {
        //         console.log(err, "err")
        //     })

        const { user } = await signInWithPopup(auth, provider);
        const userDetails = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            accessToken: await user.getIdToken()
        };

        dispatch(actions.login(userDetails))
    }

    function check() {
        console.log(isLoggedIn)
    }

    // function handleTest() { this is for google calendar test
    //     console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
    //     google.accounts.id.initialize({
    //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //         callback: test
    //       });
    //       google.accounts.id.prompt();

    //       function test(res: any) {
    //         console.log(res, "login")
    //         instance
    //         .get("/google/oauth2cb")
    //         .then(res => {
    //             console.log(res.data)
    //             window.open(res.data)
    //         })
    //       }
    // }
console.log(isLoggedIn)
    return (
        <header className="header-component">
            <section className="platform-name">
                <span className="text">Our Community</span>
            </section>
            <section className="options">
                {
                    isLoggedIn
                    ? (
                        <>
                        <span>settings</span>
                        </>
                    )
                    : (
                        <>
                        <span onClick={() => signIn()}>Login</span>
                        <span onClick={() => check()}>Sign Up</span>
                        </>
                    )
                }



            </section>
            {/* <span onClick={() => handleTest()}>test</span>  this is for google calendar test*/}
        </header>
    )
}