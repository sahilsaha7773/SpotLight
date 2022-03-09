import React, { useEffect, useState } from "react";
import api from "../config/api.json";
import Cookies from "js-cookie";
import styles from "../styles/profile.module.css";

function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUser = () => {
    setIsLoading(true);
    const url = api.BASE_URL;
    const headers = {
      Authorization: "Bearer " + Cookies.get("spotToken"),
    };
    fetch(url + "/me", {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  const { id, country, email, display_name, followers, images } = userDetails;
  const profilepic = images[0].url;

  return (
    <div className={styles.frame}>
      <div className={styles.card}>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
        <span className={styles.border}></span>
        <div className={styles.imageBox}>
          <img src={profilepic} className={styles.image} alt="Your image" />
        </div>

        <h1 className={styles.name}> {display_name}</h1>

        <div className={styles.followerBox}>
          <p>
            Followers: <span> {followers.total} </span>
          </p>
        </div>

        <div className={styles.details}>
          <p>
            Id:<span> {id} </span>
          </p>
          <p>
            Email:<span> {email} </span>
          </p>

          <p>
            Country:<span> {country} </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
