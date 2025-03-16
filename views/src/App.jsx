import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { PlaygroundScreen } from "./screens/PlayGroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";


function App() {
  return (
    <PlaygroundProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/playground" element={<PlaygroundScreen/>} />
      </Routes>
    </BrowserRouter>
    </PlaygroundProvider>
  );
}

export default App;