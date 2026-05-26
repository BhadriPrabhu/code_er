import './App.css'
import Router from './routing/router'
import Login from './screens/login'
import TestLaunch from './screens/testLaunch'

function App() {

  return (
    <div className="app">
      {/* <Login />
      <TestLaunch/> */}
      <Router/>
    </div>
  )
}

export default App
