import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import ErrorPage from './routes/error-page'

const router = createBrowserRouter([
  { path: '/', element: <Home/>, errorElement: <ErrorPage/> },
  { path: '/about', element: <About/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
