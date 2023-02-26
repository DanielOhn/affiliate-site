import { useState, SyntheticEvent } from 'react'

const InputUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (password2 === password) {
            try {
                const body = { username, email, password }

                const addUser = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })

                window.location.assign('/')
            } catch (err) {
                console.log(err)
            }
        } else {
            alert('Passwords do not match.')
        }
    }

    return (
        <>
            <h4>Input User</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={username}
                    placeholder="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    value={password2}
                    placeholder="confirm password"
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <br />
                <button>Create Account</button>
            </form>
        </>
    )
}

export default InputUser
