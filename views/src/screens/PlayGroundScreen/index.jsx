import { useParams } from "react-router-dom"
import "./index.scss"
import { EditorContainer } from "./EditorContainer";

export const PlaygroundScreen = () => {
  const params = useParams();
  const {fileId, folderId} = params;
  return (
    <div className="playground-container">
      <div className="header-container">
        <img src="/logo.webp" alt="Logo" className="logo" />
      </div>
      <div className="content-container">
        <div className="editor-container">
          <EditorContainer/>
        </div>

        <div className="input-output-container">
          <div className="input-output-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <span className="material-icons">cloud_download</span>
              <b>Import Input</b>
            </label>
            <input type="file" id="input" style={{display:'none'}}/>
          </div>
          <textarea name="" id=""></textarea>
        </div>

        <div className="input-output-container">
          <div className="input-output-header">
            <b>Output: </b>
            <button className="icon-container">
              <span className="material-icons">cloud_upload</span>
              <b>Export output</b>
            </button>
          </div>

          <textarea name="" id="" readOnly></textarea>
        </div>
      </div>
    </div>
  );
}