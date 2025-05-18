import './Header.css'; // Import the CSS file to style the component.
import { Link } from 'react-router-dom'; // Import the link from the DOM.

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">TheEnd.page</h1>
      <Link to="/login" className="header-button">Create Goodbye</Link>
    </header>
  );
}

export default Header;
