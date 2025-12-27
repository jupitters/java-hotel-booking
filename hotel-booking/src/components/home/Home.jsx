import MainHeader from "../layout/MainHeader.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";

const Home = () => {
    return (
        <section>
            <MainHeader />
            <section className="container">
                <Parallax />
                <HotelService />
                <Parallax />
            </section>
        </section>
    )
}

export default Home