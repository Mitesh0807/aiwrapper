import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && <Navigate to={"/dashboard"} />}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </>
  );
};

export default Home;
