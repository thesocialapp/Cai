import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/home/Home.jsx'
import ErrorPage from './routes/ErrorPage.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home/>, errorElement: <ErrorPage/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
