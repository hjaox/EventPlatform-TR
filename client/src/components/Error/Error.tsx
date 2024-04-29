import Footer from "../subcomponents/Footer/Footer";
import Header from "../subcomponents/Header/Header";
import "../../styles/Error/error.scss";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
    <section className="error-page">
        <Header />
        <section className="error-display">
            <button onClick={() => navigate("/Home")}>Go Home</button>
        </section>
        <Footer />
    </section>
    )
}