import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listJobDetails, updateJob } from '../actions/jobActions'
import { JOB_UPDATE_RESET } from '../constants/jobConstants'

const JobEditScreen = () => {
  const params = useParams()
  const jobId = params.id

  const [name, setName] = useState('')
  const [Pay, setPay] = useState(0)
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')

  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)



  const dispatch = useDispatch()

  const jobDetails = useSelector((state) => state.jobDetails)
  const { loading, error, job } = jobDetails

  const jobUpdate = useSelector((state) => state.jobUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = jobUpdate
 const navigate = useNavigate() 
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: JOB_UPDATE_RESET })
     
      navigate('/admin/joblist') 
      }else {
      if (!job.name || (job._id) !== (jobId)) {
        dispatch(listJobDetails(jobId))
      } else {
        setName(job.name)
        setPay(job.Pay)
        setImage(job.image)
        setLocation(job.location)
       setDescription(job.description)
      }
    }
  }, [dispatch, jobId, job, successUpdate])

  

  const submitHandler = (job) => {
   // e.preventDefault()
    dispatch(
      updateJob({
        _id: jobId,
        name,
        Pay,
        image,
        location,
        description,
    
      })
    )
  }

  return (
    <>
      <a href='/admin/joblist' className='btn btn-light my-3'>
        Go Back
      </a>
      <FormContainer>
        <h1>Edit Job</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Pay'>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Salary'
                value={Pay}
                onChange={(e) => setPay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
             
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

             <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default JobEditScreen