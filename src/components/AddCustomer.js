import React, { useState } from 'react';

function AddCustomer() {
    
    const [customer, setCustomer] = useState({
        id: '',
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''

    });

}

export default AddCustomer;