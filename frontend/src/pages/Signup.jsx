import { useState } from "react";
import { register } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await register(email.trim(), password);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Account created! Redirecting to login…");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-dot" />
          Taskly
        </div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Start organising your tasks today</p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
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
            <label className="form-label" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className="input"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">
              Confirm Password
            </label>
            <input
              id="signup-confirm"
              type="password"
              className="input"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          >
            Create Account
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}
