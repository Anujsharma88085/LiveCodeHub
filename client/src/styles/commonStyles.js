import backgroundImg from "../assets/background.jpg"; // Ensure the path is valid

export const inputStyle = {
  input: { color: "#ffffff" },
  label: { color: "#ffb3ff" }, // soft pink label
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 179, 255, 0.4)", // soft pink
    },
    "&:hover fieldset": {
      borderColor: "#ff66cc", // brighter on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff33cc", // vivid pink when focused
    },
  },
};

export const styles = {
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)", // deeper overlay to make card pop
    zIndex: 1,
  },
  container: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  paper: {
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.1)", // light transparent for glass effect
    backdropFilter: "blur(16px)", // strong blur for glass
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    color: "white",
    boxShadow: "0 4px 60px rgba(255, 105, 180, 0.3)", // hot pink glow
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 80px rgba(255, 105, 180, 0.5)",
    },
  },
};
