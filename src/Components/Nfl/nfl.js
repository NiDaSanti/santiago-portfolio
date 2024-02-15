import React, {useState, useEffect} from 'react'
import {
  Accordion, 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Alert,
  InputGroup,
  Form,
  ListGroup
} from 'react-bootstrap/'
import './nfl.css'

const Nfl = ({nflStatement}) => {
  const [nflData, setNflData] = useState([])
  const [teamData, setTeamData] = useState([])
  const [loading, setLoading] = useState(false)
  const [seasonYear, setSeasonYear] = useState('')
  const NFLURL = process.env.REACT_APP_SPORTSDATAIO_KEY

  const fetchAnUrl = async (urls) => {
    try{
      let data = []
      for(const url of urls) {
        const response = await fetch(url)
        const jsonData = await response.json()
        data.push(jsonData)
      }
      return data
    } catch(error) {
      console.error(`Failed to fetch data: ${error}`)
      setLoading(false)
    }
  }
  const handleInput = (e) => {
    const {value} = e.target
    setSeasonYear(value)
  }
  const handleSeasonSubmit = (e) => {
    const urls = [`https://api.sportsdata.io/v3/nfl/scores/json/Byes/${seasonYear}?key=${NFLURL}`, `https://api.sportsdata.io/v3/nfl/scores/json/Teams/${seasonYear}?key=${NFLURL}`]
    e.preventDefault()
    fetchAnUrl(urls) 
      .then(data => {
        setLoading(true)
        setNflData(data[0])
        setTeamData(data[1])
      })
  }
  const disableButton = seasonYear === "" ? true : false

  return(
    <>
      <h1 className="text-center">Hobbies.</h1>
      <p>{nflStatement}</p>
      <Alert variant="danger"><i>In the input, you must enter the year and either "PRE, REG, POST". For example for 2023 Season you must enter 2023REG.</i></Alert>
      <Form onSubmit={handleSeasonSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a year to view bye weeks"
            aria-label="Enter a year to view bye weeks"
            onChange={handleInput}
            aria-describedby=''
          />
          <Button disabled={disableButton} variant="secondary" id="season-year" type="submit">Click</Button>
        </InputGroup>
      </Form>
      {!loading ? (
        <Alert variant="success">To view what's available, please follow the instructions in red.</Alert>
      ) : (
      <>
        <Alert variant="info"><strong>This work in progress...</strong></Alert>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="bg-info"><strong>NFL Teams</strong></Accordion.Header>
            <Accordion.Body className="bg-dark">
              <Row xs={1} md={3} lg={4}>
                {teamData.map((svg, index) => (
                  <Col key={index}>
                    <Card border="dark" style={{background: '#' + svg.PrimaryColor}}>
                      <Container fluid>
                        <Row className="custom-mobile p-2">
                          <Col>
                            <img className="text-center" src={svg.WikipediaLogoUrl} alt={`${svg.City} ${svg.Name} Logo`} width="100" height="100" />
                            {/* <Card style={{background: '#ffffff'}}>
                              <img src={svg.WikipediaWordMarkURL} alt='logo' width="170" height="auto"/>
                            </Card> */}
                          </Col>
                          <Col className="text-white">
                            <Card.Title style={{color: `#${svg.SecondaryColor}`}}><i>{svg.FullName}</i></Card.Title>
                            <div>{svg.Conference} {svg.Division}</div>
                            <div>{svg.HeadCoach}</div>
                            {/* <Button onClick={() => handleTeamStatsAndInfoClick(svg.Key)} style={{background: `#${svg.SecondaryColor}`, color: `#${svg.PrimaryColor}`}}>{!loading ? 'Loading...' : 'TeamInfo'}</Button> */}
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><strong>NFL bye weeks by season.</strong></Accordion.Header>
            <Accordion.Body>
              <Container fluid>
                <Row>
                  {nflData.map((team, index) => (
                    <Card key={index} style={{width: '18rem'}}>
                      <Col>
                        <Card.Body>
                          <Card.Title>{team.Team}</Card.Title>
                          <Card.Title>{team.Season}</Card.Title>
                          <Card.Title>{team.Week}</Card.Title>
                        </Card.Body>
                      </Col>
                      </Card>
                    ))}
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    )}
    </>
  )
}
export default Nfl



