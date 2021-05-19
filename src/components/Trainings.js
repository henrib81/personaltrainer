import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



function Trainings() {

    const [trainings, setTrainings] = useState([{
        id: '',
        date: '',
        duration: '',
        activity: '',
        customer: ''
    }]);
    
    const [open, setOpen] = useState(false);

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }
    

    useEffect(() => {
        fetchTrainings()
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data, data.customer))
        .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure?')){
        fetch(params, { 
        method: 'DELETE'})
        .then(response => {
         if (response.ok) {
            openSnackbar();
            fetchTrainings();
         }
          else {
            alert('Try again!');
          }
        })
        .catch(err => console.error(err));
      }
      }

    const columns = [
        { headerName: "Id", field: 'id', sortable: true, filter: true, width: 100},
        { headerName: "Date", field: 'date', sortable: true, filter: true, resizable: true},
        { headerName: "Duration(in minutes)", field: 'duration', sortable: true, filter: true},
        { headerName: "Activity", field: 'activity', sortable: true, filter: true},
        { headerName: "Customer id", field: 'customer.id', sortable: true, filter: true, width: 100},
        { headerName: "Firstname", field: 'customer.firstname', sortable: true, filter: true},
        { headerName: "Lastname", field: 'customer.lastname', sortable: true, filter: true},
        { headerName: 'Delete', 
          field: 'links.0.href',
          width: 100,
          cellRendererFramework: params =>
            <IconButton onClick={ () => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
        },

    ]

    return(
        <div>
        <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto', textAlign: 'left'}}>
        <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            rowSelection="single"
            pagination={true}
            paginationPageSize={8}
            suppressCellSelection={true}
            autoSizeAllColumns={true}
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

export default Trainings;