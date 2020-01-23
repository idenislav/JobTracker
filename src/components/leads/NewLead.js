import React, { Component } from "react";
import { LEADS_API } from "../../config/coms";
import "../../Styles/App.css";

class NewLead extends Component {
  state = {
      status: "",
      position: "",
      company: "",
      applied_thru: "",
      date_applied: new Date().toDateString(),
      updated_date: "",
      links: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    fetch(`${LEADS_API}/lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(console.log)
      .then(() => this.props.reload())
      .catch(console.log);
  };

  //   handleChange = event => {
  //     this.setState({ [event.target.name]: [event.target.value] });
  //   };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
        {/* <input 
            name="date_applied"
            value={this.state.date_applied}
            onChange={this.handleChange}
            type="text"
            visability="hidden"
          /> */}
          <input
            name="company"
            type="text"
            placeholder="Company"
            onChange={this.handleChange}
          />
          
          <input
            name="jobLink"
            type="text"
            placeholder="jobLink"
            onChange={this.handleChange}
          />

          <select
            name="status"
            value={this.state.status}
            onChange={this.handleChange}
            >
              <option value="" disabled selected >Select status</option>
              <option value="Applied" >Applied</option>
              <option value="Rejected" >Rejected</option>
              <option value="Accepted" >Accepted</option>
          </select>

          <select
              name="applied_thru"
              value={this.state.applied_thru}
              onChange={this.handleChange}
            >
              <option value="" disabled selected >Select applied thru</option>
              <option value="LINKEDIN">LinkedIn</option>
              <option value="DICE">Dice</option>
              <option value="GOOGLE">Google</option>
              <option value="KSL">KSL</option>
              <option value="INDEED">Indeed</option>
              <option value="COMPANY">Company</option>
              <option value="SOCIAL">Social</option>
              <option value="NETWORKING">Networking</option>
              <option value="OTHER">Other</option>
            </select>

            <select
            name="position"
            type="text"
            onChange={this.handleChange} >
            
            <option value="" disabled selected >Select position</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Front End Web Developer">Front End Web Developer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Web Developer">Web Developer</option>
            </select>

          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default NewLead;
