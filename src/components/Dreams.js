import React, { Component } from 'react'
import CompressedDream from './CompressedDream';
import Container from 'react-bootstrap/Container';
import {Spinner} from 'react-bootstrap';
// import db from '../firebase/db';
import firebase from 'firebase';
const db = firebase.firestore();

export default class Dreams extends Component {
  state = {
    dreams: [],
    isLoading: true,
    showWarning: false
  }

  componentDidMount(){
    this.unsubscribe = db
          .collection("dreamEntries")
          .orderBy('date', 'desc')
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

  handleDelete = (id) => {
    return () => {
      console.log(id);
      db
        .collection("dreamEntries")
        .doc(id)
        .delete()
        .then(doc => {
          this.setState({
            showWarning: false
          })
          this.props.history.push('/dreams');
        })
    }
  }

  toggleShowWarning = () => {
    this.setState({
      showWarning: !this.state.showWarning
    })
  }

  render() {
    let dreams = this.state.dreams.map(dream => {
      return (
        <CompressedDream 
          key={dream.id} 
          dream={dream} 
          toggleShowWarning={this.toggleShowWarning} 
          showWarning={this.state.showWarning} 
          handleDelete={this.handleDelete}            
        />
      )
    })

    return (
      <Container>
        <h1 className="header">All Dreams</h1>
        {this.state.isLoading && 
          <Spinner animation="border" role="loading"></Spinner>
        }
        {!this.state.isLoading && dreams}
      </Container>
    )
  }
}
