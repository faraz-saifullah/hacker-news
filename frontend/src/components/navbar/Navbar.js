import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';

export default function Navbar() {
  const { user, setUser } = useContext(Context);

  const logout = React.useCallback(() => {
    setUser({
      isDummyUser: true,
    });
    window.localStorage.setItem('user', null);
  }, [setUser]);

  return (
    <nav className="hn-navbar container">
      <Link to="/" className="navbar-item">
        <b>Hacker News</b>
      </Link>
      <div className={'navbar-menu'}>
        <Link to="/newest" className="navbar-item">
          new
        </Link>
        {!user.isDummyUser && (
          <Link to="/threads" className="navbar-item">
            threads
          </Link>
        )}
        <Link to="/comments" className="navbar-item">
          comments
        </Link>
        <Link to="/submit" className="navbar-item">
          submit
        </Link>
        {!user.isDummyUser ? (
          <>
            <a href={`/users/${user.username}`} className="navbar-item">
              {user?.username} ({2})
            </a>
            <button className="navbar-item" onClick={logout}>
              logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-item">
            login
          </Link>
        )}
      </div>
    </nav>
  );
}
