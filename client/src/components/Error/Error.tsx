import Footer from "../subcomponents/Footer/Footer";
import Header from "../subcomponents/Header/Header";
import "../../styles/Error/error.scss";

export default function Error() {
    return (
    <section className="error-page">
        <Header />
        <section className="error-display">
            <button>Go Home</button>
        </section>
        <Footer />
    </section>
    )
}