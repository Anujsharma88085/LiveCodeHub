export const EditorFooter = () => {
  return (
    <div className="editor-footer">
      <button className='btn'>
        <span className='material-icons'>fullscreen</span>
        <span>Full Screen</span>
      </button>
      <label htmlFor="import-code" className='btn'>
        <span className='material-icons'>cloud_download</span>
        <span>Import Code</span>
      </label>
      <input type="file" id='import-code' style={{display:'none'}}/>
      <button className='btn'>
        <span className='material-icons'>cloud_upload</span>
        <span>Export Code</span>
      </button>
      <button className='btn'>
        <span className='material-icons'>play_arrow</span>
        <span>Run Code</span>
      </button>
    </div>
  );
}