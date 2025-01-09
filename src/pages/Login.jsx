import { useState } from "react";
import { useNavigate } from "react-router";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  async function login() {
    try {
      if (username === "" || password === "") {
        alert("Fields cannot be empty");
        return;
      }
      setLoading(true);

      let userData = { username: username, password: password };

      const res = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        navigation("/home");
      } else {
        setErrors(data.errors);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function guestSignIn() {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/guest-log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-length": 0 },
      });
      const data = await res.json();
      setLoading(false);
      if (typeof data.errors !== "undefined") {
        setErrors(data.errors);
      } else {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigation("/home");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="Login">
      <div className="page-container">
        <div className="login-form-div">
          <div className="logo">
            QUI
            <BiSolidMessageRoundedDots className="icon" />
          </div>
          <h3>Log in to your account.</h3>
          {errors &&
            errors.length > 0 &&
            errors.map((err, i) => (
              <span key={i} className="err">
                {err}
              </span>
            ))}
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit" onClick={loading ? console.log() : login}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <button
            className="guest-submit"
            onClick={loading ? console.log() : guestSignIn}
          >
            {loading ? "Loading..." : "Guest sign in"}
          </button>
          <div className="dont-have">
            <div>Dont have an account?</div>
            <div className="button" onClick={() => navigation("/signup")}>
              Register here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
