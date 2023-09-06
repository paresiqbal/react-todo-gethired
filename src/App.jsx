// Rdd
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Views
import Home from "./views/Home";
import Detail from "./views/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
