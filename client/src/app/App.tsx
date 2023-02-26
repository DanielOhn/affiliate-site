import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

import InputBlog from '../blogs/InputBlog'
import ListBlog from '../blogs/ListBlog'
import InputUser from './users/InputUsers'
import Login from './users/Login'
import Logout from './users/Logout'

function App() {
    const [user, setUser] = useState('')

    const Session = async () => {
        const sess = await fetch('/api/profile')
        const data = await sess.json()

        setUser(data.username)
    }

    useEffect(() => {
        Session()
    }, [user])

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
                                <Link to="/logout">Logout</Link>
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
                    </ul>
                </nav>

                <Outlet />
            </div>
        )
    }

    return (
        <div className="App">
            <h1>Posts</h1>
            {/* <InputBlog /> */}
            <hr />

            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ListBlog />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="register" element={<InputUser />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
