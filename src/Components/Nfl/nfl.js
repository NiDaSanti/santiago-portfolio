import React, {useState, useEffect} from 'react'
import {Accordion, Container, Row, Col, Card, Button, Alert} from 'react-bootstrap/'
import './nfl.css'

const Nfl = ({nflStatement}) => {
  const [nflData, setNflData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')
  const NFLURL = process.env.REACT_APP_SPORTSDATAIO_KEY

  const fetchAnUrl = async (url) => {
    try{
      const response = await fetch(url, {
        method: 'GET'
      })
      if(!response.ok) {
        console.error(`Failed to response this request - Status: ${response.status} Status Text ${response.statusText}`)
      }
      const responseData = await response.json()
      setLoading(true)
      setNflData(responseData)
      return responseData
    } catch(error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleTeamStatsAndInfoClick = async (team) => {
    setSelectedTeam(team.Key)
    const seasonTeamStat = await fetchAnUrl(`https://api.sportsdata.io/v3/nfl/scores/json/Players/${selectedTeam}?key=${NFLURL}`)
 
  }
  useEffect(() => {
    const fetchTeamInfo = async () => {
      fetchAnUrl(`https://api.sportsdata.io/v3/nfl/scores/json/TeamsBasic?key=${NFLURL}`)
    }
    fetchTeamInfo()
  }, [])
  return(
    <>
    {!loading ? ('Loading Data...') : (
      <>
        <h1 className="text-center">Hobbies.</h1>
        <p>{nflStatement}</p>
        <Alert variant="info"><strong>This work in progress. The buttons are not functional yet. Coming soon.</strong></Alert>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="bg-info"><strong>NFL Teams</strong></Accordion.Header>
            <Accordion.Body className="bg-dark">
              <Row xs={1} md={3} lg={4}>
                {nflData.map((svg, index) => (
                  <Col key={index}>
                    <Card border="dark" style={{background: '#' + svg.PrimaryColor}}>
                      <Container fluid>
                        <Row className="custom-mobile p-2">
                          <Col>
                            <img className="text-center" src={svg.WikipediaLogoURL} alt={`${svg.City} ${svg.Name} Logo`} width="100" height="100" />
                            {/* <Card style={{background: '#ffffff'}}>
                              <img src={svg.WikipediaWordMarkURL} alt='logo' width="170" height="auto"/>
                            </Card> */}
                          </Col>
                          <Col className="text-white">
                            <Card.Title style={{color: `#${svg.SecondaryColor}`}}><i>{svg.FullName}</i></Card.Title>
                            <div>{svg.Conference} {svg.Division}</div>
                            <div>{svg.HeadCoach}</div>
                            <Button /*onClick={() => handleTeamStatsAndInfoClick(svg.Key)}*/ style={{background: `#${svg.SecondaryColor}`, color: `#${svg.PrimaryColor}`}}>{!loading ? 'Loading...' : 'TeamInfo'}</Button>
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
      </>
    )}
    </>
  )
}


export default Nfl


