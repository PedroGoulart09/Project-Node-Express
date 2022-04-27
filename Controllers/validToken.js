const { getTalkers, setTalkers } = require('../utils/talkerUtils');

const isValidToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
    next();
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const returnTalker = await getTalkers();
    returnTalker.splice(returnTalker[id]);
    await setTalkers(returnTalker);
    return res.status(204).json();
};

module.exports = { isValidToken, deleteUser };