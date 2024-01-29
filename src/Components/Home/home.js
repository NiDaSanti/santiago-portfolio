import React, {useState, useEffect} from 'react'
import {Badge, Placeholder} from 'react-bootstrap/'
import Figure from 'react-bootstrap/Figure'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import resumeFile from '../../resources/santiago-nicholas-technical.pdf'
import './home.css'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const URL = process.env.REACT_APP_AIRTABLE_URL
  const BASEID = process.env.REACT_APP_BASEID
  const TABLENAME = process.env.REACT_APP_TABLENAME
  const KEY = process.env.REACT_APP_APIKEY

  const downloadResume = () => {
    const resumePath = resumeFile
    const link = document.createElement('a')
    link.href = resumePath
    link.download = 'santiago-nicholas-technical.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClick = (link) => {
    window.location.href = link
  }

  const fetchData = async () => {
    try{
      const response = await fetch(`${URL}/${BASEID}/${TABLENAME}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${KEY}`
        }
      })
      if(!response.ok) {
        const errorMessage = `Failed to response this request - Status: ${response.status} Status Text ${response.statusText}`
        console.error(errorMessage)
        setError(errorMessage)
      }
      const responseData = await response.json()
      const recordsData = responseData.records
      setLoading(true)
      setData(recordsData[0])
    } catch(error) {
      console.error(error)
      setError(`An error has occured while fetching data: ${error}`)
    }
  }
  useEffect(() => {
    fetchData()
  },[])
  return(
    <>
      {!loading ? 
      (<Spinner animation="grow" variant="warning"/>) : 
      (<Stack>
        <Container fluid className="bg-dark text-light p-3">
          <Row className="custom-flex-row"> 
            <Col>
              <section className="main-text">
                <h1>{data.fields.content}</h1>
                <h2>{data.fields.skills}</h2>
                <p>{data.fields.about}</p>
                <Button onClick={downloadResume} className="col-md-4" variant="outline-info">Download Resume</Button>
              </section>
            </Col>
            <Col>
              <Figure className="custom-figure-self" width={100} height={100}>
                <Figure.Image src={data.fields.media[5].thumbnails.large.url} alt="Nicholas Santiago" thumbnail/>
              </Figure>
            </Col>
          </Row>
        </Container>
        <Container fluid className="project-container p-5">
          <Row>
            <h1 className="project-header">Projects</h1>
            <Col>
              <Card bg="secondary" text="light" style={{height: '100%'}}>
                <Card.Img variant='top' src={data.fields.media[9].thumbnails.full.url} alt="Chepe Demo Landing Page"/>
                <Card.Body>
                  {loading ? 
                  (<Placeholder as={Card.Title} bg="primary" animation="glow">
                    <Placeholder xs={6} /></Placeholder>) : 
                    (<Card.Title>Chepe Demo and Trash Haul</Card.Title>)}
                  <Card.Text>A web application for a local business in Los Angeles.</Card.Text>
                  <Button onClick={()=> handleClick('https://www.chepedemo.com')} variant="dark" className="col-md-5">Click to View</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="success" text="light" style={{height: '100%'}}>
              <Card.Img variant='top' src={data.fields.media[10].thumbnails.full.url} alt="Quote Dictionary Login" />
              <Card.Body>
                <Card.Title>Quote Proto(Client Management)</Card.Title>
                <Card.Text>This web application manages client info. Available only to administrators.</Card.Text>
                <Button onClick={()=> handleClick('https://quote-proto-63aa678465cd.herokuapp.com/')}variant="info" className="col-md-5">Click to View</Button>
              </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Stack>
      )}
    </>
  )
}
export default Home
      