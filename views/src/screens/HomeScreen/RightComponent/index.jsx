import { useContext } from "react";
import "./index.scss";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";
import { Folder } from "./Folder";
import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";

export const RightComponent = () => {
  const { folders } = useContext(PlaygroundContext);
  const modalFeatures = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  }

  return (
    <div className="right-container">
      <div className="header">
        <div className="title">
          <span>My</span> Playground
        </div>
        <button className="add-folder" onClick={openCreateNewFolderModal}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>

      {folders?.map((folder, index) => {
        return (
          <Folder
            folderTitle={folder?.title}
            cards={folder?.files}
            key={index}
            id = {folder.id}
          />
        );
      })}
    </div>
  );
};
