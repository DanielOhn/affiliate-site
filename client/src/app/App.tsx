import './App.css'
import { useEffect, useState, SyntheticEvent } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import InputBlog from '../blogs/InputBlog'
import ListBlog from '../blogs/ListBlog'
import InputUser from './users/InputUsers'
import Login from './users/Login'
import Logout from './users/Logout'

function App() {
    const [user, setUser] = useState('')
    const [admin, setAdmin] = useState(false)

    const navigate = useNavigate()

    const Session = async () => {
        const sess = await fetch('/api/profile')
        const data = await sess.json()

        setUser(data.username)
        setAdmin(data.admin)
    }

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

    useEffect(() => {
        Session()
    }, [])

    const Layout = () => {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {user ? (
                            <li>
                                <a
                                    href=""
                                    onClick={(e: SyntheticEvent) => Signout(e)}>
                                    Logout
                                </a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {admin && user ? (
                            <li>
                                <Link to="/create-blog">Create Blog</Link>
                            </li>
                        ) : (
                            <br />
                        )}
                    </ul>
                </nav>

                <Outlet context={{ username: user, admin: admin }} />
            </div>
        )
    }

    return (
        <div className="App">
            <h1>Affiliate Site</h1>
            <hr />

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<ListBlog />} />
                    {/* <Route path="logout" element={<Logout />} /> */}
                    <Route path="register" element={<InputUser />} />
                    <Route path="login" element={<Login />} />
                    <Route path="create-blog" element={<InputBlog />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
