import "./index.scss"
import { RightComponent } from "./RightComponent"

export const HomeScreen = () => {
  return (
    <div className="home-container">
      <div className="left-container">
          <div className="items-container">
            <img src="logo.webp" alt="LiveCodeHub Logo" />
            <h1>LiveCode Hub</h1>
            <h3>Code.Compile.Debug</h3>
            <button>
              <span className="material-icons">add</span>
              <span>Create Playground</span>
            </button>
          </div>
      </div>
      <RightComponent/>
    </div>
  )
}