import './styles/AboutUs.css';
import AboutUsImg from '../assets/images/AboutUsImg.jpg';


import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default function AboutUs() {
    return (

        <>
            <Navbar></Navbar>

            <div className="aboutUs-container">

                <div className="aboutUs-wrapper">

                    <img className="aboutUs-image" src={AboutUsImg} alt="" />
                    <div className="aboutUs-text">
                        <h1>Who are we?</h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia sed nobis maiores id reiciendis vitae optio quos expedita! Possimus quo quidem, voluptates perferendis inventore nemo laudantium esse sequi doloremque reprehenderit!
                            Tempora in maiores quo fugiat rem! Debitis maiores architecto, ad et ipsa totam laboriosam harum sunt facilis ipsam, veritatis mollitia laborum esse. Obcaecati, tenetur architecto temporibus minus praesentium a corporis.
                            Inventore illum dignissimos aperiam magni iste officia minus culpa dolorem! Possimus veniam soluta unde accusamus, ab excepturi impedit nemo. Cum qui, natus perferendis at vero veniam? Est in rem deserunt.
                            Aliquam maxime quas rem corporis. Accusamus natus minus consequuntur aliquam nobis. Soluta quod accusamus fugiat debitis. Ea cumque hic quam dolores, ex itaque quis atque libero quod consequatur iste perferendis.
                            Recusandae aperiam ipsum odit tenetur commodi facilis illo dicta? Aspernatur blanditiis autem eaque omnis voluptate deserunt sint qui impedit dignissimos fugiat amet, nihil, fugit asperiores delectus similique ut enim consequatur.
                        </p>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </>

    )
}
