import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, logout } = useAuth0();

  console.log(user);

  return (
    <>
      <h1>I am Dashboard</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </>
  );
};

export default Dashboard;
