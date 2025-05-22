import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { defaultCodes, PlaygroundContext } from "../PlaygroundProvider";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreatePlaygroundModal = () => {
  // const navigate = useNavigate();
  const ModalFeatures = useContext(ModalContext);
  const playgroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    ModalFeatures.closeModal();
  };

  const onSubmitModal = async (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;
    const playgroundID = ModalFeatures.modalPayload?.playgroundID || "";
    playgroundFeatures.createNewPlayground({
      folderName,
      fileName,
      language,
    });

    try {
      await axios.post('http://localhost:3000/api/v1/playground/createPlayground', {
        playgroundID,
        folderName,
        fileName,
        language,
        code: defaultCodes[language],
      });
      // navigate(`/playground/${playgroundID}`);
    } catch (err) {
      console.error('Error creating playground:', err);
    }

    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span
          className="material-icons close"
          onClick={closeModal}
          style={{ cursor: "pointer" }}
        >
          close
        </span>

        <div className="item">
          <p>Playground ID</p>
          <input
            type="text"
            value={ModalFeatures.modalPayload?.playgroundID || ""}
            readOnly
          />
        </div>

        <div className="item">
          <p>Enter Folder Name</p>
          <input type="text" name="folderName" required />
        </div>

        <div className="item">
          <p>Enter Playground Name</p>
          <input type="text" name="fileName" required />
        </div>

        <div className="item">
          <select name="language" id="">
            <option value="cpp">CPP</option>
            <option value="java">JAVA</option>
            <option value="javascript">JAVASCRIPT</option>
            <option value="python">PYTHON</option>
          </select>

          <button type="submit">Create Playground</button>
        </div>
      </form>
    </div>
  );
};
