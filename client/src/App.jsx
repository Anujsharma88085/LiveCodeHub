import { Routes, Route, useLocation } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { PlaygroundScreen } from "./screens/PlayGroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from "./Providers/ModalProvider";
import { Modal } from "./Providers/Modals/Modal";
import Signup from "./pages/register/signup";
import LoginPage from "./pages/register/login";
import { useAuth } from "./context/AuthContext";
import ResetPassword from "./pages/Password/ResetPassword";
import Profile from "./pages/Profile/ProfilePage";
import { Header } from "../components/Header";

function App() {
  const { isSignup } = useAuth();
  const location = useLocation();

  // You can hide header on specific routes like login/signup if needed:
  const hideHeader = ["/login", "/signup", "/reset-password"].includes(location.pathname);

  return (
    <PlaygroundProvider>
      <ModalProvider>
        {!hideHeader && <Header />}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/playground/:fileId/:folderId"
            element={<PlaygroundScreen />}
          />
        </Routes>
        <Modal />
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
