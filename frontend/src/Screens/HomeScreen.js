import React , {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
//import axios from 'axios'
//import jobs from '../jobs'
import Job from '../components/Job'
import {useDispatch,useSelector} from 'react-redux'
import {listJobs} from '../actions/jobActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
const HomeScreen = () => {
  const dispatch = useDispatch()
  //const [jobs,setJobs]=useState([])
  let params = useParams();
  const keyword = params.keyword
 const jobList = useSelector((state) => state.jobList)
  const { loading, error, jobs } = jobList
  useEffect(()=>{ 
    dispatch(listJobs(keyword))
    
    
   
  },[dispatch,keyword])
  
  //useEffect(()=>{
   // const fetchjobs = async()=>{
   //const {data} = await axios.get('/api/jobs')
  // setJobs(data)
   // }
    // call it 
   // fetchjobs()
 // },[])
  return (
    <>
    <h1>JOBS IN PAKISTAN</h1>
    {loading ? (<Loader/> ) : error ?( <Message variant='danger'>{error}</Message> ):
     <Row>
     {jobs.map((job) => (
       <Col  key={job._id} sm={12} md={16} lg={4} xl={3}>
         <Job job={job}/>
       </Col>
     ))}
     </Row>
    
    }
    
    </>
  )
}

export default HomeScreen