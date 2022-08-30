import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'

import { useNavigate, useParams } from 'react-router-dom'
import { createJob, deleteJob, listJobs } from '../actions/jobActions'
import { JOB_CREATE_RESET } from '../constants/jobConstants'

const JobListScreen = () => {
 // const params = useParams()
 // const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const jobList = useSelector((state) => state.jobList)
  const { loading, error, jobs } = jobList

  const jobDelete = useSelector((state) => state.jobDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = jobDelete

  const jobCreate = useSelector((state) => state.jobCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    job: createdJob,
  } = jobCreate 

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: JOB_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/job/${createdJob._id}/edit`)
    } else {
      dispatch(listJobs())
    }
  }, [
    dispatch,
    
    userInfo,
    successDelete,
    successCreate,
    createdJob,
    
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteJob(id))
    }
  }

  const createJobHandler = () => {
    dispatch(createJob())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Jobs</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createJobHandler}>
            <i className='fas fa-plus'></i> Create Job
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PAY</th>
               <th>LOCATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job._id}</td>
                  <td>{job.name}</td>
                  <td>Rs{job.Pay}</td>
                <td>{job.location}</td>
                  <td>
                    <a href={`/admin/job/${job._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </a>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(job._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
        </>
      )}
    </>
  )
}

export default JobListScreen