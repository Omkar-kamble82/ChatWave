import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/Authcontext.tsx'
import { ChatContextProvider } from './context/Chatcontext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster/>
        <UserContextProvider >
          <ChatContextProvider>
             <App />
          </ChatContextProvider>
        </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
