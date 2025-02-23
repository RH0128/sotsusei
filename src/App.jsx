import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <h1>Vite + React</h1>
      <div className="card">
         <Button variant="ghost" size="lg">
        Click
      </Button>

      <Button variant="destructive" size="sm">
        Destructive Small
      </Button>

      <Button variant="outline" size="default">
        Outline Button
      </Button>
      </div>
    
    </>
  )
}

export default App
