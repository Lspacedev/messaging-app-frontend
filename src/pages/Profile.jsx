import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getProfile();
  }, []);
  async function getProfile() {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setUsername(data.user.username);
      setEmail(data.user.email);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }
  async function updateProfile() {
    if (user.username === "Guest") {
      alert("Cannot update guest account");
      return;
    }
    try {
      if (username === "" || email === "") {
        alert("Nothing to update");
        return;
      }
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
      }
      setLoading(false);
      navigation(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigation(0);
    }
  }

  function handleUpdateToggle() {}
  if (loading) return <div>Loading...</div>;
  if (err !== "") return <div>{err}</div>;

  return (
    <div className="Profile">
      <img src="/images/blank-profile-picture-973460_1280.png" alt="profile" />

      {edit && (
        <button className="close" onClick={() => setEdit(false)}>
          <IoCloseOutline />
        </button>
      )}
      {!edit ? (
        <div>Username: {user && user.username}</div>
      ) : (
        <div className="input-div">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      {!edit ? (
        <div>Email: {user && user.email}</div>
      ) : (
        <div className="input-div">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      <button onClick={!edit ? () => setEdit(true) : () => updateProfile()}>
        {!edit ? "Edit" : "Update"}
      </button>
    </div>
  );
}

export default Profile;
