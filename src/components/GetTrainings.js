import React, { useState } from 'react';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import IconButton from '@material-ui/core/IconButton';
import { AgGridReact } from 'ag-grid-react';

function GetTrainings(props) {

    const [trainings, setTrainings] = useState([{
        id: '',
        date: '',
        duration: '',
        activity: '',
        customer: ''
    }]);

    const getTrainings = (props) => {
        let id = props.customers.id
        fetch(`https://customerrest.herokuapp.com/api/customers/${id}/trainings`)
        .then(response => response.json())
        .then(data => setTrainings(data.content.links[2]))
        .catch(err => console.error(err))
    }

    const columns = [
        { headerName: "Id", field: 'id', sortable: true, filter: true, width: 100},
        { headerName: "Date", field: 'date', sortable: true, filter: true, resizable: true},
        { headerName: "Duration(in minutes)", field: 'duration', sortable: true, filter: true},
        { headerName: "Activity", field: 'activity', sortable: true, filter: true}
    ]


return(
    <div>
        <IconButton variant="outlined" fontSize="small" color="primary" onClick={getTrainings}>
            <DirectionsBikeIcon/>
        </IconButton>
        <AgGridReact
            rowData={trainings}
            columnDefs={columns}
        />
    </div>

)
}
export default GetTrainings;