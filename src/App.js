import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import WeatherApp from "./components/WeatherWidget";
import TipDetail from "./pages/TipDetail";
import { mobileService } from "./services/mobileService";

const App = () => {
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false);

  const handleDimBackground = () => {
    setIsBackgroundDimmed(true);
  }

  const  handleDimNav = () => {
    setIsBackgroundDimmed(true);
  }

  return (
    <div className={`app ${isBackgroundDimmed ? "dimmed" : ""}`}>
      {window.innerWidth > mobileService && <WeatherApp />}
      <Navbar className="nav" handleDimNav={handleDimNav} />

      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <Home
                className="tips"
                dimBackground={handleDimBackground}
                isBackgroundDimmed={isBackgroundDimmed}
                setIsBackgroundDimmed={setIsBackgroundDimmed}
              />
            </div>
          }
        />
        <Route
          path="/all-tips"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <Tips className="tips" />
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <Signup className="tips" />
            </div>
          }
        />

        <Route
          path={`/users/profile/:id`}
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <Profile
                className="tips"
                isBackgroundDimmed={isBackgroundDimmed}
                setIsBackgroundDimmed={setIsBackgroundDimmed}
              />
            </div>
          }
        />
        <Route
          path={`/tips/tip-detail/:id`}
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <TipDetail className="tips" />
            </div>
          }
        />
        <Route
          path={`/login`}
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <Login className="tips" />
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
