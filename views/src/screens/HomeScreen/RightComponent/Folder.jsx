import { useContext } from "react";
import { File } from "./File";
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider";

export const Folder = ({ folderTitle, cards, id }) => {

  const playgroundFeatures = useContext(PlaygroundContext);
  const {folders} = playgroundFeatures;

  const handleDeleteFolder = () => {
    playgroundFeatures.deleteFolder(id);
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
          <span className="material-icons">edit</span>
          <button>
            <span className="material-icons">add</span>
            <span>New Playground</span>
          </button>
        </div>
      </div>

      <div className="cards-container">
        {cards?.map((file, index) => {
          return <File file={file} key={index}></File>;
        })}
      </div>
    </div>
  );
};