const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  trackFollowUp,
} = require('../controllers/customerController');
const auth = require('../middlewares/auth');

router.post('/', auth, createCustomer);
router.get('/', auth, getAllCustomers);
router.get('/:id', auth, getCustomerById);
router.put('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);
router.post('/:id/followup', auth, trackFollowUp);

module.exports = router;