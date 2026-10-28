import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

import Loader from "./components/Loader/Loader";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BookingForm from "./pages/BookingForm";

function App() {
const [loading, setLoading] = useState(true);

useEffect(() => {
const timer = setTimeout(() => {
setLoading(false);
}, 2500);


return () => clearTimeout(timer);


}, []);

if (loading) {
return ( <AnimatePresence mode="wait"> <Loader /> </AnimatePresence>
);
}

return ( <BrowserRouter> <Routes>
<Route path="/" element={<Home />} />


    <Route
      path="/admin/login"
      element={<AdminLogin />}
    />

    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="/admin/booking"
      element={<BookingForm />}
    />

    <Route
      path="*"
      element={<Navigate to="/" replace />}
    />
  </Routes>
</BrowserRouter>


);
}

export default App;
