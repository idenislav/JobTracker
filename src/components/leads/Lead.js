import React from "react"
import CustomModal from "../../config/Modal";
import UpdateLead from "./UpdateLead"
import DeleteLead from "./DeleteLead";
import "../../Styles/App.css";

const Lead = ({ leadData, reload }) => {
    return (
      <div id={leadData._id}>
        <div>{leadData.status}</div>
        <div>{leadData.position}</div>
        <div>{leadData.company}</div>
        <div>{leadData.applied_thru}</div>
        <div>{leadData.date_applied}</div>
        <CustomModal btnText="Update" title="Update Lead">
          <UpdateLead reload={reload} lead={leadData} />
        </CustomModal>
        <CustomModal btnText="Delete" title="Delete Lead">
          <DeleteLead reload={reload} id={leadData._id} />
        </CustomModal>
      </div>
    );
}

export default Lead;
