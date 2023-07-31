import './styles/Footer.css';

import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function Footer() {
  return (
    <div className='foot-container'>

      {/* RIGHT */}
      <div className='company-info'>

        <h2>Company Name &copy;</h2>
        <div className='foot-icons-cont'>
          <div className="icon-facebook"><FacebookIcon /></div>
          <div className="icon-twitter"><TwitterIcon /></div>
          <div className="icon-insta"><InstagramIcon /></div>
        </div>

      </div>

      {/* CENTER */}
      <div className="useful-links">

        <h3>Useful Links</h3>

        <div className='links'>
          <Link to='/'> - Home</Link>
          <Link to='/cart'> - Cart</Link>
          <Link to='/wishlist'> - Wishlist</Link>
          <Link to='/my-account'> - My Account</Link>
        </div>
      </div>

      {/* LEFT */}
      <div className="contact">
        <h3>Contact</h3>
        <p><RoomIcon /> C/ example, 23</p>
        <p><LocalPhoneIcon />+34 914 827 549</p>
        <p><AlternateEmailIcon /> example@example.com</p>

      </div>

    </div>
  )
}
