# SpotLight

SpotLight is a web app which uses spotify developer APIs and lists your most listened songs, albums, artists and genres.

# Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

# Setting Up

- Fork the repo to your account.
- Clone the repo to your local computer `git clone <fork url>`
- Make sure Node js is installed on your machine (`Node >= 14.0.0 and npm >= 5.6`)
- cd into the project directory and run `npm install`
- Login or create an account at the [Spotify Developers Dashboard](https://developer.spotify.com/dashboard/applications).
- Click on the `Create an App` button in the spotify developers dashboard. Fill the details and submit.
- Note down the `Client ID` of the app just created.
- Go to your app `Edit Settings` and add `http://localhost:3000` as a redirect URI.
- Create a file named `.env.local` at the project root directory with the following content:
 ```
 REACT_APP_CLIENT_ID=<YOUR CLIENT ID>
 ```
 Replace `<YOUR CLIENT ID>` with the one you got from the spotify console.
- Now run `npm start`
- Open  [http://localhost:3000](http://localhost:3000) on a browser.

# Resources

- This project uses the `Spotify Web API` to get all the spotify related data. You can find more about it at the official [Spotify Web API documentation](https://developer.spotify.com/documentation/web-api/reference/#/).

- To get started with `React JS` or brush up your skills, check out the official [React JS Documentation](https://reactjs.org/tutorial/tutorial.html).
