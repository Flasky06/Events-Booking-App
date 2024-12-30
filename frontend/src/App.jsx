import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home component
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import EventPage from "./pages/EventPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProtectedRoute from "./component/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import HeaderComponent from "./component/layout/HeaderComponent";
import ConditionalyShowNavbar from "./component/layout/ConditionalyShowNavbar";

function App() {
  return (
    <BrowserRouter>
      <ConditionalyShowNavbar>
        {" "}
        <HeaderComponent />
      </ConditionalyShowNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
