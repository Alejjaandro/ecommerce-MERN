import './Footer.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Footer() {
  return (
    <div className='foot-container'>
        <h2>All Rights Reserved &copy;</h2>

        <div className='foot-icons-cont'>

          <div className="icon-facebook"><FacebookIcon/></div>
          <div className="icon-twitter"><TwitterIcon/></div>
          <div className="icon-insta"><InstagramIcon/></div>
          <div className="icon-mail"><AlternateEmailIcon/></div>

        </div>
    </div>
  )
}
