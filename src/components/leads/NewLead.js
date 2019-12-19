import React, { Component } from "react";
import { LEADS_API } from "../../config/coms";

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
            name="position"
            type="text"
            placeholder="position"
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
              <option value="" />
              <option value="Applied" >Applied</option>
              <option value="Rejected" >Rejected</option>
              <option value="Accepted" >Accepted</option>

          </select>

          <select
              name="applied_thru"
              value={this.state.applied_thru}
              onChange={this.handleChange}
            >
              <option value="blank" />
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
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default NewLead;
