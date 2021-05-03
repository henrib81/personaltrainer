import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';



function Trainings() {

    const [trainings, setTrainings] = useState([{
        id: '',
        date: '',
        duration: '',
        activity: '',
        customer: ''
    }]);
    

    useEffect(() => {
        fetchTrainings()
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data, data.customer))
        .catch(err => console.error(err))
    }

   

    const columns = [
        { headerName: "Id", field: 'id', sortable: true, filter: true},
        { headerName: "Date", field: 'date', sortable: true, filter: true, resizable: true},
        { headerName: "Duration(in minutes)", field: 'duration', sortable: true, filter: true},
        { headerName: "Activity", field: 'activity', sortable: true, filter: true},
        { headerName: "Customer id", field: 'customer.id', sortable: true, filter: true},
        { headerName: "Firstname", field: 'customer.firstname', sortable: true, filter: true},
        { headerName: "Lastname", field: 'customer.lastname', sortable: true, filter: true}

    ]

    return(
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto', textAlign: 'left'}}>
        <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            rowSelection="single"
            pagination={true}
            paginationPageSize={8}
            suppressCellSelection={true}
    
        />

        
        </div>
    );
}

export default Trainings;