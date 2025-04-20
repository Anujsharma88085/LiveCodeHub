import { useContext } from "react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { modalConstants, ModalContext } from "../../Providers/ModalProvider";

export const EditorHeader = ({language, setLanguage, theme, setTheme, fileId, folderId, setCode, codeRef}) => {
  const {getDefaultCode, updateLanguage, saveCode, getTitle} = useContext(PlaygroundContext);
  const {setModalPayload, openModal} = useContext(ModalContext);

  const onChangeLanguage = (event) => {
    updateLanguage(fileId, folderId, event.target.value);
    const newCode = getDefaultCode(fileId, folderId);
    setCode(newCode);
    codeRef.current = newCode;
    setLanguage(event.target.value);
  }

  const onChangeTheme = (event) => {
    setTheme(event.target.value);
  }

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert("Code Saved Successfully");
  }

const onEditTitle = () => {
  setModalPayload({fileId, folderId});
  openModal(modalConstants.UPDATE_FILE_TITLE);
}

  return (
    <div className="editor-header">
      <div className="left-container">
        <b className='title'>{getTitle(fileId, folderId)}</b>
        <span className='material-icons editTitle' onClick={onEditTitle}>edit</span>
        <button onClick={onSaveCode}>Save Code</button>
      </div>

      <div className="right-container">
        <select onChange={onChangeLanguage} value={language} style={{fontSize: '12px'}}>
          <option value="cpp">CPP</option>
          <option value="java">JAVA</option>
          <option value="javascript">JAVASCRIPT</option>
          <option value="python">PYTHON</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <select onChange={onChangeTheme} value={theme} >
          <option value="vs-dark">vs-dark</option>
          <option value="vs-light">vs-light</option>
        </select>
      </div>
    </div>
  );
}