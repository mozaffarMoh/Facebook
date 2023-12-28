import "./Header.scss";
import HeaderNavigations from "./header-navigations/HeaderNavigations";
import HeaderProfile from "./header-profile/HeaderProfile";
import HeaderSearch from "./header-search/HeaderSearch";

const Header = () => {
  return (
    <nav className="navbar p-2 position-relative z-50">
      {/* Search Section */}
      <HeaderSearch />
      {/* Navigate Section */}
      <HeaderNavigations />
      {/* Profile Section */}
      <HeaderProfile />
    </nav>
  );
};

export default Header;
