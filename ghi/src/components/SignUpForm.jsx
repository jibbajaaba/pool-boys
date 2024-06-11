// @ts-check
import { useState } from 'react'
import { useSignupUserMutation } from '../app/apiSlice'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [age, setAge] = useState('')
    const [signup, signupStatus] = useSignupUserMutation()

    console.log(signupStatus)

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    async function handleFormSubmit(e) {
        e.preventDefault()
        signup({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            age: age
        })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
            />
            <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />
            <input
                type="tel"
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
            />
            <input
                type="int"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter Age"
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}
