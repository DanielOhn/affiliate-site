import './App.css'

import InputBlog from '../blogs/InputBlog'
import ListBlog from '../blogs/ListBlog'
import InputUser from './users/InputUsers'
import Login from './users/Login'

function App() {
    const Session = async () => {
        const sess = await fetch('/')
    }

    Session()

    return (
        <div className="App">
            <h1>Posts</h1>
            <p>Creating posts</p>

            <InputBlog />
            <ListBlog />
            <hr />

            <InputUser />
            <Login />

            <footer>
                <div>Footer Goes Here</div>
            </footer>
        </div>
    )
}

export default App
