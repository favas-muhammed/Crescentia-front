import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const AllBooksPage = () => {
  const { fetchWithToken, isAuthenticated } = useContext(SessionContext)

  const [books, setBooks] = useState([])

  const getAllBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      if (response.status === 200) {
        const booksData = await response.json()
        setBooks(booksData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBooks()
  }, [])

  const handleDelete = async bookId => {
    try {
      await fetchWithToken(`/api/books/${bookId}`, 'DELETE')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>All Books</h1>
      <ul>
        {books.map(currentBook => (
          <li key={currentBook._id}>
            <p>{currentBook.title}</p>
            {isAuthenticated && (
              <button type='button' onClick={() => handleDelete(currentBook._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllBooksPage
