const { Router, request, application } = require('express');
const router = Router();
const _ = require('underscore');

const data = require('../contacts.json');


router.all('/', (req, res, next) => {
    if (req.method === "GET") {
        result = data.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        res.json(result);
        res.status(200);
    }else{
        res.status(405).json({ "error": " Method Not Allowed " });
    }
    next();
});

router.all('/byId/:id', (req, res,next) => {
    if (req.method === "GET") {
        let id = req.params.id;
        let result = data.find(x => x.id == id)
        if (result != null) {
            res.send(result);
            res.status(200);
        }
        else
            res.status(404).json({ "error": " Not Found" });
    } else{
        res.status(405).json({ "error": " Method Not Allowed " });
    }
    next();
});

router.all('/insert', (req, res, next) => {
    if (req.method === "POST") {
        const { id, name, phone, addressLines = [] } = req.body;
        if (id && name && phone && addressLines.length) {
            const newContcact = { ...req.body };
            data.push(newContcact);

        }
        else {
            res.status(500).json({ "error": "There was an error." });
        }
    } else {
        res.status(405).json({ "error": " Method Not Allowed " });
    }
    next();
}, (req, res, next) => {
    res.json({ "success": `Contacto guardado por ${req.ip}` });
    next();
});

router.all('/delete/:id', (req, res, next) => {
    if (req.method === "DELETE") {
        const { id } = req.params;
        _.each(data, (contact, i) => {
            if (contact.id == id) {
                data.splice(i, 1);
            }
        });
        res.status(200).json({ "success": "Eliminado correctamente" });
    }
    else {
        res.status(405).json({ "error": " Method Not Allowed " });
    }
    next();
})

module.exports = router;