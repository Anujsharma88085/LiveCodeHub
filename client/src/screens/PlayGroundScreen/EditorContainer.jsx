import './EditorContainer.scss';
import { EditorHeader } from './EditorHeader';
import { EditorFooter } from './EditorFooter';
import { EditorBody } from './EditorBody';
import { useContext, useRef, useState } from 'react';
import { PlaygroundContext } from '../../Providers/PlaygroundProvider';

export const EditorContainer = ({fileId, folderId, runCode}) => {
  const {getDefaultCode, getLanguage} = useContext(PlaygroundContext);

  const [code, setCode] = useState(() => {
    const code = getDefaultCode(fileId, folderId);
    return code;
  });

  const codeRef = useRef(code);
  const [language, setLanguage] = useState(() => {
    return getLanguage(fileId, folderId);
  });
  const [theme, setTheme] = useState('vs-dark');

  const [isFullScreen, setIsFullScreen] = useState(false);


  return (
    <div className='root-editor-container' style={isFullScreen ? styles.fullScreen : {}}>
      <EditorHeader language={language} setLanguage= {setLanguage} theme={theme} setTheme={setTheme} fileId={fileId} folderId={folderId} setCode={setCode} codeRef={codeRef}/>
      <EditorBody code={code} setCode={setCode} codeRef={codeRef} language={language} theme={theme}/>
      <EditorFooter code={code} setCode={setCode} codeRef={codeRef} language={language} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} runCode={runCode}/>
    </div>
  );
}

const styles = {
  fullScreen: {
    position: 'absolute', 
    top: '0',
    left: '0', 
    right: '0', 
    bottom: '0',
    zIndex: '10',
  }
}