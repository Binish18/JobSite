import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Job = ({job}) => {
  return (
    <Card className ='my-3 p-3 rounded' >
     <Link to={`/job/${job._id}`}>
        <Card.Img src={job.image} variant='top'></Card.Img>
     </Link>
     <Card.Body>
     <a href={`/job/${job._id}`}   style={{ color: "black" }}>
        <Card.Title as='h4'> <strong>{job.name}</strong></Card.Title>
    </a>
   <Card.Title as='h6'>{job.location}</Card.Title>
    
     <Card.Text as='div'>
        <Rating value={job.rating} text={`${job.numReviews} reviews`}/>
     </Card.Text>
     <Card.Text as ='h6'>
      <b> Salary:</b> Rs{job.Pay}
     </Card.Text>
     </Card.Body>

    </Card>

  )
}

export default Job