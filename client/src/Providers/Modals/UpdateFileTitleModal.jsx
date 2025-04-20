import './CreatePlaygroundModal.scss';
import { useContext } from 'react';
import { ModalContext } from '../ModalProvider';
import { PlaygroundContext } from '../PlaygroundProvider';
import { createFolderStyles } from './CreateFolderModal';

export const UpdateFileTitleModal = () => {
  const {closeModal, modalPayload} = useContext(ModalContext)
  const playgroundFeatures = useContext(PlaygroundContext);


  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    playgroundFeatures.editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
    closeModal();
  }

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close"  style={{cursor:"pointer"}} onClick={closeModal}>close</span>
        <h1>Update Card Title</h1>
        <div style={createFolderStyles.inputContainer}>
          <input type="text" name='fileName' placeholder='Enter folder Name' style={createFolderStyles.input} required/>
          <button style = {createFolderStyles.btn} type="submit">
            Rename Card
          </button>
        </div>
      </form>
    </div>
  )
}
