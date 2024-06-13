// @ts-check
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSigninUserMutation } from '../app/apiSlice';

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signin, signinStatus] = useSigninUserMutation()

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

    if (signinStatus.isSuccess) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-32">
            {signinStatus.error && <div className="text-red-500 mb-4">{signinStatus.error.message}</div>}

            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
            >
                Sign In
            </button>
        </form>
    )
}
