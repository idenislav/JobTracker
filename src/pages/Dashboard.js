import React, { Component } from 'react';
import {LEADS_API} from "../config/coms";
// import NewLead from './NewLead';
import Lead from "../components/leads/Lead"

class Dashboard extends Component {
    state = {
        leads: [],
        leadsFormatted: []
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
              <Lead reload={this.getLeads} leadData={jsonLead} />
            ))
          )
          .then(components => this.setState({ leads: components }))
          .catch(console.log);
    }
    componentDidMount() {
        this.getLeads()
    }
    render(){
        return (
          <>
            <div className='flexbox-row'>{this.state.leads}</div>
          </>
        );
    }
}

export default Dashboard;