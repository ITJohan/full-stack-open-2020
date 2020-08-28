import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'
import BookFilter from './BookFilter'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (result.loading) {
      return
    }

    if (filter === '') {
      setFilteredBooks(result.data.allBooks)
    } else {
      const tempBooks = []

      result.data.allBooks.forEach(book => {
        if (book.genres.includes(filter)) {
          tempBooks.push(book)
        }
      })

      setFilteredBooks(tempBooks)
    }
  }, [result, filter])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
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
      <BookFilter books={result.data.allBooks} setFilter={setFilter} />
</div>
  )
}

export default Books