import './CreatePlaygroundModal.scss';
import { useContext } from 'react';
import { ModalContext } from '../ModalProvider';
import { PlaygroundContext } from '../PlaygroundProvider';
import { createFolderStyles } from './CreateFolderModal';

export const UpdateFolderTitleModal = () => {
  const ModalFeatures = useContext(ModalContext)
  const playgroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    ModalFeatures.closeModal();
  }

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    playgroundFeatures.editFolderTitle(folderName, ModalFeatures.modalPayload);
    closeModal();
  }

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close"  style={{cursor:"pointer"}} onClick={closeModal}>close</span>
        <h1>Update Folder Title</h1>
        <div style={createFolderStyles.inputContainer}>
          <input type="text" name='folderName' placeholder='Enter folder Name' style={createFolderStyles.input} required/>
          <button style = {createFolderStyles.btn} type="submit">
            Rename Folder
          </button>
        </div>
      </form>
    </div>
  )
}
