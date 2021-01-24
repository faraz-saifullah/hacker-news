import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';

export default function Navbar() {
  const { user, setUser } = useContext(Context);

  const logout = React.useCallback(() => {
    setUser(null);
    window.localStorage.setItem('user', null);
  }, [setUser]);

  return (
    <nav className="hn-navbar container">
      <Link to="/" className="navbar-item">
        <b className="navbar-item">Hacker News</b>
      </Link>
      <div className={'navbar-menu'}>
        <Link to="/login" className="navbar-item">
          welcome
        </Link>
        <Link to="/create-classroom" className="navbar-item">
          new
        </Link>
        <Link to="/" className="navbar-item">
          threads
        </Link>
        <Link to="/profile" className="navbar-item">
          past
        </Link>
        <Link to="/profile" className="navbar-item">
          comments
        </Link>
        <Link to="/profile" className="navbar-item">
          ask
        </Link>
        <Link to="/profile" className="navbar-item">
          show
        </Link>
        <Link to="/profile" className="navbar-item">
          jobs
        </Link>
        <Link to="/submit" className="navbar-item">
          submit
        </Link>
        {user && (
          <>
            <a href="/login" className="navbar-item">
              {user?.username} ({2})
            </a>
            <button className="navbar-item" onClick={logout}>
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
