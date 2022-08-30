import React,{useEffect, useState} from 'react'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux'
import {listJobDetails,createJobReview} from '../actions/jobActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { JOB_CREATE_REVIEW_RESET } from '../constants/jobConstants'


//import jobs from '../jobs'
//import axios from 'axios'
const JobScreen = () => {
   const dispatch =useDispatch()
   const params = useParams() // import useParams from react-router
   const [rating,setRating] = useState(0)
   const [comment,setComment] =useState('')
 // const job= jobs.find(j => j._id === params.id)
 //const [job,setJob]=useState([])
 const jobDetails = useSelector((state) => state.jobDetails)
 const {loading,error,job} = jobDetails

 const jobReviewCreate = useSelector((state) => state.jobReviewCreate)
 const { success:successJobReview,loading: loadingJobReview, error:errorJobReview } = jobReviewCreate

 const userLogin = useSelector((state) => state.userLogin)
   const {userInfo} = userLogin
 useEffect(()=>{
  if(successJobReview){
    alert('review submitted')
    setRating(0)
    setComment('')
    dispatch({ type:JOB_CREATE_REVIEW_RESET})
  }
  dispatch(listJobDetails(params.id))
},[dispatch,successJobReview])

//useEffect(()=>{
 // const fetchjob= async()=>{
 //const {data} = await axios.get(`/api/jobs/${params.id}`)
 //setJob(data)
  //}
  // call it 
 // fetchjob()
//},[])
let navigate = useNavigate();
   
const ApplyNowHandler = () =>{
navigate('/login?redirect=apply')
}
const submitHandler=(e)=>{
  e.preventDefault()
  dispatch(createJobReview(params.id,{
    rating,comment
  }))
}

  return (
    <>
     <a className='btn btn-info my-3 ' href="/">
        Go Back
      </a>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
        <>
          <Row>
          <Col md={5}>
            <Image src={job.image} alt={job.name}  fluid/>
          </Col>
          <Col md={6} >
            <ListGroup>
              <ListGroup.Item>
                <h3>{job.name}</h3>
                <h5>{job.location}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={job.rating}
                  text={`${job.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item><b> Salary:</b> Rs{job.Pay}</ListGroup.Item>
              <ListGroup.Item>
                Description: {job.description}
              </ListGroup.Item>
              <ListGroupItem>
              <a 
              onClick={ApplyNowHandler}
              className='btn btn-info my-3 '
             >
      Apply Now 
    </a>
              </ListGroupItem>
            </ListGroup>
          </Col>
           </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {job.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {job.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successJobReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingJobReview && <Loader />}
                  {errorJobReview && (
                    <Message variant='danger'>{errorJobReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingJobReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <a href='/login'>sign in</a> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          </>
      )}
     
    </>
  )
}

export default JobScreen