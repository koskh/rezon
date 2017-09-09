// @flow

const express = require('express');

const router = express.Router();

router.get('/:min/:max', (req: express$Request, res: express$Response) => {
    const min = Number.parseInt(req.params.min, 10);
    const max = Number.parseInt(req.params.max, 10);

    const respond: ServerRespond = {
        data: null,
        error: null
    };

    if (Number.isNaN(min) || Number.isNaN(max)) {
        res.status(400);

        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const result = Math.round((Math.random() * (max - min)) + min);
    res.json(result);
});


module.exports = router;
