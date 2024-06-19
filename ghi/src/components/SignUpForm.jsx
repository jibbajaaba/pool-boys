// @ts-check
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../app/apiSlice';

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [signup, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    
    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            await signup({
                username,
                password,
                first_name,
                last_name,
                email,
                phone_number,
                age,
            }).unwrap();
            navigate('/pools/create');
        } catch (error) {
            console.error('Failed to signup:', error);
        }
    }

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-6"
            style={{
                backgroundImage: "url('https://img.freepik.com/premium-photo/surface-green-swimming-pool-texture-background_55716-2249.jpg?w=1380')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}
        >
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
                {error && <div className="text-red-500 mb-4">{error.message}</div>}

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

                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phone_number"
                        id="phone_number"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter Phone Number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter Age"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
