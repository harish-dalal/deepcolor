import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Upload from "./Pages/Upload/Upload";
import Download from "./Pages/Download/Download";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to={"/Home"} />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='/register' element={<Register />} /> */}
        <Route path="/" element={<Home />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
