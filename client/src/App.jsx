import Home from "./pages/home"
import Customizer from "./pages/Customizer"
import Canvas from "./canvas"

function App() {

  return (
    <div className="app transition-all ease-in">
      <Home/>
      <Customizer/>
      <Canvas/>
    </div>
  )
}

export default App
