import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Trainings from './Trainings';
import Customers from './Customers';

function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    }

        return (
            <div>
                <h1>Personal trainer app</h1>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} style={{ margin: 'auto'}}>
                        <Tab value="one" label="Customers" />
                        <Tab value="two" label="Trainings" />
                    </ Tabs>
                </ AppBar>
                {value === 'one' && <Customers />}
                {value === 'two' && <Trainings />}
            </div>
    );
}

export default TabApp;