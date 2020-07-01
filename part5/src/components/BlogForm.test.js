import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('if the form calls the event handler it receives as props with the right details', () => {
  const createBlogMock = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlogMock} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Blog title' }
  })

  fireEvent.change(author, {
    target: { value: 'John Doe' }
  })

  fireEvent.change(url, {
    target: { value: 'http://www.jd.com' }
  })

  fireEvent.submit(form)

  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0].title).toBe('Blog title')
  expect(createBlogMock.mock.calls[0][0].author).toBe('John Doe')
  expect(createBlogMock.mock.calls[0][0].url).toBe('http://www.jd.com')
})