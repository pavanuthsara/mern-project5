import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="bg-green-500 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-white text-xl font-bold">Freshly.lk</p>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1 transition duration-300"
                    : "text-gray-300 hover:text-white transition duration-300"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1 transition duration-300"
                    : "text-gray-300 hover:text-white transition duration-300"
                }
              >
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1 transition duration-300"
                    : "text-gray-300 hover:text-white transition duration-300"
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1 transition duration-300"
                    : "text-gray-300 hover:text-white transition duration-300"
                }
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
