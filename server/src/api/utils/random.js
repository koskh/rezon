// @flow

const express = require('express');

const router = express.Router();

router.get('/:min/:max', (req: express$Request, res: express$Response) => {
    const min = Number.parseInt(req.params.min, 10);
    const max = Number.parseInt(req.params.max, 10);

    const respond: ServerRespond = {
        data: null,
        error: null,
        errors: null
    };

    res.status(500);
    respond.error = 'Internal server error';
    res.json(respond);
    return;


    // if (Number.isNaN(min) || Number.isNaN(max)) {
    //     res.status(400);
    //
    //     respond.error = 'Неверные входные данные';
    //     res.json(respond);
    //     return;
    // }
    //
    // if (min === 42) {
    //     res.status(400);
    //     respond.error = 'Неверные входные данные';
    //     respond.errors = { min: ['Min не может быть равно 42'] };
    //     res.json(respond);
    //     return;
    // }
    //
    // if (max === 84) {
    //     res.status(400);
    //     respond.error = 'Неверные входные данные';
    //     respond.errors = { max: ['Max не может быть равно 84'] };
    //     res.json(respond);
    //     return;
    // }
    //
    // const result = Math.round((Math.random() * (max - min)) + min);
    // setTimeout(() => {
    //     respond.data = result;
    //     res.json(respond);
    // }, 1500);
});


module.exports = router;
