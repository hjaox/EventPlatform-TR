import { useState } from "react";
import "../../styles/Register/register.scss";
import { GoogleLoginButton } from "react-social-login-buttons";
import { regsiterUser } from "../../utils/axios/user";

export default function Register() {
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

    function signInWithGoogle() {

    }

    async function handleSubmit(name: string, email: string, password: string) {
        try {
            const newUser = await regsiterUser(name, email, password);

            console.log(newUser)
        } catch (err) {

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