import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customers() {

    const [customers, setCustomers] = useState([]);
    

    useEffect(() => {
        fetchCustomers()
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        { headerName: "Firstname", field: 'firstname', sortable: true, filter: true},
        { headerName: "Lastname", field: 'lastname', sortable: true, filter: true},
        { headerName: "Street address", field: 'streetaddress', sortable: true, filter: true},
        { headerName: "Postalcode", field: 'postcode', sortable: true, filter: true},
        { headerName: "City", field: 'city', sortable: true, filter: true},
        { headerName: "Email", field: 'email', sortable: true, filter: true},
        { headerName: "Phone number", field: 'phone', sortable: true, filter: true}

    ]



return(
    <div className="ag-theme-material" style={{ height: 1000, width: '90%', margin: 'auto', textAlign: 'left'}}>
        <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            suppressCellSelection={true}
            rowSelection="single"
        />

    </div>
    );
}

export default Customers;
