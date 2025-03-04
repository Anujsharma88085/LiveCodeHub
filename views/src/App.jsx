import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./components/HomeScreen/leftside";
import { PlaygroundScreen } from "./components/PlayGroundScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/playground" element={<PlaygroundScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;