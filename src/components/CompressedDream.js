import React, { Component } from 'react'
import {Card, Container, Button, Modal, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class CompressedDream extends Component {

  render() {
    let date = moment(this.props.dream.date.toDate());

    return (
      <Container className="compressed-dream-container">
        <Card>
            <Card.Header>
              <Card.Title>
                {date.format("MMMM Do, YYYY")}
              </Card.Title>
            </Card.Header>
            <Table bordered striped hover variant="light" className="compressed-dream-table">
              <tbody>
                <tr>
                  <td>Description</td>
                  <td>{this.props.dream.description}</td>
                </tr>
                <tr>
                  <td>Notes</td>
                  <td>{this.props.dream.notes}</td>
                </tr>
                <tr>
                  <td>How did you feel before going to bed?</td>
                  <td>{this.props.dream.beforeBedMood}</td>
                </tr>
                <tr>
                  <td>What kind of dream was it?</td>
                  <td>{this.props.dream.kindOfDream}</td>
                </tr>
                <tr>
                  <td>How did you feel when you woke up?</td>
                  <td>{this.props.dream.wakeUpMood}</td>
                </tr>
                <tr>
                  <td>How rested did you feel when you woke up?</td>
                  <td>{this.props.dream.restedState}</td>
                </tr>
                <tr>
                  <td>This is the color you felt represented this dream:</td>
                  <td>
                  <div
                    style={{
                      backgroundColor:`${this.props.dream.dreamColor}`,
                      width:'30px',
                      height:'30px',
                      borderRadius: '50%',
                      padding: '0'}}></div>
                  </td>
                </tr>
              </tbody>
            </Table>
          <Card.Footer className="compressed-cart-buttons">
            <Button variant="primary">View Details</Button>
            <Button variant="warning" as={Link} to={`/dreams/${this.props.dream.id}`}>Edit Dream</Button>
            <Button variant="danger" onClick={this.props.toggleShowWarning}>Delete Dream</Button>  
          </Card.Footer>
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
