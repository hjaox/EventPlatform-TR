import { useNavigate } from "react-router-dom";
import "../../../styles/subcomponents/footer.scss";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer-component">
            <div className="staff">
                <span>For Staff</span>
                <div className="login" onClick={() => navigate("/Login")}>Login</div>
            </div>
            <span className="bottom-text">© Our Community</span>
        </footer>
    )
}