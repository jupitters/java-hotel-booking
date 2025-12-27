import MainHeader from "../layout/MainHeader.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";
import RoomCard from "../room/RoomCard.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";

const Home = () => {
    return (
        <section>
            <MainHeader />
            <section className="container">
                <RoomCarousel />
                <Parallax />
                <RoomCarousel />
                <HotelService />
                <Parallax />
            </section>
        </section>
    )
}

export default Home