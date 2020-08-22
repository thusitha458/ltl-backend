const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {DB_URL, userRoles} = require('./config/config');
const userController = require('./controllers/user-controller');
const projectController = require('./controllers/project-controller');
const templateController = require('./controllers/template-controller');
const authController = require('./controllers/auth-controller');

// mongoose setup
const mongoose = require('mongoose');

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Successfully connected to the database');
});

// express setup
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/user', authController.authenticate([userRoles.ADMIN]), userController.insertUser);
app.post('/user/login', userController.login);
app.put('/user/me/password', authController.authenticate([userRoles.ANY]), userController.updatePassword);
app.put('/user/:role/password', authController.authenticate([userRoles.ADMIN]), userController.updatePasswordForRole);

app.post('/project', authController.authenticate([userRoles.ADMIN, userRoles.SPE]), projectController.insertProject);
app.get('/project/:ct', authController.authenticate([userRoles.ANY]), projectController.getProjectByCt);
app.get('/project', authController.authenticate([userRoles.ANY]), projectController.getProjects);
app.put('/project/:ct', authController.authenticate([userRoles.ANY]), projectController.updateProject);
app.delete('/project/:ct', authController.authenticate([userRoles.ADMIN, userRoles.SPE]), projectController.deleteProject);

app.post('/template', authController.authenticate([userRoles.ADMIN]), templateController.insertTemplate);

app.listen(8080, () => console.log('Server started'));