const router = require("express").Router();

const {
    getAllAccounts,
    updateAccount,
    upgradeAccount,
    deleteAccount,
    searchAccount
  } = require("../controllers/accounts");

router.get('/all-users', getAllAccounts);
router.post('/search-user', searchAccount);  
router.patch('/user-update', updateAccount);
router.patch('/user-upgrade', upgradeAccount);
router.delete('/user-delete', deleteAccount);

module.exports = router;