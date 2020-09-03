import React, { useState, useEffect } from 'react'
import {useApolloClient, useQuery} from '@apollo/client'
import {ALL_BOOKS} from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    const cachedToken = localStorage.getItem('library-user-token')
    if (cachedToken) {
      setToken(cachedToken)
    }
  }, [token])
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore() 
    setPage('authors')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page ==='recommended'}
        books={books}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App