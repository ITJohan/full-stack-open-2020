import React, {useState, useEffect} from 'react'

const BookFilter = ({books, setFilter}) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const currentGenres = ['']
    books.forEach(book => {
      book.genres.forEach(genre => {
        if (!currentGenres.includes(genre)) {
          currentGenres.push(genre)
        }
      })
    })
    setGenres(currentGenres)
  }, [books])

  return (
    <div>
      {genres.map(genre => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre === '' ? 'All genres' : genre}
        </button>
      ))}
    </div>
  )
}

export default BookFilter