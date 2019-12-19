import React, { Component } from 'react';
import {LEADS_API} from "../config/coms";
// import NewLead from './NewLead';
import Lead from "../components/leads/Lead"

class Dashboard extends Component {
    state = {
        leads: [],
        leadsFormatted: [],
        leadStatus: "",
        
    }

    getLeads = () => {
        // fetch(`${LEADS_API}/leads`)
        //     .then(response => response.json())
        //     .then(data => console.log("leads:", data))
        //     .catch(console.log);
        fetch(`${LEADS_API}/leads`)
          .then(response => response.json())
          .then(body =>
            body.map(jsonLead => (
              <Lead key={jsonLead._id} reload={this.getLeads} leadData={jsonLead} />
            ))
          )
          .then(components => this.setState({ leads: components }))
          .catch(console.log);
    }
    filterLeads = () => {
        let filtered = this.state.leads.filter(lead => 
            lead.props.leadData.status.toLowerCase() === this.state.leadStatus.toLowerCase()
            )
        console.log('filtered',filtered)
        this.setState({leadsFormatted: filtered})
            return filtered;      
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value }, this.filterLeads);
      };

    componentDidMount() {
        this.getLeads()
    }
    render(){
        console.log('this.state.leads', this.state.leads)
        return (
          <>
          <select
              name="leadStatus"
              value={this.state.leadStatus}
              onChange={this.handleChange}
            >
              <option value="" />  
              <option value="Applied" >Applied</option>
              <option value="Rejected" >Rejected</option>
              <option value="Accepted" >Accepted</option>


              {/* <option value="LEAD">Lead</option>
              <option value="APPLIED">Applied</option>
              <option value="PENDING">Pending</option>
              <option value="REMOTE">Remote</option>
              <option value="IN_PERSON">In Person</option>
              <option value="TECH_CHALLENGE">Tech Challenge</option>
              <option value="OFFERED">Offered</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option> */}
            </select>
            <div className='flexbox-row'>{this.state.leadsFormatted}</div>
          </>
        );
    }
}

export default Dashboard;