import React, { Component } from 'react'
import {Spinner, Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DreamTable from './DreamTable';
import db from '../firebase/db';

export default class Home extends Component {
  state = {
    dreams: [],
    isLoading: true
  }

  componentDidMount(){
    this.unsubscribe = db
      .collection("dreamEntries")
      .orderBy('date', 'asc')
      .onSnapshot((data) => {
        const dreamEntries = data.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        })

        this.setState({
          dreams: dreamEntries,
          isLoading: false
        })        
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    let {isLoading} = this.state;
    return (
      <Container>
        <Row>
          <h1 className="header">Home</h1>
        </Row>
        <Row>          
          {!isLoading &&
            (
              <Col lg={10}>
                <h3>Recent Dreams</h3>
                <DreamTable dreams={this.state.dreams} />  
                <Button variant="outline-secondary" as={Link} to={"/dreams"}>All dreams</Button>
              </Col>  
            )
          }
          {isLoading &&
            (
              <Col lg={10}>
                <Spinner animation="border" role="loading"></Spinner>
              </Col>
            )
          }           
          <Col>
            <Button variant="outline-secondary"  as={Link} to={"/add-dream"}>Add a dream</Button>          
            <Button variant="outline-secondary"  as={Link} to={"/dreams"}>All dreams</Button>
          </Col>
        </Row>    
      </Container>
    )
  }
}