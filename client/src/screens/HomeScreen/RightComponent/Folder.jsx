import { useContext } from "react";
import { File } from "./File";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";

export const Folder = ({ folderTitle, cards, folderId }) => {

  const playgroundFeatures = useContext(PlaygroundContext);
  const {openModal, setModalPayload} = useContext(ModalContext);

  const handleDeleteFolder = () => {
    playgroundFeatures.deleteFolder(folderId);
  }

  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  }

  const openCreateCardModal = () => {
    setModalPayload(folderId);
    openModal(modalConstants.CREATE_CARD);
  }

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFCA29" }}>
            folder
          </span>
          <span>{folderTitle}</span>
        </div>

        <div className="folder-header-item">
          <span className="material-icons" onClick={handleDeleteFolder}>delete</span>
          <span className="material-icons" onClick={onEditFolderTitle}>edit</span>
          <button style={{cursor:'pointer'}} onClick={openCreateCardModal}>
            <span className="material-icons">add</span>
            <span>New Playground</span>
          </button>
        </div>
      </div>

      <div className="cards-container">
        {cards?.map((file, index) => {
          return <File file={file} folderId={folderId} key={index}></File>;
        })}
      </div>
    </div>
  );
};