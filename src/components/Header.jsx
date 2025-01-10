function Header() {
  function openSearchMenu() {
    const search = document.querySelector(".SearchResults");
    search.classList.toggle("active");
  }
  return (
    <div className="Header">
      <div className="search-div" onClick={openSearchMenu}>
        Find friends
      </div>
    </div>
  );
}

export default Header;
