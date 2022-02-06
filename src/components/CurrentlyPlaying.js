import React, { useEffect, useState } from 'react';
import api from '../config/api.json';
import Cookies from 'js-cookie';
import styles from '../styles/currentlyPlaying.module.css';

function CurrentlyPlaying()
{

    const [currentSong, setCurrentSong] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
  
   
  
    const getCurrentSong = () => {
      setIsLoading(true);
      const url = api.BASE_URL;
      const headers = {
        'Authorization': 'Bearer ' + Cookies.get("spotToken"),
      };
      fetch(url + '/me/player/currently-playing', {
        headers: headers
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setCurrentSong(data);
          setIsLoading(false);
        });
    }
  
    useEffect(() => {
      getCurrentSong();
     
    }, []);
  
   
    if(isLoading){
      return(
        <div className={styles.notplaying}>
           <h1  style={{
          textAlign: "left",
          margin: "60px",
         
        }}>Currently Playing</h1>
            <h2>NO SONG IS PLAYING </h2> 
        </div>
      )
    };

    const singer = currentSong.item.artists[0].name;
    const currentimg = currentSong.item.album.images[1].url;
   
   
    return(
        <div className={styles.currentframe} >
            <h1
              > Playing</h1>
            <div className={styles.currentCard}>
                <div className={styles.imgBox}>
                    <img src={currentimg} className={styles.img} alt="" />
                </div>

                <div className={styles.currentSongDetails}>
                    <h1  className={styles.currentSongDetailsH1}>
                     {currentSong.item.name}
                    </h1>

                    <h2 className={styles.currentSongDetailsH2}
                   >
                       {singer}
                    </h2>
                </div>

            

                

            </div>
        </div>
    )
}

export default CurrentlyPlaying;