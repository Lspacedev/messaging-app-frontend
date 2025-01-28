import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router";
function Home() {
  const location = useLocation();
  const { uid, groupId } = useParams();

  return (
    <div className="Home">
      <Sidebar />
      <div className="main">
        {typeof uid === "undefined" && typeof groupId === "undefined" && (
          <Header />
        )}
        <SearchResults />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
