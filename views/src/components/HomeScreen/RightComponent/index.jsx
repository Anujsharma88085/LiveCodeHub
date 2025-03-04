import "./index.scss"
export const RightComponent = () => {
  return (
    <div className="right-container">
      <div className="header">
        <div className="title"><span>My</span> Playground</div>
        <button className="add-folder">
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>

      <div className="folder-container">

        <div className="folder-header">
          <div className="folder-header-item">
            <span className="material-icons" style={{color:"#FFCA29"}}>folder</span>
            <span>{"DSA"}</span>
          </div>

          <div className="folder-header-item">
            <span className="material-icons">delete</span>
            <span className="material-icons">edit</span>
            <button>
              <span className="material-icons">add</span>
              <span>New Playground</span>
            </button>
          </div>
        </div>

        <div className="cards-container">

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

        </div>

      </div>

      <div className="folder-container">

        <div className="folder-header">
          <div className="folder-header-item">
            <span className="material-icons" style={{color:"#FFCA29"}}>folder</span>
            <span>{"Fullstack"}</span>
          </div>

          <div className="folder-header-item">
            <span className="material-icons">delete</span>
            <span className="material-icons">edit</span>
            <button>
              <span className="material-icons">add</span>
              <span>New Playground</span>
            </button>
          </div>
        </div>

        <div className="cards-container">

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', gap: '10px'}}>
              <img src="logo.webp" alt="" />
              <div className="title-container">
                <span>{"Heap Implementation"}</span>
                <span>Language: {"Java"}</span>
              </div>
            </div>
            
            <div style={{display:'flex', gap: '5px'}}>
              <span className="material-icons">delete</span>
              <span className="material-icons">edit</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}