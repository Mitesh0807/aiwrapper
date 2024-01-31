import "./App.css";
import PrivateRoutes from "./routes/PrivteRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  );
}

export default App;
