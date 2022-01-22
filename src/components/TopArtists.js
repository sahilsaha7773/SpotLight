import millify from 'millify';
import React from 'react';
import styles from '../styles/topArtists.module.css';

function TopArtists({ topArtists }) {
  return (
    <div>
      <h1 style={{
        margin: " 0 20px"

      }}>Top Artists</h1>
      <div className={styles.topArtists}>
        {
          topArtists?.items?.map((item, ind) => (
            <div className={styles.artistCard + " zoom"}>
              <img src={item?.images[0]?.url} className={styles.artistImage} />
              <div className={styles.topGradient}>
                <h2 style={{
                  margin: "0 0 20px 0"
                }}>{item.name}</h2>
              </div>
              <div className={styles.bottomGradient}>
                <h3 style={{
                  margin: "0 0 !important"
                }}>{millify(item.followers.total)} Followers</h3>
                <h3 style={{
                  margin: "10px 0"
                }}>
                  {item.genres[0]}
                </h3>
                <h3 style={{
                  margin: "10px 0"
                }}>
                   { item.popularity } Popularity
                </h3>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default TopArtists;
