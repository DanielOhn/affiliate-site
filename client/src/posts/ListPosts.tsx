import { useState, useEffect, SyntheticEvent } from 'react'
// Interface is only for Object/Classes

interface Post {
    post_id: number
    text: string
}

type PostData = Array<string>

const ListPosts = () => {
    let [postsData, setPostsData] = useState<PostData | []>([])

    let [updateText, setUpdateText] = useState('')
    let [edit, setEdit] = useState(0)

    const getPosts = async () => {
        try {
            const res = await fetch('/posts')
            const data = await res.json()

            setPostsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const editPost = (id: number, text: string) => {
        setUpdateText(text)
        setEdit(id)
    }

    const updatePost = async (e: SyntheticEvent, id: number) => {
        e.preventDefault()

        try {
            const body = { updateText }

            const res = await fetch(`/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            window.location.assign('/')
        } catch (err) {
            console.error(err)
        }
    }

    const deletePost = async (id: number) => {
        try {
            const deletePost = await fetch(`/posts/${id}`, {
                method: 'DELETE',
            })
            console.log(deletePost)
            setPostsData(postsData.filter((post: any) => post.post_id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <h4>List Posts</h4>
            {postsData ? (
                postsData.map((post: any) => {
                    return edit === post.post_id ? (
                        <div key={post.post_id}>
                            <input
                                type="text"
                                value={updateText}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setUpdateText(e.target.value)}></input>
                            <button
                                onClick={(e: SyntheticEvent) =>
                                    deletePost(post.post_id)
                                }>
                                D
                            </button>
                            <button
                                onClick={(e: SyntheticEvent) =>
                                    updatePost(e, post.post_id)
                                }>
                                S
                            </button>
                        </div>
                    ) : (
                        <div key={post.post_id}>
                            <p>{post.text}</p>
                            <button
                                onClick={(e: SyntheticEvent) =>
                                    deletePost(post.post_id)
                                }>
                                D
                            </button>
                            <button
                                onClick={() =>
                                    editPost(post.post_id, post.text)
                                }>
                                E
                            </button>
                        </div>
                    )
                })
            ) : (
                <p>No posts</p>
            )}
        </>
    )
}

export default ListPosts
