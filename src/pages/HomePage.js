import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="py-5">
        <h1 className="text-center">Welcome to your dashboard, $user</h1>
      </div>
      <div className="text-center">
        <Link to="/teams" className="btn btn-primary mx-3">Teams</Link>
        <Link to="/reports" className="btn btn-primary mx-3">Reports</Link>
      </div>
    </>
  );
};

export default HomePage;
