// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSigninUserMutation } from '../app/apiSlice';


export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signin, signinStatus] = useSigninUserMutation()

    console.log(signinStatus)

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        signin({
            username: username,
            password: password
        })
    }



    return (
        <form onSubmit={handleFormSubmit}>
            {/* {error && <div className="error">{error.message}</div>} */}

            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="submit">Sign In</button>
        </form>
    )
}
