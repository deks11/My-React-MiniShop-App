import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const changeTab = (tab) => {
    setActiveTab(tab);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (activeTab === "register") {
        if (password.length < 6) {
          throw new Error("Password must contain at least 6 characters.");
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match!");
        }

        await register({
          name,
          email,
          password,
        });
      } else {
        await login(email, password);
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          Mini<span>Shop.</span>
        </div>

        <div className="auth-heading">
          <h1>
            {activeTab === "login"
              ? "Welcome Back!"
              : "Create Account"}
          </h1>

          <p>
            {activeTab === "login"
              ? "Login to continue shopping"
              : "Join MiniShop and start shopping"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={activeTab === "login" ? "active" : ""}
            onClick={() => changeTab("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={activeTab === "register" ? "active" : ""}
            onClick={() => changeTab("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-fields">

          {activeTab === "register" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={activeTab === "register" ? 6 : undefined}
            required
          />

          {activeTab === "register" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          )}

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : activeTab === "login"
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        <div className="auth-bottom">
          {activeTab === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => changeTab("register")}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => changeTab("login")}
              >
                Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default AuthPage;