import React, { Component } from 'react'
import {Card, Container, Button, Col, Modal} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class CompressedDream extends Component {

  render() {
    let date = moment(this.props.dream.date.toDate());

    return (
      <Container className="compressed-dream-container">
        <Card>
            <Container className="compressed-dream-header">
              <div
                style={{
                  backgroundColor:`${this.props.dream.dreamColor}`,
                  width:'30px',
                  height:'30px',
                  margin:'0 auto',
                  padding: '0'}}></div>
              <h5>{date.format("MMMM Do, YYYY")}</h5>
            </Container>
          <Card.Body>

              <Col>

              </Col>
              
          </Card.Body>
          <Accordion defaultActiveKey="0">          
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Description
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{this.props.dream.description}</Card.Body>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Additional Notes
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>{this.props.dream.notes}</Card.Body>
            </Accordion.Collapse>
          </Accordion>
          <Card.Body className="compressed-cart-buttons">
            <Button variant="outline-primary">View Details</Button>
            <Button variant="outline-warning" as={Link} to={`/dreams/${this.props.dream.id}`}>Edit Dream</Button>
            <Button variant="outline-danger" onClick={this.props.toggleShowWarning}>Delete Dream</Button>  
          </Card.Body>
        </Card>
        <Modal show={this.props.showWarning} onHide={this.props.toggleShowWarning} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this dream?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This action cannot be undone.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleShowWarning}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.props.handleDelete(this.props.dream.id)}>
              Delete Dream
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}
