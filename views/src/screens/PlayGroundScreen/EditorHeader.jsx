import { useContext } from "react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";

export const EditorHeader = ({language, setLanguage, theme, setTheme, fileId, folderId, setCode}) => {
  const {getDefaultCode, updateLanguage} = useContext(PlaygroundContext);

  const onChangeLanguage = (event) => {
    updateLanguage(fileId, folderId, event.target.value);
    const code = getDefaultCode(fileId, folderId);
    setCode(code);
    setLanguage(event.target.value);
  }

  const onChangeTheme = (event) => {
    setTheme(event.target.value);
  }

  return (
    <div className="editor-header">
      <div className="left-container">
        <b className='title'>{"title of the card"}</b>
        <span className='material-icons'>edit</span>
        <button>Save Code</button>
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