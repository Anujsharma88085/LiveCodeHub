import {v4} from 'uuid';
import { useContext } from "react"
import "./CreatePlaygroundModal"
import { ModalContext } from "../ModalProvider"
import { defaultCodes, PlaygroundContext } from '../PlaygroundProvider';

export const CreateCardModal = () => {
  const {closeModal, modalPayload} = useContext(ModalContext);
  const {createPlayground} = useContext(PlaygroundContext)

  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;

    const file = {
    id: modalPayload.playgroundID,
    title: fileName,
    language,
    code: defaultCodes[language],
  }

    createPlayground(modalPayload.folderId, file);
    closeModal();
  }

  return <div className="modal-container">
    <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal} style={{cursor:"pointer"}}>close</span>

        <h1>Create New Playground</h1>
        <div className="item">
          <p>Playground ID</p>
          <input
            type="text"
            value={modalPayload?.playgroundID || ''}
            readOnly
            style={{ backgroundColor: "#f0f0f0", border: "none", padding: "8px" }}
          />
        </div>

        <div className="item">
          <input type="text" placeholder='Enter Playground name here' name="fileName" required/>
        </div>
        <div className="item">
          <select name="language" id="">
            <option value="cpp">CPP</option>
            <option value="java">JAVA</option>
            <option value="javascript">JAVASCRIPT</option>
            <option value="python">PYTHON</option>
          </select>

          <button type="submit">
            Create Playground
          </button>
        </div>
      </form>
  </div>
}