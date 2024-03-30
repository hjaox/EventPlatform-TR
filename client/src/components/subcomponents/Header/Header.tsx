import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/Header/header.scss";

export default function Header() {
    const navigation = useNavigate();

    return (
        <header className="header-component">
            <section className="platform-name">
                <span className="text">The Community</span>
            </section>
            <section className="options">
                <span>Login</span>
                <span onClick={() => navigation("/Login")}>Sign Up</span>
                <span>settings</span>
            </section>
        </header>
    )
}