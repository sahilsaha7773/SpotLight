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
    <div>
      <div className={styles.loginCard}>
        <i class="fab fa-spotify" style={{
          fontSize: "100px",
          marginBottom: "20px"
        }}></i>
        <h1>Welcome to SpotLight</h1>
        <hr className={styles.underline} />
        <p className={styles.subtitle}>Adipisicing sint mollit aute ut in irure consectetur qui et deserunt. Velit velit enim voluptate ipsum elit anim laborum fugiat fugi</p>
        <button className={styles.loginBtn} onClick={handleLogin}>
          <i class="fab fa-spotify"></i> Login Using Spotify
        </button>
      </div>
    </div>
  )
}

export default Login
