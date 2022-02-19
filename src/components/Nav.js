import styles from '../styles/nav.module.css';
import {  FaRegUserCircle} from "react-icons/fa";
import logo from "../Logos/SPOTLIGHT-DARK-1-transparent.png";
import {
   
    Link
  } from "react-router-dom";

function Nav(){
    return(
        <div>
      

      <div className={styles.navBOX}>
        
        <div className={styles.navImg}>
           
          <img src={logo} alt="" className={styles.logo}  />
        </div>

        <div className={styles.navDetail} >
          <div>
          <Link to="/profile" className={styles.link}> < FaRegUserCircle className={styles.user} /></Link>
        
          </div>

<div>
<button>
<Link className={styles.link} to="/login">
Log Out
</Link>
</button>
</div>
        </div>


      </div>






        </div>
    )

}
export default Nav;