import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* Routes: default layout includes Header above and Footer below.
          For pages that should not show Footer, we render them without Footer */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <About />
              <Footer />
            </>
          }
        />

        {/* Example: Contact page uses Header but NO Footer */}
        

        {/* Fallback / 404 route — includes Footer */}
        <Route
          path="*"
          element={
            <>
              <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold">404 — Page not found</h2>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
