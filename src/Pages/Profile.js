import React, { useEffect, useState } from 'react';
import api from '../config/api.json';
import Cookies from 'js-cookie';
import styles from '../styles/profile.module.css';

function Profile (){
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

 

  const getUser = () => {
    setIsLoading(true);
    const url = api.BASE_URL;
    const headers = {
      'Authorization': 'Bearer ' + Cookies.get("spotToken"),
    };
    fetch(url + '/me', {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUserDetails(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getUser();
   
  }, []);

 
  if(isLoading){
    return(
      <div>

      </div>
    )
  };
 
 
   
   const {id,country,email,display_name,followers,images} = userDetails;
   const profilepic = images[0].url;

  return (
      <div className={styles.frame}>

<div className={styles.card}>
           
            <div  className={styles.imageBox}>
            <img src={profilepic} className={styles.image} alt="Your image"/>
            </div>

            <h1  className={styles.name}> {display_name}</h1>

            <div  className={styles.followerBox}>
                <h2>Followers: <span> {followers.total} </span></h2>
            </div>
          
          <div  className={styles.details}>
            <h2>Country:<span> { country} </span></h2>
            <h2>Email:<span> {email} </span></h2>
            <h2>Id:<span> {id} </span></h2>
          </div>
</div>

      </div>
  );



}

export default Profile;