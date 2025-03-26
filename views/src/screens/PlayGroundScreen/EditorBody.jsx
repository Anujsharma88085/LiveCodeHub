import Editor from '@monaco-editor/react'

const editorOptions = {
  fontSize: '16px',
  wordWrap: 'on',
}

export const EditorBody = () => {
  const onChangeCode = (newCode) => {
    //handle something with the newCode
    // console.log({newCode})
  }

  return (
    <div className="editor-body">
      <Editor
        width={'100%'}
        height={'100%'}
        language={'javascript'}
        options={editorOptions}
        theme={'vs-dark'}
        onChange={onChangeCode}
      />
    </div>
  );
}