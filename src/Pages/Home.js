import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../config/api.json';
import Avatar from 'react-avatar';
import millify from 'millify';
import styles from '../styles/home.module.css';

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
    for (let i = 0; i < items?.length; i++) {
      var gen = items[i].genres;
      for (let j = 0; j < gen.length; j++) {
        var prevCount = genMap.get(gen[j]);
        if (prevCount === undefined)
          prevCount = 0;
        genMap.set(gen[j], prevCount + 1);
      }
    }
    setGenresMap(genMap);
    console.log(genMap.entries());
  }, [topArtists]);
  return (
    <div>
      <Avatar style={{
        marginTop: "60px",
        border: "8px solid white"
      }} name={user?.display_name} src={user?.images[0]?.url} size={200} round={true} />
      <h1 style={{
        margin: "20px",
        fontSize: "40px"
      }}>{user?.display_name}</h1>
      <h2>{(user?.followers?.total)} Followers</h2>
      <div style={{
        textAlign: "left",
        margin: "40px"

      }}>
        <h1 style={{
          margin: " 0 20px"

        }}>Top Artists</h1>
        <div style={{
          display: 'flex',
          // maxWidth: "1000px",
          margin: "0 0 40px 0",
          overflowX: 'scroll',
        }}>
          {
            topArtists?.items?.map((item, ind) => (
              <div style={{
                margin: "20px",
                position: "relative"
              }} className='zoom'>
                <img src={item?.images[0]?.url} style={{
                  maxWidth: "300px",
                  height: "300px",
                  borderRadius: "20px",
                  objectFit: "contain"
                }} />
                <div className='topGradient' style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  borderRadius: "20px 20px 0 0",
                  padding: "20px 10px",
                  background: " linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0))"
                }}>
                  <h2 style={{
                    margin: "0 0 20px 0"
                  }}>{item.name}</h2>

                </div>
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  borderRadius: "0 0 20px 20px",
                  padding: "20px 10px",
                  background: " linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0))"
                }}>
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
        <h1>Top Songs</h1>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {topTracks?.items?.map((item, ind) => (
            <div style={{
              display: "flex",
              margin: "40px 0",
              width: "50%",
              // background: "#000"
            }}>

              <h2>#{ind + 1}</h2>
              <img src={item.album?.images[0]?.url} style={{
                width: "200px",
                borderRadius: "20px",
                marginRight: "20px",
                marginLeft: "20px"
              }} />
              <div>
                <h2>{item.name}</h2>
                <h3 style={{
                  margin: "10px 0"
                }}>{item.artists.map((artist, ind) => {
                  if (ind != 0)
                    return (", " + artist.name);
                  else return (artist.name)
                })}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
