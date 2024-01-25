const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'ejs-views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.get('/', (req, res) => {
  res.render(createPath('main'));
});

app.post('/runScript', (req, res) => {
  const script = req.body.script;
  const scriptPath = 'tempScript.ps1';

  console.log('Received script:', script);

  try {

    if (!script || typeof script !== 'string') {
      throw new Error('Invalid script data');
    }

    fs.writeFileSync(scriptPath, script);

    exec(`powershell -File ${scriptPath}`, (error, stdout, stderr) => {
      const output = stdout || stderr;

      console.log('Script execution output:', output);

      res.send(output);
      fs.unlinkSync(scriptPath);
    });
  } catch (error) {
    console.error('Error writing script file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
