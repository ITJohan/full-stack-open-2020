import React, {useState, useEffect} from 'react'
import BookFilter from './BookFilter'

const Books = ({show, books}) => {
  const [filter, setFilter] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)

  useEffect(() => {
    if (filter === '') {
      setFilteredBooks(books)
    } else {
      const tempBooks = []

      books.forEach(book => {
        if (book.genres.includes(filter)) {
          tempBooks.push(book)
        }
      })

      setFilteredBooks(tempBooks)
    }
  }, [filter, books])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BookFilter books={books} setFilter={setFilter} />
</div>
  )
}

export default Books