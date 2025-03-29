import { useParams } from "react-router-dom"
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
import { useState } from "react";

export const PlaygroundScreen = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const importInput = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if(fileType){
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function(value){
        const importedInput = value.target.result;
        setInput(importedInput);
      }
    }else{
      alert("Please choose a txt file");
    }
  }

  const exportOutput = () => {
    const outputValue = output.trim();

    if(!outputValue){
      alert("Output is Empty");
      return;
    }

    const blob = new Blob([outputValue], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.txt`;
    link.click();
  }
  const onChangeInput = (e) => {
    setInput(e.target.value);
  }

  const params = useParams();
  const {fileId, folderId} = params;
  return (
    <div className="playground-container">
      <div className="header-container">
        <img src="/logo.webp" alt="Logo" className="logo" />
      </div>

      <div className="content-container">
        <div className="editor-container">
          <EditorContainer fileId={fileId} folderId={folderId}/>
        </div>

        <div className="input-output-container">
          <div className="input-output-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <span className="material-icons">cloud_download</span>
              <b>Import Input</b>
            </label>
            <input type="file" id="input" style={{display:'none'}} onChange={importInput}/>
          </div>
          <textarea value={input} onChange={onChangeInput}></textarea>
        </div>

        <div className="input-output-container">
          <div className="input-output-header">
            <b>Output: </b>
            <button className="icon-container" onClick={exportOutput}>
              <span className="material-icons">cloud_upload</span>
              <b>Export output</b>
            </button>
          </div>

          <textarea readOnly value={output} onChange={(e) => setOutput(e.target.value)}></textarea>
        </div>
      </div>
    </div>
  );
}