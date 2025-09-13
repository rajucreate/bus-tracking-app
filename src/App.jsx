import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './App2.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="main">
        
        <div class="bg"></div>
        

        <div id="box">

          <h1>Login</h1>

          <div id="input">
            <input type="text" placeholder='UserId'/>
            <input type="password" placeholder='Password'/>
          </div>

            <a href="#">Forgot Password</a><br />

            <button>Login</button>

            <p class='ForSignup'>Account does not exist? <a href="#">Sign up</a></p>

        </div>
        
        </div>
    </>
  )
}

export default App
