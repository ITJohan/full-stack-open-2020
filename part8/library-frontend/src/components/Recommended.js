import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {GET_USER} from '../queries'

const Recommended = ({show, books}) => {
  const result = useQuery(GET_USER)

  if (!show) {
    return null
  } 

  if (result.loading) {
    return <div>loading...</div>
  }

  const user = result.data.me

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
          {books.filter(book => book.genres.includes(user.favoriteGenre)).map(book =>
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