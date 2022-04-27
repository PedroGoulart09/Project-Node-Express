const { getTalkers, setTalkers } = require('../utils/talkerUtils');

const getTalker = async (req, res) => {
    const getTalk = await getTalkers();
    return res.status(200).json(getTalk);
};

const getFindTalkers = async (req, res) => {
    const { id } = req.params;
    const getTalk = await getTalkers();
    const findTalk = getTalk.find((value) => value.id === Number(id));
    if (!findTalk) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(findTalk);
};

const generateRandomToken = (_req, res) => {
    let randomToken = '';
    const size = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i += 1) {
        randomToken += characters.charAt(
            Math.floor(
                Math.random() * characters.length,
            ),
        );
    }
    return res.status(200).json({ token: randomToken });
};

const addNewUser = async (req, res) => {
    const { name, age, talk } = req.body;
    const users = await getTalkers();
    const user = {
        name,
        age,
        id: (users.length + 1),
        talk,
    };
    users.push(user);
    await setTalkers(users);
    return res.status(201).json(user);
};

const editTalker = async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const edit = {
        ...req.body,
        id: Number(id),
    };
    const previousTalker = talkers.filter((t) => t.id !== Number(id));
    const newTalkers = [...previousTalker, edit];
    await setTalkers(newTalkers);
    return res.status(200).json(edit);
};

const searchTerm = async (req, res) => {
    const { q } = req.query;
    const talkers = await getTalkers();
    const filterQuery = talkers.filter((t) => t.name.includes(q));
    if (q === undefined
        || filterQuery.length === 0
    ) return res.status(200).json(talkers);

    return res.status(200).json(filterQuery);
};

module.exports = {
    getTalker,
    getFindTalkers,
    generateRandomToken,
    searchTerm,
    addNewUser,
    editTalker,
};