const express = require('express')
const router = express.Router()

const {
    getAllcustomers,
    getACustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../Controllers/CustomerController');

// router.get('/api/Customers', getAllcustomers);
// router.post('/api/Customers/', createCustomer);
router.route('/').get(getAllcustomers).post(createCustomer);


// router.get('/api/Customers/:Customerid', getACustomer);
// router.delete('/api/Customers/:Customerid', deleteCustomer);
// router.patch('/api/Customers/:Customerid', updateCustomer);
router.route('/:Customerid').get(getACustomer).delete(deleteCustomer).patch(updateCustomer);

module.exports = router;