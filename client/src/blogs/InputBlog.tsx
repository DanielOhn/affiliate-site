import { useState, SyntheticEvent } from 'react'

const InputBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const body = { title, content }

            const addBlog = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            console.log(addBlog)

            window.location.assign('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h4 className="page-name">Input Blog</h4>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    value={content}
                    placeholder="content"
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <button>Add</button>
            </form>
        </>
    )
}

export default InputBlog
