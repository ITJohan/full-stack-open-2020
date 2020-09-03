import React, {useState, useEffect} from 'react'
import {useQuery, useLazyQuery} from '@apollo/client'
import {GET_USER, GET_BOOKS_BY_GENRE} from '../queries'

const Recommended = ({show}) => {
  const userResult = useQuery(GET_USER)
  const [getBooks, booksResult] = useLazyQuery(GET_BOOKS_BY_GENRE)

  useEffect(() => {
    if (userResult.loading) {
      return
    }

    getBooks({variables: {genre: userResult.data.me.favoriteGenre}})
  }, [userResult])

  if (!show) {
    return null
  } 

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const user = userResult.data.me
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended