import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import ScrollToTop from "./ScrollToTop";
import useUserRoute from "./components/routes/userRoutes";
import useAdminRoute from "./components/routes/adminRoutes";
import NotFound from "./components/NotFound";

function App() {
  const userRoutes = useUserRoute();
  const adminRoutes = useAdminRoute();

  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-center" />
        <ScrollToTop />
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            {userRoutes}
            {adminRoutes}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
