export const EditorFooter = ({code, setCode, codeRef, language}) => {

  const importCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if(fileType){
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function(value){
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      }
    }else{
      alert("Please choose a program file");
    }
  }

  const fileExtensionMapping = {
    cpp: 'cpp',
    javascript: 'js',
    python: 'py', 
    java: 'java',
    html: 'html', 
    css: 'css',
  }

  const exportCode = () => {
    const codeValue = codeRef.current?.trim();

    if(!codeValue){
      alert("Please type some code in the editor before downloading");
    }else{
      //1. create a blob/ instance file in the memory
      const codeBlob = new Blob([codeValue], {type: "text/plain"});

      //2.creating the downloadable link with blob data
      const downloadUrl = URL.createObjectURL(codeBlob);

      //3. create a clickable link to download blob
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.download = `code.${fileExtensionMapping[language]}`;
      link.click();
    }
  }

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
      <input type="file" id='import-code' style={{display:'none'}} onChange={importCode}/>
      <button className='btn' onClick={exportCode}>
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