import React, { useEffect, useState } from 'react';
import api from '../config/api.json';
import Cookies from 'js-cookie';
import styles from '../styles/currentlyPlaying.module.css';


import { useLocation, useNavigate } from "react-router-dom";

import Avatar from "react-avatar";
import millify from "millify";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Current()
{

  const query = useQuery();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.hash);

  const [currentSong, setCurrentSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 

  const getCurrentSong = () => {
    setIsLoading(true);
    const url = api.BASE_URL;
    const headers = {
      Authorization: "Bearer " + Cookies.get("spotToken"),
    };

    
    fetch(url + '/me/player/currently-playing' , {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
       
        console.log(data);
       
        setCurrentSong(data);
        setIsLoading(false);
      })
  
  };
  

 

  useEffect(() => {
    const token = params.get("#access_token");
    const expiresIn = params.get("expires_in");

    if (token) Cookies.set("spotToken", token);
    else {
      const token = Cookies.get("spotToken");
      if (!token) {
        navigate("/login");
      }
    }
    getCurrentSong();
   
  }, []);


  if(isLoading){
    return(
      <div className={styles.notPlaying}>
         <h1  style={{
        textAlign: "left",
        marginLeft: "60px",
       
      }}>NO SONG IS PLAYING</h1>
           
      </div>
    )
  };
 



    
  
    
    

  
 
   
   
    return(
      <div>

      
      
     
        <div className={styles.currentframe} >
        <h1
           > Playing</h1>
       <div className={styles.currentCard}>
             <div className={styles.imgBox}>
                 <img src={currentSong.item.album.images[1].url} className={styles.img} alt="" />
             </div>

             <div className={styles.currentSongDetails}>
                 <h1  className={styles.currentSongDetailsH1}>
                  {currentSong.item.name}
                 </h1>

                 <h2 className={styles.currentSongDetailsH2}
                >
                    {currentSong.item.artists[0].name}
                 </h2>
             </div>
              </div>

         

             

        
        
     </div>
        
      

      




</div>
       
    );
};

export default Current;