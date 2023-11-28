const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const multer = require('multer');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('fiilees.db')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())
const jsonParser = express.json()


app.listen(8000, function () {
  console.log('запуск на 8000 порту');
});


app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
  }));
  
  const authenticateUser = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
    }
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('file'), authenticateUser,(req, res) => {
    const file = req.file;
  
    db.run('INSERT INTO files (name) VALUES (?)', [file.originalname], function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'File uploaded successfully' });
      }
    });
  });




  app.get('/Checkid/token/:token', (req, res) => {
    const token = req.params.token;
  
    db.all(`SELECT * FROM users WHERE token = ?`, token, (err, row) => {
      if (err) {
        console.log(err);
        res.status(500).send();
        return;
      }
      res.send(row);
    });
  });



  app.post('/loading/files', (req, res) => {
    const { name , file_path } = req.body;
  
    db.run(`INSERT INTO files (name , file_path) VALUES("${name}", "${file_path}")`)
  
    res.send({
    name,
    file_path,
    });
  });