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
  })

  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <nav>
        <div>
        <img
          src="/PoolBoys_Logo.png"
          alt="PoolBoys Logo"
        />
          <div>
            <NavLink to="/">
              PoolBoys
            </NavLink>
            <div>
              <ul>
                {!user && <li>
                  <NavLink to={'/signup'}>
                    Sign Up
                  </NavLink>
                </li>}
                {!user && <li>
                  <NavLink to={'/signin'}>
                    Signin
                  </NavLink>
                </li>}
                {user && <li>
                  <NavLink to={'/'}>
                    My Profile
                  </NavLink>
                </li>}
                {user && <li>
                  <NavLink to={'/pools'}>
                    Pools
                  </NavLink>
                </li>}
                {user && <button
                onClick={() => {
                  signOut()
                }}
                >
                  Logout
                </button>}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
