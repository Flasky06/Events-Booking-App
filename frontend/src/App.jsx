import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home component
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* Changed path */}
        <Route path="/login" element={<LoginPage />} /> {/* Changed path */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
