import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blogs title',
      author: 'John Doe',
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
    component.debug()
    expect(component.container).toHaveTextContent('Blogs title John Doe')
    expect(component.container).not.toHaveTextContent('http://www.jd.com')
    expect(component.container).not.toHaveValue(100)
  })
})