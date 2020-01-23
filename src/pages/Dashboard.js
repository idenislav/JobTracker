import React, { Component } from "react";
import { LEADS_API } from "../config/coms";
// import NewLead from './NewLead';
import Lead from "../components/leads/Lead";
import "../Styles/App.css";

class Dashboard extends Component {
  state = {
    leads: [],
    leadsFormatted: [],
    status: "",
    applied_thru: "",
    company: "",
    position: "",
    filterFor: []
  };

  getLeads = () => {
    // fetch(`${LEADS_API}/leads`)
    //     .then(response => response.json())
    //     .then(data => console.log("leads:", data))
    //     .catch(console.log);
    fetch(`${LEADS_API}/leads`)
      .then(response => response.json())
      // .then(body =>
      //   body.map(jsonLead => (
      //     <Lead key={jsonLead._id} reload={this.getLeads} leadData={jsonLead} />
      //   ))
      // )
      .then(data => this.setState({ leads: data }, () => this.filterLeads()))
      .catch(console.log);
  };

  filterLeads = () => {
    let filtered = this.state.leads
    this.state.filterFor.map(el => {
      console.log("el", this.state.filterFor)
      console.log("element", el)

      if (this.state[el] !== "") 
      {filtered = filtered.filter(lead => {
        //filter the leads, where we pour filtered lead into a filterFor array and 
        // then mapping it, and check if the state is equal too in order to return 
        // the filters properly
      //return lead.props.leadData[el] === this.state[el];
      return lead[el] === this.state[el];
      })};
      return filtered;
    });

    console.log('filtered',filtered)
    // this.setState({ leadsFormatted: filtered });
    return this.setState({ leadsFormatted: filtered });
  };

  // filterLeads = () => {
  //     let filtered = this.state.leads.filter(lead => {
  //        if (this.state.leadData !== "") {
  //          return lead.props.leadData.status.toLowerCase() === this.state.leadStatus.toLowerCase()
  //        } else {
  //         console.log(lead.props.leadData.applied_thru.toLowerCase(), "=", this.state.applied_thru.toLowerCase())
  //         return lead.props.leadData.applied_thru.toLowerCase() === this.state.applied_thru.toLowerCase()
  //        }

  //       })
  //     console.log('filtered',filtered)
  //     this.setState({leadsFormatted: filtered})
  //         return filtered;
  // }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });

    this.setState(
      { filterFor: [...this.state.filterFor, target.name] },
      this.filterLeads
    );
  };

  componentDidMount() {
    this.getLeads();
    this.filterLeads();
  }
  render() {
    // console.log('this.state.leads', this.state)
    return (
      <>
        <div>
          <h1>Total count: { this.state.leads.length } </h1>
          <h3>applied: { this.state.leads.filter(el => "Applied" === el.status).length } </h3>
          <h3>accepted: { this.state.leads.filter(el => "Accepted" === el.status).length } </h3>
          <h3>rejected: { this.state.leads.filter(el => "Rejected" === el.status).length } </h3>
          {/* <h3>rejected count: { this.state.leads.} </h3>
          <h3>accepted count: { this.state.leads. } </h3> */}
        </div>
        <hr />

        <select
          name="status"
          value={this.state.status}
          onChange={this.handleChange}
        >
          <option value="" disabled selected >Select status</option>
          <option value="Applied">Applied</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>

        </select>

        <select
          name="applied_thru"
          // value={this.state.applied_thru}
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
          value={this.state.position}
          onChange={this.handleChange}
        >
          <option value="" disabled selected >Select position</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Front End Web Developer">Front End Web Developer</option>
          <option value="Software Developer">Software Developer</option>
          <option value="Web Developer">Web Developer</option>
        </select>  

        <div className="flexbox-row">{this.state.leadsFormatted.map(jsonLead => (
          <Lead key={jsonLead._id} reload={this.getLeads} leadData={jsonLead} />
        ))}</div>
      </>
    );
  }
}

export default Dashboard;
