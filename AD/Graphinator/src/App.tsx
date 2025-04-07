import { useState } from 'react'
import './App.css'
import Vertex from './components/vertex' 
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Vertex></Vertex>
  </div>

  )
}

export default App
