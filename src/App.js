import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";

function App() {

  const apiKey = process.env.REACT_APP_NEWS_API
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/Business"
          element={
            <Categories
              cat="business"
              pageSize={10}
              apiKey={apiKey}
            />
          }
        />
        <Route
          path="/Sports"
          element={
            <Categories
              cat="sports"
              pageSize={10}
              apiKey={apiKey}
            />
          }
        />
        <Route
          path="/Entertainment"
          element={
            <Categories
              cat="entertainment"
              pageSize={10}
              apiKey={apiKey}
            />
          }
        />
        <Route
          path="/Science"
          element={
            <Categories
              cat="science"
              pageSize={10}
              apiKey={apiKey}
            />
          }
        />
        <Route
          path="/Technology"
          element={
            <Categories
              cat="technology"
              pageSize={10}
              apiKey={apiKey}
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
