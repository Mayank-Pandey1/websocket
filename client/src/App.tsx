import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Input from './components/Input'

type PlayerScore = {
  name: string
  score: string
  id?: string
}

function App() {

  const [scores, setScores] = useState({})
  const [allScores, setAllScores] = useState<PlayerScore[]>([])


  const socket = io("http://localhost:3000")

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log("socket connection established with server from client", socket.id)
    })
  }

  function handleInput (event: any) {
    let { name, value } = event.target;

    const currentObj = {[name]: value}

    setScores((prev) => ({...prev, ...currentObj}))
  }

  function sendScores () {
    socket.emit("scores", scores)

    socket.on('playerScores', (playerScores) => {
      setAllScores(playerScores)
    })
  }

  useEffect(() => {
    connectSocket()
  }, [])

  return (
    <>
      <h1 className='mb-10'> React Multiplayer dashboard</h1>
      <Input name = 'name' placeholder = "Enter your name" handleInput = { handleInput } />
      <Input name = 'score' placeholder = "Enter your score" handleInput = { handleInput } />
      <button onClick = {sendScores}>Publish Score</button>

      <table>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
        <tbody>
        {allScores.map((score) => (
          <tr>
          <td>{score?.name}</td>
          <td>{score?.score}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default App
