import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../config/api.json';
import Avatar from 'react-avatar';
import millify from 'millify';
import styles from '../styles/home.module.css';
import ProgressBar from "@ramonak/react-progress-bar";
import TopArtists from '../components/TopArtists';
import TopSongs from '../components/TopSongs';

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
        console.log(data);
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
    var nm = new Map([...genMap].sort((a, b) => b[1] - a[1]));
    setGenresMap(nm);
    setGenCount(a);
    // console.log(genMap.entries());
  }, [topArtists]);
  return (
    <div>
      <Helmet>
        <title>Home | SpotLight</title>
      </Helmet>
      <div style={{
        textAlign: "left",
        margin: "40px",
        // display: "grid",
        // overflow: "scroll",
        // gridTemplateColumns: "auto auto"
      }}>
        <div>
          <TopArtists topArtists={topArtists} />
        </div>
      </div>

      <TopSongs topTracks={topTracks} />
      <div style={{
        textAlign: "left",
      }}>
        <h1>Top Genres</h1>
        {
          // genresMap.sort();
          [...genresMap].map((key, ind) => {
            var val = key[1];
            var p = val * 100 / genresMap.size;
            console.log(val, key, p, genCount);
            return (
              <div style={{ margin: "20px" }}>
                <h1>#{ind + 1} {key[0].toUpperCase()} : {millify(val, { precision: 1 })} ({p.toFixed(2)}%)</h1>
              </div>
            )
          })
        }
      </div>
      {/* <ProgressBar completed={60} /> */}
    </div>
  )
}

export default Home
