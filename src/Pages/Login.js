import React, { useEffect, useState } from 'react'
import styles from '../styles/login.module.css';
import api from '../config/api.json';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var scope = "user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
    const url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + process.env.REACT_APP_CLIENT_ID + '&scope=' + scope + '&redirect_uri=' + api.REDIRECT_URI;
    console.log(url);
    window.location.href = url;
  }
  
  useEffect(() => {
    document.title = "Login | SpotLight"
  }, [])
  
  return (
   
 <div className={styles.main}>
 <div className={styles.loginCard}>
   <h1 className={styles.wlcm}>Welcome</h1><br></br>
   <i class="fab fa-spotify" style={{
     fontSize: "40px",
     marginBottom: "20px",
   color:"#1DB954",
   
   }}></i>
   <h1 className={styles.appname}>SpotLight</h1>
   <hr className={styles.underline} />
   <p className={styles.subtitle}>Adipisicingconsectetur qui et deserunt. Velit velit e</p>
  
   <button className={styles.loginBtn} onClick={handleLogin}>
     <i class="fab fa-spotify"></i> Login 
   </button>
 </div>
</div>
  )
}

export default Login
