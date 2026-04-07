import { useState } from "react";
import { login } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await login(email.trim(), password);
      if (response.error) {
        setError(response.error);
        return;
      }
      localStorage.setItem("token", response.token);
      setTimeout(() => navigate("/tasks"), 1500);
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="auth-wrap">
      {/* ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="logo-dot" />
          Taskly
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your workspace</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          >
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}
