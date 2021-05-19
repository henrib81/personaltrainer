import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddTrainings(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: props.customer.id
});

const handleClickOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
}

const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
};

return(
    <div>
         <IconButton variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
              <DirectionsRunIcon/>
          </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">New Training</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Date"
                  name="date"
                  value={training.date}
                  onChange={inputChanged}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Duration"
                  name="duration"
                  value={training.duration}
                  onChange={inputChanged}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Activity"
                  name="activity"
                  value={training.activity}
                  onChange={inputChanged}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>

    
    </div>
);
}

export default AddTrainings;