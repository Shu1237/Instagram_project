import './App.css'
import LeftSide from './components/leftSide'
import MiddleSide from './components/middleSide'
import RightSide from './components/rightSide'

function App() {
  return (
    <>
      <div className="App">
        <div className="leftSideHome">
          <LeftSide />
        </div>
        <div className="midSideHome">
          <MiddleSide />
        </div>
        <div className="rightSide">
         <RightSide/>
        </div>
      </div>
    </>
  )
}

export default App
