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
    playgroundFeatures.createNewFolder(folderName);

   closeModal();
  }

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close"  style={{cursor:"pointer"}} onClick={closeModal}>close</span>

        <h1>Create New Folder</h1>

        <div style={styles.inputContainer}>
          <input type="text" name='folderName' placeholder='Enter folder Name' style={styles.input}/>
          <button style = {styles.btn} type="submit">
            Create Folder
          </button>
        </div>
      </form>
    </div>
  )
}

const styles = {
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