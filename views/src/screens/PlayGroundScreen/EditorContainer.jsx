import './EditorContainer.scss';
import { EditorHeader } from './EditorHeader';
import { EditorFooter } from './EditorFooter';
import { EditorBody } from './EditorBody';

export const EditorContainer = () => {
  return (
    <div className='root-editor-container'>
      <EditorHeader/>
      <EditorBody/>
      <EditorFooter/>
    </div>
  );
}