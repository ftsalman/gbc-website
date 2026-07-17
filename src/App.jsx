import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.jsx'
import { ReactLenis } from 'lenis/react'

export const App = () => {
  return (
    <ReactLenis root>
      <RouterProvider router={router} />
    </ReactLenis>
  )
}
