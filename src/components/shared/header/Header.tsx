import { Link, NavLink } from 'react-router';
import logo from '/assets/favicon-32x32.png';
import { navbarLinks } from './navbarLinks';

export const Header = () => {
  return (
    <header className="ms-container flex justify-between items-center border-b border-slate-400 py-3">
      <div className="text-lg font-semibold min-w-fit">
        <Link className="flex items-end" to={'/'}>
          <img src={logo} alt="logo" />
          arijus Techin
        </Link>
      </div>
      <div className="w-full">
        <div className="flex gap-2 justify-center">
          {navbarLinks.map((link) => (
            <div key={link.title}>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-slate-400' : ''
                  } rounded-lg py-1 px-2 border`
                }
                to={link.href}
              >
                {link.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
