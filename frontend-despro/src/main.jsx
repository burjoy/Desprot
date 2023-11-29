import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
//import './index.css'
import { Graph } from '../components/grafik.jsx'
import { Menu } from '../components/menu.jsx'
import { AppRouter } from '../routes/router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Graph /> */}
    {/* <Menu /> */}
    <AppRouter/>
  </React.StrictMode>,
)
