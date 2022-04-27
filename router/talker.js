const express = require('express');

const router = express.Router();
const { getTalker, getFindTalkers,
    addNewUser, editTalker, searchTerm } = require('../middlewares/talkerMiddlewares');
const { isValidName,
    isValidAge, checkFormatDateWatchedAt,
    isValidRate, isValidAll } = require('../Controllers/talkerValidation');
const { isValidToken, deleteUser } = require('../Controllers/validToken');

router.get('/talker', getTalker);

router.get('/talker/search',
    isValidToken,
    searchTerm);
router.get('/talker/:id', getFindTalkers);

router.post('/talker',
    isValidToken,
    isValidName,
    isValidAge,
    isValidAll,
    checkFormatDateWatchedAt,
    isValidRate,
    addNewUser);

router.put('/talker/:id',
    isValidToken,
    isValidName,
    isValidAge,
    isValidAll,
    checkFormatDateWatchedAt,
    isValidRate,
    editTalker);

router.delete('/talker/:id',
    isValidToken,
    deleteUser);

module.exports = router;