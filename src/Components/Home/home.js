import React, {useState, useEffect} from 'react'
import {
  Figure,
  Card, 
  Button, 
  Container, 
  Spinner, 
  Row, 
  Col, 
  Stack, 
  Placeholder, 
  Alert
} from 'react-bootstrap/'
import resumeFile from '../../resources/tech-resume-santiago.pdf'
import './home.css'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const URL = process.env.REACT_APP_AIRTABLE_URL
  const BASEID = process.env.REACT_APP_BASEID
  const TABLENAME = process.env.REACT_APP_TABLENAME
  const KEY = process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN

  const downloadResume = () => {
    const resumePath = resumeFile
    const link = document.createElement('a')
    link.href = resumePath
    link.download = 'tech-resume-santiago.pdf'
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
      (<Spinner className="main-load" animation="grow" variant="info" size="lg"/>) : 
      (<Stack>
        <Container fluid="md" /*className="bg-dark text-light p-3"*/>
          <Row className="custom-flex-row"> 
            <Col>
              <section className="main-text">
                <h1>{data.fields.content}</h1>
                <h2>{data.fields.skills}</h2>
                <p>{data.fields.about}</p>
                {/* <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="nicholas-santiago-28b405137" data-version="v1">
                  <a class="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/nicholas-santiago-28b405137?trk=profile-badge">Nicholas Santiago</a>
                </div> */}
                <Button onClick={downloadResume} className="col-md-4" variant="outline-info">Download Resume</Button>
              </section>
            </Col>
            <Col>
              <Figure className="custom-figure-self" width={100} height={100}>
                <Figure.Image style={{height: '500px'}} src={data.fields.media[7].thumbnails.large.url} alt="Nicholas Santiago" thumbnail/>
              </Figure>
            </Col>
          </Row>
        </Container>
        <Container fluid="md" /*className="project-container p-3"*/>
          <h1 className="project-header">Projects</h1>
          <Row className="custom-mobile">
            <Col>
              <Card bg="secondary" text="light" style={{height: '100%'}}>
                <Card.Img variant='top' src={data.fields.media[9].thumbnails.large.url} alt="Chepe Demo Landing Page"/>
                <Card.Body>
                  {!loading ? 
                  (<Placeholder as={Card.Title} bg="primary" animation="glow">
                    <Placeholder xs={6} /></Placeholder>) : 
                    (<Card.Title>Chepe Demo and Trash Haul</Card.Title>)}
                  <Card.Text>{data.fields.aboutChepe}</Card.Text>
                  <Button onClick={()=> handleClick('https://www.chepedemo.com')} variant="dark" className="col-md-5">Click to View</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className='custom-mobile-margin'>
              <Card bg="success" text="light" style={{height: '100%'}}>
              <Card.Img variant='top' src={data.fields.media[11].thumbnails.large.url} alt="Quote Dictionary Login" />
              <Card.Body>
                <Card.Title>Quote Proto(Client Management)</Card.Title>
                <Card.Text>{data.fields.aboutQuote}</Card.Text>
                <Button onClick={()=> handleClick('https://quote-proto-63aa678465cd.herokuapp.com/')}variant="primary" className="col-md-5">Click to View</Button>
              </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg='white' text='dark' style={{height: '100%'}}>
                <Card.Img variant="top" src={data.fields.media[10].thumbnails.large.url} alt="Eterna Primavera Login" />
                <Card.Body>
                  <Card.Title>Eterna Primavera Earnings/Expenses</Card.Title>
                  <Card.Text>{data.fields.aboutEterna}</Card.Text>
                  <Button onClick={()=> handleClick('https://eterna-primavera-512c65c679c2.herokuapp.com/')} variant="primary" className="col-mmd-5">Click to View</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
          <Alert variant="warning" className="text-center">Click on the name to be redirected to my Linked In... {" "}
            <Alert.Link href="https://www.linkedin.com/in/nicholas-santiago-28b405137/">
              <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="nicholas-santiago-28b405137" data-version="v1">
                <a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/nicholas-santiago-28b405137?trk=profile-badge">Nicholas Santiago</a>
              </div>
            </Alert.Link>
          </Alert>    
        {/* </Container> */}
      </Stack>
      )}
    </>
  )
}
export default Home
      