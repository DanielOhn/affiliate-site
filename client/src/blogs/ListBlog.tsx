import { useState, useEffect, SyntheticEvent } from 'react'
import { useOutletContext } from 'react-router-dom'

// Interface is only for Object/Classes

interface Blog {
    blog_id: number
    text: string
}

type BlogData = Array<string>

const ListBlog = () => {
    let [blogsData, setBlogsData] = useState<BlogData | []>([])

    let [title, setTitle] = useState('')
    let [content, setContent] = useState('')
    let [edit, setEdit] = useState(0)

    const getBlogs = async () => {
        try {
            const res = await fetch('/api/blogs')
            const data = await res.json()

            setBlogsData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const editBlog = (id: number, _title: string, _content: string) => {
        setContent(_content)
        setTitle(_title)
        setEdit(id)
    }

    const updateBlog = async (e: SyntheticEvent, id: number) => {
        e.preventDefault()

        try {
            const body = { title, content }

            const res = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            window.location.assign('/')
        } catch (err) {
            console.error(err)
        }
    }

    const deleteBlog = async (id: number) => {
        try {
            const deleteBlog = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
            })
            console.log(deleteBlog)
            setBlogsData(blogsData.filter((blog: any) => blog.blog_id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const Content = (data: any) => {
        const { blog } = data
        let context: { user: string; admin: boolean } = useOutletContext()

        if (context.admin) {
            return (
                <>
                    <h4>{blog.title}</h4>
                    <p>{blog.content}</p>
                    <button
                        onClick={(e: SyntheticEvent) =>
                            deleteBlog(blog.blog_id)
                        }>
                        Delete
                    </button>
                    <button
                        onClick={() =>
                            editBlog(blog.blog_id, blog.title, blog.content)
                        }>
                        Edit
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <h4>{blog.title}</h4>
                    <p>{blog.content}</p>
                </>
            )
        }
    }

    useEffect(() => {
        getBlogs()
    }, [blogsData])

    return (
        <>
            <h4>List Blogs</h4>
            {blogsData ? (
                blogsData.map((blog: any) => {
                    return edit === blog.blog_id ? (
                        <div key={blog.blog_id}>
                            <input
                                type="text"
                                value={title}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(e.target.value)}></input>
                            <input
                                type="text"
                                value={content}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setContent(e.target.value)}></input>
                            <button
                                onClick={(e: SyntheticEvent) =>
                                    deleteBlog(blog.blog_id)
                                }>
                                Delete
                            </button>
                            <button
                                onClick={(e: SyntheticEvent) =>
                                    updateBlog(e, blog.blog_id)
                                }>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div key={blog.blog_id}>
                            <Content blog={blog} />
                        </div>
                    )
                })
            ) : (
                <p>No blogs</p>
            )}
        </>
    )
}

export default ListBlog
