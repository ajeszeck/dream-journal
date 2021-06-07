import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import moment from 'moment';

export default class DreamTable extends Component {
  render() {
    const dreams = this.props.dreams.map(dream => {
      let date = moment(dream.date.toDate());
      return (
        <tr key={dream.id}>
          <td>{date.format("MMMM Do, YYYY")}</td>
          <td>{dream.description}</td>
          <td>{dream.kindOfDream}</td>
          <td>
            <div style={{backgroundColor:`${dream.dreamColor}`,borderRadius:'50%',width:'15px',height:'15px',margin:'0 auto'}}></div>
          </td>
        </tr>
      )
    })
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Kind of Dream</th>
            <th>Dream Color</th>
          </tr>
        </thead>
        <tbody>
          {dreams}
        </tbody>
      </Table>
    )
  }
}
