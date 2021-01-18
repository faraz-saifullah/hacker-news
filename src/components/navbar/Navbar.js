import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';

export default function Navbar() {
  const { user, logout } = useContext(Context);
  return (
    <nav className="navbar container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <b className="navbar-item is-size-6 ">Hacker News</b>
        </Link>
      </div>
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
        <Link to="/profile" className="navbar-item">
          submit
        </Link>
        {user &&
        <>
          <a href="/login" className="navbar-item">
            {user?.username}
          </a>
          <button className="navbar-item" onClick={logout}>
            logout
          </button>
        </>
        }
      </div>
    </nav>
  );
}
