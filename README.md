# 💬 ChatWave

A modern, real-time MERN-stack messaging application with dynamic media sharing and live user status tracking.

[Features](#features) • [Tech Stack](#tech-stack) • [Architecture](#architecture) • [Getting Started](#getting-started) • [Usage](#usage) • [Roadmap](#roadmap) • [Ambiguities & Anomalies](#ambiguities--anomalies) • [Project Structure](#project-structure)

## Overview

ChatWave is an instant messaging web application built on MongoDB, Express, React, and Node.js (MERN), featuring responsive client interfaces and socket-driven bi-directional data flow. It handles secure session storage using HTTP-only JSON Web Tokens (JWT) and integrates Firebase Storage for sharing rich media attachments such as images, videos, audio, and documents.

Think of it as a streamlined, lightweight alternative to Discord, with the sleek aesthetics of modern minimalism.

## Features

- 🔐 **JWT-Based Authentication** — Secure login, signup, and persistent user sessions via HTTP-only cookies.
- 💬 **Real-Time Communication** — Bi-directional, zero-refresh messaging powered by Socket.io.
- 🟢 **Presence Tracking** — Live online and offline status indicators dynamically updated across all clients.
- 📎 **Rich Media Sharing** — Integration with Firebase Storage to upload and preview images, videos, audio, and documents.
- 🎨 **Responsive UI** — Clean desktop and mobile layout styles constructed with Tailwind CSS and Shadcn UI.
- ☁️ **Vercel & Firebase Deployment** — Production-ready build hooks configured for deployment to Firebase Hosting and Vercel Serverless.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | [React 18](https://react.dev/) |
| **Frontend Router** | [React Router DOM v6](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) |
| **WebSockets** | [Socket.io Client v4](https://socket.io/docs/v4/client-api/) |
| **Cloud Storage** | [Firebase Web SDK v10](https://firebase.google.com/) |
| **Form Validation** | [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/) |
| **Backend Core** | [Node.js](https://nodejs.org/) & [Express v4](https://expressjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) & [Mongoose v8](https://mongoosejs.com/) |
| **Authentication** | [jsonwebtoken v9](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs v2](https://github.com/dcodeIO/bcrypt.js) |
| **Real-time Server** | [Socket.io v4](https://socket.io/) |

## Architecture

The repository is split into two main directory trees: `frontend` (React client SPA) and `server` (Node.js/Express application).

### Directory Overview
```
ChatWave/
├── frontend/               # React Vite client app
└── server/                 # Express socket backend server
```

### Frontend Architecture
The client application is scaffolded using Vite and TypeScript. It relies on shadcn/ui components configured via `components.json` and styled using utility variables mapped in `tailwind.config.js`.

- **Role**: Renders the application views, manages client state, communicates with the backend REST APIs, and holds an open WebSocket listener.
- **Key Files**:
  - [main.tsx](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/main.tsx) — Entrypoint setting up the context provider nesting.
  - [App.tsx](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/App.tsx) — Main router defining routes (`/`, `/signup`, `/home`) with authentication checks.
  - [context/Socketcontext.tsx](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/context/Socketcontext.tsx) — Handles the connection life-cycle to the Socket.io server.
  - [hooks/Listen.ts](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/hooks/Listen.ts) — Event hook appending incoming messages to current state.
  - [components/shared/Dropdown.tsx](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/components/shared/Dropdown.tsx) — Dropdown rendering file pickers and uploading files to Firebase Storage.

#### Provider Nesting Order
In `main.tsx`, context providers are layered to ensure data availability:
```tsx
<BrowserRouter>
  <Toaster/>
  <UserContextProvider>
    <ChatContextProvider>
      <SocketContextProvider>
        <ConvoContextProvider>
          <App />
        </ConvoContextProvider>
      </SocketContextProvider>
    </ChatContextProvider>
  </UserContextProvider>
</BrowserRouter>
```

### Server Architecture
The server is structured as a standard Express application using ES Modules.

- **Role**: Exposes endpoints for user account authentication, message storage/retrieval, and mounts a HTTP server wrapped with Socket.io.
- **Key Files**:
  - [server.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/server.js) — Bootstraps the database connection, configures CORS, and spins up the server.
  - [socket/socket.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/socket/socket.js) — Coordinates connection socket handles and maps user IDs to active connection descriptors.
  - [models/message.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/models/message.js) — Defines Mongoose schema layout for messages.

#### Database Schemas
The database schema for individual messages enforces structural integrity:
```javascript
const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
        type: {
			type: String,
			required: true,
			enum: ["text", "video", "image", "file", "audio"],
		},
		deletestatus: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true }
);
```

## Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: Active database cluster (MongoDB Atlas or Local)
- **Firebase**: Project initialized with Storage enabled

### Installation
Clone the repository to your environment:
```bash
git clone https://github.com/Omkar-kamble82/ChatWave.git
cd ChatWave
```
Install workspace dependencies in their respective folders:
```bash
# Install server dependencies
cd server
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables
Configure the application environment using local files. Grouped by service context:

#### Frontend Environment (`frontend/.env`)
Create a `.env` file in the `frontend` folder:
```env
# =========================================================================
# Server Endpoint Configuration
# =========================================================================
VITE_SERVER_AUTH_URI=http://localhost:5000/    # The root endpoint of the Express socket server

# =========================================================================
# Firebase SDK Configuration (Media Sharing)
# =========================================================================
VITE_REACT_APP_API_KEY=your_firebase_api_key
VITE_REACT_APP_AUTH_DOMAIN=your_project_name.firebaseapp.com
VITE_REACT_APP_PROJECT_ID=your_project_id
VITE_REACT_APP_STORAGE_BUCKET=your_project_name.appspot.com
VITE_REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_REACT_APP_APP_ID=your_firebase_app_id
```

#### Server Environment (`server/.env`)
Create a `.env` file in the `server` folder:
```env
# =========================================================================
# Database Settings
# =========================================================================
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatwave

# =========================================================================
# Server Configuration
# =========================================================================
PORT=5000
NODE_ENV=development                           # Options: 'development' | 'production'

# =========================================================================
# CORS Whitelist Settings
# =========================================================================
CLIENT=https://chatwave-c458d.web.app          # Deployed client URL for CORS authorization
LOCAL=http://localhost:3000                    # Local host dev client URL for CORS authorization

# =========================================================================
# Encryption Secrets
# =========================================================================
JWT_SECRET=your_jwt_signature_secret_key       # Secret used to sign token cookies
```

### Running
Launch servers in separate terminal panes:
```bash
# Start backend server (Runs on nodemon with livereload)
cd server
npm run dev

# Start frontend application (Runs on Vite at http://localhost:3000)
cd frontend
npm run dev
```

## Usage

### CLI Scripts Reference
The following scripts are defined in the workspace:

| Command | Directory | Description |
| :--- | :--- | :--- |
| `npm run dev` | `frontend` | Runs Vite dev server on port 3000 |
| `npm run build` | `frontend` | Compiles TypeScript modules and packages production bundle |
| `npm run lint` | `frontend` | Triggers ESLint validation checks |
| `npm run preview` | `frontend` | Launches Vite local preview web server |
| `npm run dev` | `server` | Launches server wrapping Node with Nodemon reload |
| `npm run start` | `server` | Launches server using node server.js directly |
| `npm run build` | `server` | Runs install command |
| `npm run vercel-build` | `server` | Runs echo hello (no-op builder hook for Vercel deployment) |

### REST HTTP Endpoints
The Express backend server exposes the following endpoints:

#### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Expected Body | Response Format (200/201 OK) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Signs up a new account | `{ username, password, confirmPassword }` | `{ _id, username }` + sets JWT cookie |
| `POST` | `/api/auth/login` | Authenticates existing user | `{ username, password }` | `{ _id, username, token }` + sets JWT cookie |
| `POST` | `/api/auth/logout` | Clears local JWT session | None | `{ message: "Logged out successfully" }` |
| `GET` | `/api/auth/:id` | Lists all users excluding user with ID | None | Array of `user` objects excluding passwords |

#### Message Endpoints (`/api/message`)
| Method | Endpoint | Description | Expected Body | Response Format (200/201 OK) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/message/:id` | Fetches conversation message history | `{ senderId }` | Array of populated `message` objects |
| `POST` | `/api/message/send/:id` | Dispatches new chat message | `{ message, type, senderId }` | `message` object of the dispatched message |
| `PATCH` | `/api/message/delete/:id` | Soft-deletes a message | None | Updated `message` object with `deletestatus: true` |

### WebSockets Events API
Real-time actions mapped by Socket.io client hooks:
| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `connection` | Client -> Server | Handshake Query: `{ userId }` | Registers user's active connection and maps user ID to socket connection ID. |
| `getOnlineUsers` | Server -> Client | Array of user IDs (`string[]`) | Broadcasts list of active user IDs to all online users. |
| `newMessage` | Server -> Client | `Message` object structure | Dispatches newly sent message to recipient client socket (if connected). |
| `disconnect` | Client -> Server | None | Clears mapping records for the disconnected socket and updates lists. |

### Configuration Options
- **Theming Customization**: Design variables (such as colors, margins, roundings) can be customized inside the [tailwind.config.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/tailwind.config.js) file and mapped inside [index.css](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/index.css) using standard CSS variables.
- **Components Settings**: Custom shadcn UI configuration is located within [components.json](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/components.json).

## Roadmap

- [ ] Implement group chat support and broadcast channels.
- [ ] Add push notifications for background/offline messaging.
- [ ] Add message typing indicators, read receipts, and media compression.
- [ ] Integrate server's `deleteMessage` soft-delete logic inside frontend UI.
- [ ] Refactor `getMessages` to use `GET` query parameters instead of a `POST` request body.

## Ambiguities & Anomalies

- ⚠️ **Missing LICENSE File** — The server `package.json` references the `ISC` license, but no license file is included in the project root.
- ⚠️ **Hardcoded WebSocket Origin** — The server socket file ([socket.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/socket/socket.js#L12)) has a hardcoded client URL (`https://chatwave-c458d.web.app`) rather than sourcing this mapping dynamically from the environment `CLIENT` configuration.
- ⚠️ **Dead/Unused Files** — The helper module [functions.tsx](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/frontend/src/functions/functions.tsx) contains redundant `getuser` and `logout` wrappers that are never imported or called; matching functions are defined locally on pages instead.
- ⚠️ **Inconsistent POST Endpoint** — Message retrieval ([messageRoutes.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/routes/messageRoutes.js#L6)) uses a `POST` endpoint to supply the `senderId` parameter inside request payload instead of using query parameters or authorization cookie references.
- ⚠️ **Unused Delete Message Flow** — The backend implements message soft-deleting (`deleteMessage` handler inside [message.js](file:///c:/Users/omkar/OneDrive/Desktop/code/ChatWave/server/controllers/message.js#L65)), but no frontend component triggers or connects to this function.

## Project Structure

<details>
<summary>Full file tree</summary>

```
ChatWave/
├── README.md               # Project documentation (this file)
├── frontend/               # React client SPA (Vite + TypeScript)
│   ├── .eslintrc.cjs       # Linter styling config
│   ├── .firebaserc         # Firebase project routing mappings
│   ├── .gitignore          # Client version-control ignore configurations
│   ├── README.md           # Client-specific reference notes
│   ├── components.json     # Configuration file for Shadcn CLI structure mapping
│   ├── firebase.json       # Firebase static web asset serving configuration
│   ├── index.html          # Standard HTML5 index viewport layout structure
│   ├── package-lock.json   # Package lock tracking precise tree of module installations
│   ├── package.json        # Declared React framework build plugins and dependency references
│   ├── postcss.config.js   # Configuration mapping compiler plugins for PostCSS utility parsing
│   ├── tailwind.config.js  # Styling guidelines configuration detailing primary fonts and palettes
│   ├── tsconfig.json       # TypeScript transpilation settings configurations for browser target
│   ├── tsconfig.node.json  # TypeScript transpilation rules for Vite configurations build target
│   ├── vite.config.ts      # Assembly settings mapping alias pathways and dev server options
│   ├── public/             # Static public assets directory
│   └── src/                # Front-end React client script source core files
│       ├── App.tsx         # Main entry controller configuring standard router paths and user guards
│       ├── index.css       # Tailwind base bindings and customized base component styles
│       ├── main.tsx        # Bootstrapper file binding context providers structure tree around layout views
│       ├── vite-env.d.ts   # TS module environment schema templates
│       ├── assets/         # App layouts visuals, screens and SVG vector files
│       ├── components/     # Custom template elements layout files
│       │   ├── shared/     # Chat layouts, conversations container views, message listings
│       │   │   ├── Chat.tsx           # Renders workspace container chat interface layouts
│       │   │   ├── Convo.tsx          # Dynamic message flow container parsing file layouts
│       │   │   ├── Dropdown.tsx       # Paperclip overlay triggering Firebase SDK image/file storage uploads
│       │   │   ├── Navbar.tsx         # Navigation header showing brand layouts and logout handle
│       │   │   ├── Noconversation.tsx # Informative landing view when no recipient target is selected
│       │   │   ├── Noconvo.tsx        # Fallback text showing blank chat logs instructions
│       │   │   └── Sidebar.tsx        # Renders current users listing panel along with status mappings
│       │   └── ui/         # Shadcn library components declarations
│       ├── context/        # State variables controller contexts wrapper modules
│       │   ├── Authcontext.tsx   # Stores context state details of logged-in sessions profile and JWT details
│       │   ├── Chatcontext.tsx   # Holds state metadata properties of user targets actively connected
│       │   ├── Convocontext.tsx   # Mappings list detailing arrays of active message payloads
│       │   └── Socketcontext.tsx # Sets up socket connection hooks syncing live state with the backend
│       ├── firebase/       # Backend communication configuration references
│       │   └── config.ts   # Connects with client storage and database references
│       ├── functions/      # General utilities methods
│       │   └── functions.tsx # Dead/unused file with redundant endpoint wrapper references
│       ├── hooks/          # React framework custom functional utility hooks
│       │   └── Listen.ts   # Custom hook attaching event listener updates to socket new messages
│       └── lib/            # Common tooling modules directory
│           └── utils.ts    # Merging helpers styling wrappers
└── server/                 # Express backend server folder
    ├── .gitignore          # Server-specific ignore configurations file
    ├── package-lock.json   # Package lock tracking backend dependency trees
    ├── package.json        # Script mappings listing express and socket dependencies
    ├── server.js           # Server application bootstrapper connecting DB and routing
    ├── vercel.json         # Directs runtime functions parsing to handle API paths via vercel routes
    ├── api/                # Target route folders matching serverless integration
    │   └── index.js        # Maps root route calls towards main app export
    ├── controllers/        # Server backend middleware business logic handlers
    │   ├── auth.js         # Methods handling signup, login and users list retrieval details
    │   └── message.js      # Endpoint handlers coordinating storage and fetching logs
    ├── models/             # Schema definitions mappings to MongoDB queries collections
    │   ├── conversation.js # Maps relationships holding message arrays between users
    │   ├── message.js      # Formulates exact message format variables
    │   └── user.js         # Formulates user credentials constraints fields
    ├── routes/             # App routing rules mappings files
    │   ├── authRoutes.js   # Defines endpoints linking accounts activities mappings
    │   └── messageRoutes.js# Defines endpoints parsing message delivery mappings
    ├── socket/             # Socket.io connection rules controllers
    │   └── socket.js       # Sets up WS engine coordinates matching active client nodes
    └── utils/              # Server utility scripts directory
        └── generateToken.js# Creates cookie signatures storing JWT details
```

</details>
