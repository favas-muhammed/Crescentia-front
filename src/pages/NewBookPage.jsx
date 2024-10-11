import { useContext, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const NewBookPage = () => {
  const { fetchWithToken } = useContext(SessionContext)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(0)

  const handleSubmit = async event => {
    event.preventDefault()
    const newBook = {
      title,
      author,
      pages,
    }
    console.log(newBook)
    try {
      await fetchWithToken('/api/books', 'POST', newBook)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>New book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input required value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Author:
          <input required value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
        <label>
          Pages:
          <input
            type='number'
            required
            value={pages}
            onChange={event => setPages(event.target.value)}
          />
        </label>
        <button type='submit'>Create book</button>
      </form>
    </>
  )
}

export default NewBookPage
