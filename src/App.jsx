// import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NEWS_UPDATES_ROUTES from './router/Router'

function App() {

  const router = createBrowserRouter([
    ...NEWS_UPDATES_ROUTES,
  ])
  
  return (
    <>
    <RouterProvider router={router}>
      
    </RouterProvider>
    </>
  )
}

export default App
