import Editor from '@monaco-editor/react'
import { useRef } from 'react'

const editorOptions = {
  fontSize: '16px',
  wordWrap: 'on',
}

export const EditorBody = ({code, setCode, codeRef, language, theme}) => {
  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
  }

  return (
    <div className="editor-body">
      <Editor
        width={'100%'}
        height={'100%'}
        language={language}
        options={editorOptions}
        theme={theme}
        onChange={onChangeCode}
        value={code}
      />
    </div>
  );
}