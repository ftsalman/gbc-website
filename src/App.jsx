import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.jsx'
import { ReactLenis } from 'lenis/react'
import { Preloader } from './components/preloader/Preloader.jsx'

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <RouterProvider router={router} />
    </ReactLenis>
  )
}
