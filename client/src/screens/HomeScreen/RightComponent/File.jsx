import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";
import { useContext } from "react";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { useNavigate } from "react-router-dom";

export const File = ({ file, folderId }) => {
  const {setModalPayload, openModal} = useContext(ModalContext);
  const {deleteFile} = useContext(PlaygroundContext);
  const navigate  = useNavigate();

  const onEditFile = () => {
    setModalPayload({fileId: file.id, folderId:folderId});
    openModal(modalConstants.UPDATE_FILE_TITLE);
  }

  const onDeleteFile = () => {
    deleteFile(folderId, file.id);
  }

  const navigateToPlayground = () => {
    navigate(`/playground/${file.id}/${folderId}`);
  }

  return (
    <div className="card" onClick={navigateToPlayground}>
      <div style={{ display: "flex", gap: "10px" }}>
        <img src="logo.webp" alt="" />
        <div className="title-container">
          <span>{file.title}</span>
          <span>Language: {file.language}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <span className="material-icons" onClick={onDeleteFile}>delete</span>
        <span className="material-icons" onClick={onEditFile}>edit</span>
      </div>
    </div>
  );
};
