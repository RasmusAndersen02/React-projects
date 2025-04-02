import { useState } from 'react'
import './App.css'
import Vertex from './components/vertex' 
function App() {
  const [count, setCount] = useState(0)

  return (
    <Vertex></Vertex>
  )
}

export default App
