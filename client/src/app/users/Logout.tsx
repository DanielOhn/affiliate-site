import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    const Signout = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const logout = await fetch('/api/logout')

            navigate('/')
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={(e) => Signout(e)}>Logout</button>
        </div>
    )
}

export default Logout
