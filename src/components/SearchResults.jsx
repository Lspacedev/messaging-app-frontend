import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import SearchBar from "./SearchBar";
import { IoCloseOutline } from "react-icons/io5";
function SearchResults() {
  const [users, setUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigation = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 0) {
      let filteredUsers = users.filter((user) =>
        user.username.toLowerCase().match(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
    return () => {
      setSearchResults([]);
    };
  }, [searchTerm]);
  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const [currUser] = data.users.filter((user) => user.id == userId);
        setUserFriends(currUser.friends);
        setUsers(data.users);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }
  function closeSearchMenu() {
    const search = document.querySelector(".SearchResults");
    search.classList.toggle("active");
  }
  function search(term) {
    setSearchTerm(term);
  }
  async function addFriend(id) {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/users/${userId}/friends`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ friendId: id }),
        }
      );

      const data = await res.json();

      setLoading(false);
      navigation(0);
    } catch (err) {
      console.log(err);
      setErr(err.message);
      setLoading(false);
    }
  }
  function isFriend(id) {
    const friend = userFriends.filter((friend) => friend.friendId == id);
    return friend.length > 0 ? true : false;
  }
  if (err !== "") return <div>{err}</div>;
  return (
    <div className="SearchResults">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="closebtn" onClick={closeSearchMenu}>
            <IoCloseOutline />
          </div>
          <SearchBar search={search} />
          <div className="results">
            {searchResults && searchResults.length !== 0 ? (
              searchResults.map((user, i) => (
                <div className="user" key={i}>
                  <div
                    className={user && user.onlineStatus ? "online" : "offline"}
                  ></div>
                  <p>{user && user.username}</p>
                  {user.id != userId ? (
                    <button
                      onClick={() =>
                        user && isFriend(user.id)
                          ? console.log()
                          : addFriend(user.id)
                      }
                    >
                      {user && isFriend(user.id) ? "Friend" : "Add"}
                    </button>
                  ) : (
                    <button>you</button>
                  )}
                </div>
              ))
            ) : searchResults &&
              searchResults.length === 0 &&
              searchTerm.length > 0 ? (
              <div>User not found</div>
            ) : (
              <div> </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
