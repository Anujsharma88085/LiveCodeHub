import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";
import { useContext } from "react";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";

export const File = ({ file, folderId }) => {
  const {setModalPayload, openModal} = useContext(ModalContext);
  const {deleteFile} = useContext(PlaygroundContext)

  const onEditFile = () => {
    setModalPayload({fileId: file.id, folderId:folderId});
    openModal(modalConstants.UPDATE_FILE_TITLE);
  }

  const onDeleteFile = () => {
    deleteFile(folderId, file.id);
  }

  return (
    <div className="card">
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
