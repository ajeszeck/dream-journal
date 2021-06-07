import React, { Component } from 'react'
import db from '../firebase/db';
import {Form, Button, Col, Spinner} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import moment from 'moment';


export default class EditDream extends Component {
  state = {
      description: '',
      kindOfDream: 'Good',
      beforeBedMood: 'Great',
      wakeUpMood: 'Happy',
      restedState: 'Very rested',
      dreamColor: '#A0DAF3',
      date: null,
      notes: '',
      isLoading: true
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    db
      .collection("dreamEntries")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const {description, kindOfDream, beforeBedMood, wakeUpMood, restedState, dreamColor, date, notes } = doc.data();
          const formattedDate = moment(date.toDate()).format("YYYY-MM-DD");
          this.setState({
            description,
            kindOfDream,
            beforeBedMood,
            wakeUpMood,
            restedState,
            dreamColor,
            date: formattedDate,
            notes,
            isLoading: false
          })
        }
    })
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
    const { id } = this.props.match.params;
    db
    .collection("dreamEntries")
    .doc(id)
      .set({
        ...this.state
      }, {merge: true})
      .then((docRef) => {
        console.log("Document successfully updated!");
        this.props.history.push('/dreams')
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  render() {
    const {isLoading} = this.state;

    return (
      <Container>
        <h1 className="header">Edit dream</h1>
        {!isLoading &&
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
            <Form.Group controlId="date">
                <Form.Label>Date of dream</Form.Label>
                <Form.Control type="date" name="date" defaultValue={this.state.date} placeholder="Date of dream" onChange={this.handleChange} required/>
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
        }
        {isLoading &&
          (
            <Col lg={10}>
              <Spinner animation="border" role="loading"></Spinner>
            </Col>
          )
        }  
      </Container>
    )
  }
}
