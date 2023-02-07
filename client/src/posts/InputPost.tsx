import { useState, SyntheticEvent } from 'react'

const InputPost = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const body = { title, text }

            const addPost = await fetch('/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            console.log(addPost)

            window.location.assign('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h4>Input Post</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <br />
                <button>Add</button>
            </form>
        </>
    )
}

export default InputPost
