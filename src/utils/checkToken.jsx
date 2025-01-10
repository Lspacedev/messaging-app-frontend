const parseJwt = async (token, refresh) => {
  const decode = JSON.parse(atob(token.split(".")[1]));
  const twoMin = 1000 * 60 * 2;
  const expTime = decode.exp * 1000;

  if (expTime - twoMin < new Date().getTime()) {
    const userId = localStorage.getItem("userId");
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

      localStorage.clear("token");
      refresh();

      return;
    } catch (err) {
      console.log(err);
    }
  }
};

export default parseJwt;
