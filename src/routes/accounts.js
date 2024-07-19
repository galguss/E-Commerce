const router = require("express").Router();

const {
    getAllAccounts,
    updateAccount,
    upgradeAccount,
    deleteAccount,
    searchAccount,
    showUpdateForm
  } = require("../controllers/accounts");

router.get('/all-users', getAllAccounts);
router.get('/user-update/:id', showUpdateForm);

router.post('/search-user', searchAccount);

router.patch('/user-update', updateAccount);
router.patch('/user-upgrade', upgradeAccount);

router.delete('/user-delete', deleteAccount);

module.exports = router;