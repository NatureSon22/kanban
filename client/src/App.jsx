import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import RootBoard from "./pages/Main/RootBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootBoard></RootBoard>} />
        <Route path="/auth" element={<Auth></Auth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
