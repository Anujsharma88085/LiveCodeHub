import { useContext } from 'react';
import './CreatePlaygroundModal.scss'
import { ModalContext } from '../ModalProvider';
import { PlaygroundContext } from '../PlaygroundProvider';

export const CreateFolderModal = () => {
  const ModalFeatures = useContext(ModalContext)
  const playgroundFeatures = useContext(PlaygroundContext);

  const closeModal = () => {
    ModalFeatures.closeModal();
  }

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    playgroundFeatures.createNewFolder(folderName, ModalFeatures.modalPayload);
    closeModal();
  }

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close"  style={{cursor:"pointer"}} onClick={closeModal}>close</span>
        <h1>Create New Folder</h1>
        <div style={createFolderStyles.inputContainer}>
          <input required type="text" name='folderName' placeholder='Enter folder Name' style={createFolderStyles.input}/>
          <button style = {createFolderStyles.btn} type="submit">
            Create Folder
          </button>
        </div>
      </form>
    </div>
  )
}

export const createFolderStyles = {
  inputContainer: {
    display: 'flex',
    gap: 10
  },
  input: {
    flexGrow: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: '#241F21',
    border: 'none',
    borderRadius: 4,
    color: 'white',
    padding: '0px 10px'
  }
}