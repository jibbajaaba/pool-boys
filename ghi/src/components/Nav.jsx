import { NavLink } from "react-router-dom"
import { useGetUserQuery, useSignoutUserMutation } from "../app/apiSlice"
import { useEffect } from "react"

const Nav = () => {
  const { data: user, isLoading } = useGetUserQuery()
  const [signOut, signOutStatus] = useSignoutUserMutation()

  useEffect(() => {
    if (signOutStatus.isSuccess) {
      window.location.reload()
    }
  }, [signOutStatus.isSuccess])

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="fixed top-0 left-0 h-screen w-19 m-0 flex flex-col bg-primary text-copper ">
      <nav className="nav">
        <div className="logo">
          <img
            src="/PoolBoys_Logo.png"
            alt="PoolBoys Logo"
            className="w-24"
          />
        </div>
        <div className="nav-links">
          <NavLink to="/">PoolBoys</NavLink>
          <ul>
            {!user && (
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to="/signin">Signin</NavLink>
              </li>
            )}
            {user && (
              <>
                <li>
                  <NavLink to="/">My Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/pools">Pools</NavLink>
                </li>
                <li>
                  <NavLink to="/pools/create">Create Pool</NavLink>
                </li>
                <li>
                  <button onClick={signOut}>Logout</button>
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
