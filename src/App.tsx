import "./styles/App.scss";

import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { About } from "./views/About";
import { Todos } from "./views/Todos";
import { NavBar } from "./components/NavBar";
import { Articles } from "./views/Articles";
import { Article } from "./views/Article";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<Article />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
