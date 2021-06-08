import React, { Component } from 'react'
//import db from '../firebase/db';
import {Form, Button, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import firebase from 'firebase';
const db = firebase.firestore();
firebase.firestore.setLogLevel("debug");

export default class AddDream extends Component {
  state = {
      description: '',
      kindOfDream: 'Good',
      beforeBedMood: 'Great',
      wakeUpMood: 'Happy',
      restedState: 'Very rested',
      dreamColor: '#A0DAF3',
      date: null,
      notes: ''
  }

  handleChange = (event) => {
    let value = event.target.value;

    if (event.target.id === "date") {
      value = new Date(event.target.value);
    }
    this.setState({
      ...this.state,
      [event.target.id]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date(this.state.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    let timestamp = firebase.firestore.Timestamp.fromDate(date);
    db
    .collection("dreamEntries")
      .add({
        ...this.state,
        date: timestamp
      })
      .then((docRef) => {
        this.props.history.push('/dreams')
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  render() {
    return (
      <Container>
        <h1 className="header">Add a recent dream</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
            <Form.Group controlId="date">
                <Form.Label>Date of dream</Form.Label>
                <Form.Control type="date" name="date" placeholder="Date of dream" max={moment(Date.now()).format("yyyy-MM-DD")} onChange={this.handleChange} required/>
                <Form.Text muted>
                  Pick the date of the night you went to sleep.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="kindOfDream">
                <Form.Label>What kind of dream was it?</Form.Label>
                <Form.Control as="select" defaultValue={this.state.kindOfDream} onChange={this.handleChange}>
                  <option>Good</option>
                  <option>Neutral</option>
                  <option>Bad</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="description">
                <Form.Label>What was your dream about?</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows="3" 
                    placeholder="Enter description" 
                    onChange={this.handleChange} 
                    value={this.state.description}
                    required
                  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="beforeBedMood">
                <Form.Label>How did you feel before going to bed?</Form.Label>
                <Form.Control as="select" defaultValue={this.state.beforeBedMood} onChange={this.handleChange}>
                  <option>Great</option>
                  <option>Content</option>
                  <option>Upset</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="wakeUpMood">
                <Form.Label>How did you feel when you woke up?</Form.Label>
                <Form.Control as="select" defaultValue={this.state.wakeUpMood} onChange={this.handleChange}>
                  <option>Happy</option>
                  <option>Neutral</option>
                  <option>Upset</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="restedState">
                <Form.Label>How rested do you feel on waking?</Form.Label>
                <Form.Control as="select" defaultValue={this.state.restedState} onChange={this.handleChange}>
                  <option>Very rested</option>
                  <option>Mildly rested</option>
                  <option>Not rested</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="dreamColor">
                  <Form.Label>If you had to give your dream a color, what would it be?</Form.Label>
                  <Form.Control type="color" title="Choose a color" defaultValue={this.state.dreamColor} onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="notes">
                <Form.Label>Do you have any other notes you'd like to record for this dream?</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows="3" 
                  placeholder="Record any other thoughts here" 
                  onChange={this.handleChange} 
                  value={this.state.notes}
                />
              </Form.Group>
            </Form.Row>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
      </Container>
    )
  }
}
