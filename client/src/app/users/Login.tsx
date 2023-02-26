import { useState, SyntheticEvent } from 'react'
import { Outlet } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const body = { username, password }

            const login = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            window.location.assign('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <h4>Login</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={username}
                    placeholder="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button>Login</button>
            </form>
        </>
    )
}

export default Login
