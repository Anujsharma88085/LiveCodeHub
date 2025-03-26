import { useContext } from "react"
import { Modal } from "../../Providers/Modals/Modal"
import "./index.scss"
import { RightComponent } from "./RightComponent"
import { ModalContext } from "../../Providers/ModalProvider"

export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);
  
  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal("CREATE_PLAYGROUND");
  }

  return (
    <div className="home-container">
      <div className="left-container">
          <div className="items-container">
            <img src="/logo.webp" alt="LiveCodeHub Logo" style={{borderRadius:"20%"}}/>
            <h1>LiveCode Hub</h1>
            <h3>Code.Compile.Debug</h3>
            <button onClick={openCreatePlaygroundModal} >
              <span className="material-icons">add</span>
              <span>Create Playground</span>
            </button>
          </div>
      </div>
      <RightComponent/>
      <Modal/>
    </div>
  )
}