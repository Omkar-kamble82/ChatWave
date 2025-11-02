# 💬 ChatWave — Real-Time Chat Application


<a href="https://chatwave-c458d.web.app/">Chatwave</a> is a real-time messaging application built with the MERN stack and Socket.io that enables users to chat instantly, share media, and view online status. It uses JWT authentication for secure access and supports rich media sharing including images, files, audio, and video.
<br/>
<br/>
![image](https://github.com/Omkar-kamble82/ChatWave/assets/96938880/12edf1fb-d0d3-4283-8ef6-eca902b3c5eb)
![image](https://github.com/Omkar-kamble82/ChatWave/assets/96938880/3498bf24-365b-4064-8ab6-4ced6d644c31)


## 🧱 Tech Stack

| Layer         | Technologies                              |
| :-------------- | :--------------------------------------- |
| Frontend           | React.js, Shadcn UI, Tailwind CSS |
| Backend           | Node.js, Express.js |
| Database           | MongoDB, Mongoose |
| Real-Time Engine |	Socket.io |
| Authentication |	JSON Web Tokens (JWT) |
| Deployment |	Render / Firebase / MongoDB Atlas |

<h2>🚀 Features</h2>

<h3>🔐 Authentication</h3>

- JWT-based authentication for secure login and protected routes.
- User sessions persist across refreshes for a seamless experience.

<h3>💬 Real-Time Chat</h3>

- Built with Socket.io for real-time bi-directional messaging.
- View online/offline status of users instantly.
- Messages appear instantly across clients without page reloads.

<h3>📎 Media Sharing</h3>

- Upload and share images, videos, audio, and documents directly in chat.
- Supports previews and downloads for shared files.

<h3>🎨 Modern UI</h3>

- Designed with Shadcn UI and Tailwind CSS for a clean, responsive interface.

<h3>🔮 Future Enhancements</h3>

- Group chat support and broadcast channels.
- Push notifications for new messages.
- Message read receipts, typing indicators, and media compression.

  
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
