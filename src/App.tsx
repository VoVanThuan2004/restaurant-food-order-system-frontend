import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppProviders from "./app/provider";
import { useEffect } from "react";
import router from "./routes/router";
import useAuthStore from "./stores/useAuthStore";

function App() {
  const boostrap = useAuthStore((state) => state.boostrap);
  const isInitialized = useAuthStore((state) => state.isInitialized);


  useEffect(() => {
    boostrap();
  }, []);

  // useEffect(() => {
  //   fetchProfile();
  // }, [fetchProfile]);

  if (!isInitialized) return null;


  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
