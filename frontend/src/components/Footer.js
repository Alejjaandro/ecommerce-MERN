import './styles/Footer.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Footer() {

  const { user } = useAuth();
  
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

        <h2>Useful Links</h2>

        <div className='links'>
          <Link to='/'> - Home</Link>
          <Link to='/about-us'> - About Us</Link>
          <Link to='/contact'> - Contact</Link>
          <Link to={user ? `/my-profile/${user._id}` : '/login'}> - My Account</Link>
        </div>
      </div>

      {/* LEFT */}
      <div className="contact">
        <h2>Contact</h2>
        <p><RoomIcon /> C/ example, 23</p>
        <p><LocalPhoneIcon />+34 914 827 549</p>
        <p><AlternateEmailIcon /> example@example.com</p>

      </div>

    </div>

  )
}
