import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    const Logout = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const logout = await fetch('/api/logout')

            navigate(0)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button onClick={(e) => Logout(e)}>Logout</button>
        </>
    )
}

export default Logout
