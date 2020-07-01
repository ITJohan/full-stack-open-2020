import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blogs title',
      author: 'John Doe',
      user: {
        username: 'jdoe',
        name: 'Jane Doe',
      },
      url: 'http://www.jd.com',
      likes: 100
    }

    const addLikeMock = jest.fn()
    const removeHandlerMock = jest.fn()

    component = render(
      <Blog blog={blog} addLike={addLikeMock} removeHandler={removeHandlerMock} />
    )
  })

  test('renders blogs title and author but not url or number by default', () => {
    expect(component.container).toHaveTextContent('Blogs title John Doe')
    expect(component.container).not.toHaveTextContent('URL: http://www.jd.com')
    expect(component.container).not.toHaveTextContent('Likes: 100')
  })

  test('renders blogs url and likes when show button is clicked', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent('URL: http://www.jd.com')
    expect(component.container).toHaveTextContent('Likes: 100')
  })
})