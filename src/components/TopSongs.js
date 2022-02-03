import React, { useState } from 'react';
import styles from '../styles/topSongs.module.css';

function TopSongs({ topTracks }) {
  const [play, setPlay] = useState(-1);
  const [audio, setAudio] = useState(new Audio());

  return (
    <div style={{
      textAlign: "left",
      margin: "40px"

    }}>
      <h1>Top Songs</h1>
      <h3 style={{
        margin: "10px 0",
        opacity: "0.7"
      }}>Click on the album image to listen to a 30 sec preview</h3>
      <div className={styles.topSongs}>
        {topTracks?.items?.map((item, ind) => (
          <div className={styles.songCard}>

            <h2>#{ind + 1}</h2>
            <div style={{ position: 'relative' }} className={styles.songControl}>
              <img src={item.album?.images[0]?.url} className={styles.songImage + " zoom"} onClick={() => {
                // var a = new Audio(item.preview_url);
                if (play === ind) {
                  var a = audio;
                  if (a.paused)
                    a.play();
                  else
                    a.pause();
                  setAudio(a);
                  console.log(audio.paused);

                  // setPlay(-1);
                } else {
                  var a = audio;
                  a.src = item.preview_url;
                  setAudio(a);
                  a.play();
                  setPlay(ind);
                  console.log(play);

                }
              }} />
              {(play === ind && audio.paused === false) ?
                <i className={styles.audioBtn + " fas fa-pause-circle"} style={{
                  position: 'absolute',
                  left: '40%',
                  bottom: '45%',
                  fontSize: "40px",
                  textShadow: "rgb(0 0 0) 2px 2px 10px"
                }}></i> :
                <i className={styles.audioBtn + " fas fa-play-circle"} style={{
                  position: 'absolute',
                  left: '40%',
                  bottom: '45%',
                  fontSize: "40px",
                  textShadow: "rgb(0 0 0) 2px 2px 10px"
                }}></i>}
            </div>
            <div className={styles.songDetails} >
              <h2>{item.name}</h2>
              <h3 style={{
                margin: "10px 0"
              }}>{item.artists.map((artist, ind) => {
                if (ind != 0)
                  return (", " + artist.name);
                else return (artist.name)
              })}</h3>
              <div className={styles.CentreplayOnSpot}>
              <a href={item.external_urls.spotify} target="_blank" className={styles.playOnSpot}>Play on Spotify <i class="fab fa-spotify"></i></a>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongs;
