import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { PlaygroundScreen } from "./screens/PlayGroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from "./Providers/ModalProvider";
import { Modal } from "./Providers/Modals/Modal";


function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen/>} />
          </Routes>
        </BrowserRouter>
        <Modal/>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;