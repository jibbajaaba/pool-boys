import { NavLink, useNavigate } from "react-router-dom"
import { useGetUserQuery, useSignoutUserMutation } from "../app/apiSlice"
import { useEffect } from "react"

const Nav = () => {
  const { data: user, isLoading } = useGetUserQuery()
  const [signOut, signOutStatus] = useSignoutUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (signOutStatus.isSuccess) {
      navigate('/');
    }
  }, [signOutStatus.isSuccess, navigate]);

  if (isLoading) return <div>Loading...</div>

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="bg-primary text-copper fixed top-0 left-0 right-0 z-10">
      <nav className="flex items-center justify-between p-4">
        <div className="logo cursor-pointer" onClick={handleLogoClick}>
          <img
            src="/PoolBoys_Logo.png"
            alt="PoolBoys Logo"
            className="w-16 h-16"
          />
        </div>
        <div className="nav-links flex space-x-4">
          <NavLink to="/" className="text-melon hover:text-hippie">PoolBoys</NavLink>
          <ul className="flex space-x-4">
            {!user && (
              <>
                <li>
                  <NavLink to="/signup" className="bg-copper text-primary py-2 px-4 rounded shadow hover:bg-hippie hover:text-melon transition duration-300">
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signin" className="bg-copper text-primary py-2 px-4 rounded shadow hover:bg-hippie hover:text-melon transition duration-300">
                    Signin
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <NavLink to="/profile" className="bg-copper text-primary py-2 px-4 rounded shadow hover:bg-hippie hover:text-melon transition duration-300">
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/pools/create" className="bg-copper text-primary py-2 px-4 rounded shadow hover:bg-hippie hover:text-melon transition duration-300">
                    Create Pool
                  </NavLink>
                </li>
                <li>
                  <button onClick={signOut} className="bg-copper text-primary py-2 px-4 rounded shadow hover:bg-hippie hover:text-melon transition duration-300">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
