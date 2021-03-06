const isValidName = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400).json({
            message:
                'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
};

const isValidAge = (req, res, next) => {
    const { age } = req.body;
    if (!Number.isInteger(age)) {
        return res.status(400).json({
            message:
                'O campo "age" é obrigatório',
        });
    }
    if (age < 18) {
        return res.status(400).json({
            message:
                'A pessoa palestrante deve ser maior de idade',
        });
    }
    next();
};

const checkFormatDateWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!regexDate.test(watchedAt)) {
        return res.status(400).json({
            message:
                'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const isValidAll = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({
            message:
                'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    const { rate, watchedAt } = talk;
    if (watchedAt === undefined || rate === undefined) {
        return res.status(400).json({
            message:
                'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    next();
};

const isValidRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = {
    isValidName,
    isValidAge,
    checkFormatDateWatchedAt,
    isValidRate,
    isValidAll,
};