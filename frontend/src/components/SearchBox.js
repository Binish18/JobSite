import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
   const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
     navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Jobs...'
        className='cont'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='button'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox