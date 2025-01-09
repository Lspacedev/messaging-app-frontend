import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="main">
        <Header />
        <SearchResults />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
