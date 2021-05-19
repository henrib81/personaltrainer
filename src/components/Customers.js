import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTrainings from './AddTrainings';
import GetTrainings from './GetTrainings';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customers() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }
    

    useEffect(() => {
        fetchCustomers()
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
          method: 'POST',
          body: JSON.stringify(newCustomer),
          headers: { 'Content-Type' : 'application/json'}
        })
        .then(response => {
          if(response.ok) {
            openSnackbar();
            fetchCustomers()
          }
          else
            alert('Try again!');
        })
        .catch(err => console.error(err))
      }

      const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(updatedCustomer),
          headers: { 'Content-Type' : 'application/json' }
        })
        .then(response => {
          if(response.ok) {
            openSnackbar();
            fetchCustomers();
          }
          else
            alert('Try again!');
        })
        .catch(err => console.error(err))
      }

      const deleteCustomer = (params) => {
        if (window.confirm('Are you sure?')){
        fetch(params, { 
        method: 'DELETE'})
        .then(response => {
         if (response.ok) {
            openSnackbar();
            fetchCustomers();
         }
          else {
            alert('Try again!');
          }
        })
        .catch(err => console.error(err));
      }
      }

      const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          body: JSON.stringify(newTraining),
          headers: { 'Content-Type' : 'application/json'}
        })
        .then(response => {
          if(response.ok) {
            openSnackbar();
            alert('New training added!');
          }
          else
            alert('Try again!');
        })
        .catch(err => console.error(err))
      }

      

    const columns = [
        {
          headerName: 'Edit',
          field: 'links.0.href',
          width: 100,
          cellRendererFramework: params =>
            <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
        },
        {
          headerName: 'Trainings', 
          field: 'links.0.href',
          width: 100,
          cellRendererFramework: params =>
          <GetTrainings link={params.value} customer={params.data} GetTrainings={GetTrainings} />
        },      
        { headerName: "Firstname", field: 'firstname', sortable: true, filter: true},
        { headerName: "Lastname", field: 'lastname', sortable: true, filter: true},
        { headerName: "Street address", field: 'streetaddress', sortable: true, filter: true},
        { headerName: "Postalcode", field: 'postcode', sortable: true, filter: true, width: 100},
        { headerName: "City", field: 'city', sortable: true, filter: true},
        { headerName: "Email", field: 'email', sortable: true, filter: true},
        { headerName: "Phone number", field: 'phone', sortable: true, filter: true, width: 100},
        {  
          headerName: 'Delete', 
          field: 'links.0.href',
          width: 100,
          cellRendererFramework: params =>
            <IconButton onClick={ () => deleteCustomer(params.value)}>
              <DeleteIcon />
            </IconButton>
        },
        {
          headerName: 'Add training',
          field: 'links.0.href',
          width: 100,
          cellRendererFramework: params =>
            <AddTrainings link={params.value} customer={params.data} addTraining={addTraining} />
        }

    ]

return(
    <div>
        <AddCustomer addCustomer={addCustomer}/>
    <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto', textAlign: 'left'}}>
        <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            suppressCellSelection={true}
            rowSelection="single"
            suppressAutoSize={true}
        />

    </div>
        <Snackbar
            open={open}
            message="done!"
            autoHideDuration={3000}
            onClose={closeSnackbar}  
        />

    </div>
    );
}

export default Customers;
