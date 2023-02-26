import { SyntheticEvent } from 'react'

const Logout = () => {
    const onClick = async (e: SyntheticEvent) => {
        e.preventDefault()

        const logout = await fetch('/api/logout')

        window.location.assign('/')
    }

    return (
        <>
            <button onClick={(e) => onClick(e)}>Logout</button>
        </>
    )
}

export default Logout
