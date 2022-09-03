const { application } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');


//Settings
app.set('port', process.env.PORT || 7000);
app.set('json spaces', 2);


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// router
app.use('/contacts', require('./routes/contacts'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
}
)

