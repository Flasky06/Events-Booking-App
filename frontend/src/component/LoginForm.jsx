import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("YOUR_AUTH_API/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />

        <InputField
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
        />

        <ErrorMessage message={errorMessage} />

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Log In
        </Button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")} // Navigate to signup page
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
