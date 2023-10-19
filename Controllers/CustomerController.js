//GET ACCESS TO DATABASE
// const Customers = require('../Models/Customer');
const customers = require('../Models/Customer')

const getAllcustomers = (req, res) => {
    // res.send('all customers')
    res.status(200).json({customers, NumOfCustomer: customers.length, success: true});
};

const getACustomer = (req, res) => {
    // res.send('Get A customer') 
    // console.log(req.param);
    const {Customerid} = req.params;
    const Customer = customers.find((c) => c.id === parseInt(Customerid));
    if(!Customer) {
        return res.status(404).json({
            success: false,
            message: `Customer with the id : ${Customerid} not found `,
        });
    }
    res.status(200).json({success: true, Customer});
};

const createCustomer = (req, res) =>  { 
    // res.send('Create A Customer')
    const { name } = req.body
    if (!name) {
        return res.status(400).json({success: false, message: 'please provide a name'});
    }
    const newCustomer = {
        id: 6,
        name,
    };
    res.status(201)
    .json({success: true, Customers: [...customers, newCustomer]});
};

const updateCustomer = (req, res) => {
    // res.send('Update Customer')
    const {Customerid} = req.params
    const { name } = req.body
    if (!name) {
        return res.status(400).json({message: 'provide a name'})
    }
    const updatedCustomers = customers.filter((c) => {
         if (c.id === parseInt(Customerid)) {
            c.name = name;
        }
        return c;
    }) 
    res.status(200).json({customers: updatedCustomers})
};

const deleteCustomer = (req, res) => {
    // res.send('Delete A Customer') 
    const {Customerid} = req.params
    const Customer = customers.find((c) => c.id === parseInt(Customerid));
    if(!Customer) {
        return res.status(404).json({
            success: false,
            message: `Customer with the id : ${Customerid} not found `,
        });
    }
    const remainingCustomers = customers.filter(
        (c) => c.id !==parseInt(Customerid)
    );

    res.status(200).json({ Customers: remainingCustomers });
    // res.status(200).json({success: true, Customer});
};

module.exports = {
    getAllcustomers,
    getACustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};