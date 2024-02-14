# ChatWave: Real-Time Chat App: React.js, Socket.io, JWT-Auth, Shadcn UI, MongoDB, Node.js, Express.js, Tailwind


<a href="https://chatwave-c458d.web.app/">Chatwave </a> is a Fullstack chat application. built using  React.js, Socket.io, JWT-Auth, Shadcn UI, MongoDB, NOde.js, Express.js, Tailwind. User can communicated with each other in real-time and can share all kind of media ( Including Video, Image, Audio, Files ).
<br/>
<br/>
![image](https://github.com/Omkar-kamble82/ChatWave/assets/96938880/12edf1fb-d0d3-4283-8ef6-eca902b3c5eb)
![image](https://github.com/Omkar-kamble82/ChatWave/assets/96938880/3498bf24-365b-4064-8ab6-4ced6d644c31)



<h2>Key Features:</h2>

- Real-Time Chat Application
- Multimedia Upload ( Includind Video, Image, Audio, Files )
- JWT Authentication
- Online status Update
- Hosting using Firebase and Render.com

### Cloning the repository

```shell
git clone https://github.com/Omkar-kamble82/ChatWave.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
frontend:
VITE_SERVER_AUTH_URI=
VITE_REACT_APP_API_KEY=
VITE_REACT_APP_AUTH_DOMAIN=
VITE_REACT_APP_PROJECT_ID=
VITE_REACT_APP_STORAGE_BUCKET=
VITE_REACT_APP_MESSAGING_SENDER_ID=
VITE_REACT_APP_APP_ID=

server:
MONGO_URI=
PORT=
NODE_ENV=
CLIENT=
JWT_SECRET=
```


### Start the app

```shell
npm run dev
```

### Deploy app on firebase

```shell
firebase init

npm run build

firebase deploy
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | Build frontend app  |
