import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [loginFail, setLoginFail] = useState(false)

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const body = { username, password }

            const login = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            const data: boolean = await login.json()

            if (data) {
                navigate('/')
                navigate(0)
            } else {
                setLoginFail(true)
            }
        } catch (err: any) {
            console.log(err)
            setLoginFail(true)
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
                {loginFail ? (
                    <div className="failed">
                        * failed to login, please try again
                    </div>
                ) : (
                    <></>
                )}
                <button>Login</button>
            </form>
        </>
    )
}

export default Login
