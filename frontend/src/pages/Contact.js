import './styles/Contact.css';
import ContactUs from '../assets/images/ContactUsImg.webp';

import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function Contact() {
  return (

    <>
      <Navbar></Navbar>

      <div className="contact-container">

        <img className="contact-image" src={ContactUs} alt="contact-us" border="0"></img>


        <div className="contact-text">
          <h1>Contact:</h1>
          <p><RoomIcon /> C/ example, 23</p>
          <p><LocalPhoneIcon />+34 952 827 549</p>
          <p><AlternateEmailIcon /> example@example.com</p>
        </div>

        <div className="social-media">
          <h1>You can also contact us through our social media:</h1>
          <div className="icons">
            <div className='icon-info'>
              <span className="whatsapp"><WhatsAppIcon /></span>
              <span>+34 653 914 672</span>
            </div>
            <div className='icon-info'>
              <span className="facebook"><FacebookIcon /></span>
              <span>@companyName</span>
            </div>
            <div className='icon-info'>
              <span className="twitter"><TwitterIcon /></span>
              <span>@companyName</span>
            </div>
            <div className='icon-info'>
              <span className="insta"><InstagramIcon /></span>
              <span>@companyName</span>
            </div>
          </div>
        </div>

      </div>

      <Footer></Footer>
    </>

  )
}
