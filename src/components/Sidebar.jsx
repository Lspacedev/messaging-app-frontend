import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineInbox } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BiSolidMessageRoundedDots } from "react-icons/bi";

function Sidebar() {
  const navigation = useNavigate();
  function goInbox() {
    navigation("/home/inbox");
  }
  function goFriends() {
    navigation("/home/friends");
  }
  function goProfile() {
    navigation("/home/profile");
  }
  function goGroup() {
    navigation("/home/groups");
  }
  async function logOut() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ login: false }),
        }
      );

      localStorage.clear();
      navigation("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="Sidebar">
      <div className="logo">
        QUI
        <BiSolidMessageRoundedDots className="icon" />
      </div>
      <div className="links">
        <div onClick={goFriends} className="link">
          <FaUserFriends className="icon" />
          <h5>Friends</h5>
        </div>
        <div>
          <div onClick={goInbox} className="link">
            <MdOutlineInbox className="icon" />

            <h5>Inbox</h5>
          </div>
        </div>
        <div onClick={goGroup} className="link">
          <MdGroups className="icon" />

          <h5>Groups</h5>
        </div>
        <div onClick={goProfile} className="link">
          <FaUserCircle className="icon" />

          <h5>Profile</h5>
        </div>
        <div onClick={logOut} className="link">
          <MdOutlineLogout className="icon" />

          <h5>Logout</h5>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
