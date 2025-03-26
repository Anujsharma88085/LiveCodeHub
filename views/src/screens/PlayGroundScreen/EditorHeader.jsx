export const EditorHeader = () => {
  return (
    <div className="editor-header">
      <div className="left-container">
        <b className='title'>{"title of the card"}</b>
        <span className='material-icons'>edit</span>
        <button>Save Code</button>
      </div>

      <div className="right-container">
        <select name="" id="">
          <option value="cpp">CPP</option>
          <option value="java">JAVA</option>
          <option value="javascript">JAVASCRIPT</option>
          <option value="python">PYTHON</option>
        </select>
        <select name="" id="">
          <option value="vs-dark">vs-dark</option>
          <option value="vs-light">vs-light</option>
        </select>
      </div>
    </div>
  );
}