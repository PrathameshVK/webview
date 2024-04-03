import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import Auth from "./components/Auth";
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import Room from "./components/Room";

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/room"
              element={
                <PrivateRoute>
                  <Room />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </AuthProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
