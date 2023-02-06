import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider, createClient } from "urql";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Game from "./pages/game";
// import Home from "./pages/Home";
// import Article from "./pages/Article";
// import "./index.css";

const urlParams = new URLSearchParams(window.location.search);
const jwt = urlParams.get("jwt");

const urql = createClient({
  url: import.meta.env.VITE_API_URL + "/graphql",
  fetchOptions: () => {
    return {
      headers: {
        authorization: jwt || "",
      },
    };
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <UrqlProvider value={urql}>
    <App />
  </UrqlProvider>
  // </React.StrictMode>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="article/:id" element={<Article />} /> */}
        <Route path="/game" element={<Game />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<div>todo</div>} />
      </Routes>
    </BrowserRouter>
  );
}
