import { useState } from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import { WelcomePage } from './pages'

function App() {
  const [count, setCount] = useState(0)
  return (
    <NextUIProvider>
      <>
        <WelcomePage />
      </>
    </NextUIProvider>
  )
}

export default App
