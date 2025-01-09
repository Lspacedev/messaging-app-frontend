import { useState } from "react";
import { useNavigate } from "react-router";
import { BiSolidMessageRoundedDots } from "react-icons/bi";

function SignUp() {
  const [obj, setObj] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit() {
    try {
      if (
        obj.username === "" ||
        obj.email === "" ||
        obj.password === "" ||
        obj.confirmPassword === ""
      ) {
        alert("Fields cannot be empty");
        return;
      }
      setLoading(true);
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigation("/");
      } else {
        setErrors(data.errors);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="SignUp">
      <div className="page-container">
        <div className="sign-up-form-div">
          <div className="logo">
            QUI
            <BiSolidMessageRoundedDots className="icon" />
          </div>
          <h4>Create an account</h4>
          <div className="dont-have">
            <div>Already an account?</div>
            <div className="button" onClick={() => navigation("/")}>
              Login
            </div>
          </div>
          {errors &&
            errors.length > 0 &&
            errors.map((err, i) => (
              <span key={i} className="err">
                {err}
              </span>
            ))}
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <label htmlFor="confirmPassword">Confirm assword: </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <button
            className="submit"
            onClick={loading ? console.log() : handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
