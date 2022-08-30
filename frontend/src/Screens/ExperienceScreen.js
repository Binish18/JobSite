import { Link,useNavigate} from 'react-router-dom'
import { Form,Col,Row,Button } from 'react-bootstrap'

import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'

function ExperienceScreen(){
   const[jobTitle,setJobTitle]=useState('')
   const[companyName,setCompanyName]=useState('')
    let navigate=useNavigate()
  const submitHandler = (e) => {
     navigate('/submit')
  } 
    return (
    <FormContainer>
   <h3>Enter a past job that shows relevant experience</h3>
     <Form onSubmit={submitHandler}>
        <Form.Group controlId='jobTitle'>
          <Form.Label>Job Title(optional)</Form.Label>
          <Form.Control
            type='text'
            
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='companyName'>
          <Form.Label>Company Name(optional)</Form.Label>
          <Form.Control
            type='text'
           
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
         Continue
        </Button>
        </Form>
   
    </FormContainer>
  )
}

export default ExperienceScreen