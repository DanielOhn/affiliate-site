import './App.css'

import InputPost from "../posts/InputPost"
import ListPosts from "../posts/ListPosts"

function App() {
  return (
    <div className="App">
      <h1>Posts</h1>
      <p>Creating posts</p>

      <InputPost />
      <ListPosts />
    </div>
  )
}

export default App
