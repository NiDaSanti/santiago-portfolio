import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap/'

const Nfl = ({nflStatement}) => {
  const [nflData, setNflData] = useState([])
  const [loading, setLoading] = useState(false)
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
    } catch(error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchAnUrl(`https://api.sportsdata.io/v3/nfl/scores/json/TeamsBasic?key=${NFLURL}`)
  }, [])
  return(
    <>
    {!loading ? ('Loading Data...') : (
      <>
        <h1>Hobbies.</h1>
        <p>{nflStatement}</p>
        <Row xs={2} md={4} lg={6}>
          {nflData.map(svg => (
            <Col key={svg.Key}>
              <Card border="dark" style={{background: '#' + svg.PrimaryColor}}>
                <Container fluid>
                  <Row className="p-2">
                    <Col>
                      <img src={svg.WikipediaLogoURL} alt={`${svg.City} ${svg.Name} Logo`} width="100" height="100" />
                    </Col>
                    <Col className="text-white">
                      <div><i>{svg.FullName}</i></div>
                      <div>{svg.Conference} {svg.Division}</div>
                      <div>{svg.HeadCoach}</div>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )}
    </>
  )
}

export default Nfl
