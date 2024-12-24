import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Welcome to Our App</h1>
      <div>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Go to Login / SignUp
        </Link>
      </div>
    </div>
  );
};

export default Home;
