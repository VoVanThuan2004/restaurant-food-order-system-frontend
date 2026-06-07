import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-red-500 text-2xl">Register Page</h1>
      <button
        className="bg-amber-400 p-4 rounded-xl cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Quay trở lại
      </button>
    </div>
  );
};

export default RegisterPage;
