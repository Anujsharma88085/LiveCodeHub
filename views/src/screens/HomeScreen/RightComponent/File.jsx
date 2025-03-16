export const File = ({ file }) => {
  return (
    <div className="card">
      <div style={{ display: "flex", gap: "10px" }}>
        <img src="logo.webp" alt="" />
        <div className="title-container">
          <span>{file.title}</span>
          <span>Language: {file.language}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        <span className="material-icons">delete</span>
        <span className="material-icons">edit</span>
      </div>
    </div>
  );
};
