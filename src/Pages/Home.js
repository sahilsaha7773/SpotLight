import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../config/api.json';
import Avatar from 'react-avatar';
import millify from 'millify';
import styles from '../styles/home.module.css';
import ProgressBar from "@ramonak/react-progress-bar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const query = useQuery();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.hash);

  // States
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [genresMap, setGenresMap] = useState(new Map());
  const [play, setPlay] = useState(-1);
  const [audio, setAudio] = useState(new Audio());
  const [genCount, setGenCount] = useState(0);

  // Get User Profile and Store in local storage 
  const getMe = () => {
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
        if (data.error?.status === 401) {
          navigate('/login');
        }
        // console.log(data);
        localStorage.setItem("spotUser", JSON.stringify(data));
        setUser(data);
        setIsLoading(false);
      });
  }
  // Get Top albums and artists
  const getTopAlbAndArt = () => {
    setIsLoading(true);
    var url = api.BASE_URL + '/me/top/artists';
    const headers = {
      'Authorization': 'Bearer ' + Cookies.get('spotToken')
    };
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setTopArtists(data);
        setIsLoading(false);
      })
    url = api.BASE_URL + '/me/top/tracks';
    fetch(url, { headers })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setTopTracks(data);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    const token = params.get('#access_token');
    const expiresIn = params.get('expires_in');

    if (token)
      Cookies.set("spotToken", token);
    else {
      const token = Cookies.get("spotToken");
      if (!token) {
        navigate('/login');
      }
    }
    getMe();
    getTopAlbAndArt();
  }, []);

  useEffect(() => {
    const genMap = new Map();
    var items = topArtists?.items;
    var a = genCount;
    for (let i = 0; i < items?.length; i++) {
      var gen = items[i].genres;
      a = a + gen.length;
      for (let j = 0; j < gen.length; j++) {
        var prevCount = genMap.get(gen[j]);
        if (prevCount === undefined)
          prevCount = 0;
        genMap.set(gen[j], prevCount + 1);
      }
    }
    setGenresMap(genMap);
    setGenCount(a);
    console.log(genMap.entries());
  }, [topArtists]);
  return (
    <div>

      <div style={{
        textAlign: "left",
        margin: "40px",
        // display: "grid",
        // overflow: "scroll",
        // gridTemplateColumns: "auto auto"
      }}>
        <div className={styles.profileCard}>
          <Avatar style={{
            marginTop: "60px",
            border: "8px solid white"
          }} name={user?.display_name} src={user?.images[0]?.url} size={200} round={true} />
          <h1 style={{
            margin: "20px",
            fontSize: "40px"
          }}>{user?.display_name}</h1>
          <h2>{(user?.followers?.total)} Followers</h2>
        </div>
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
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
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
              <div>
                <h2>{item.name}</h2>
                <h3 style={{
                  margin: "10px 0"
                }}>{item.artists.map((artist, ind) => {
                  if (ind != 0)
                    return (", " + artist.name);
                  else return (artist.name)
                })}</h3>
                <br />
                <br />
                <a href={item.external_urls.spotify} target="_blank" className={styles.playOnSpot}>Play on Spotify <i class="fab fa-spotify"></i></a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <ProgressBar completed={60} /> */}
    </div>
  )
}

export default Home
