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

// Serve the PowerShell script
app.get('/customInstaller.ps1', (req, res) => {
  const scriptPath = path.join(__dirname, 'scripts', 'customInstaller.ps1');
  res.sendFile(scriptPath);
});

app.post('/runScript', async (req, res) => {
  const script = req.body.script;
  const tempFolderPath = 'C:\\Temp';  // Update the temporary folder path as needed

  console.log('Received script:', script);

  try {
    if (!script || typeof script !== 'string') {
      throw new Error('Invalid script data');
    }

    // Create the temporary folder if it doesn't exist
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
      console.log(`Temporary folder ${tempFolderPath} created successfully.`);
    }

    // Write the script file to the temporary folder
    fs.writeFileSync(path.join(tempFolderPath, 'tempScript.ps1'), script);

    // Execute the script
    exec(`powershell -File ${path.join(tempFolderPath, 'tempScript.ps1')}`, (error, stdout, stderr) => {
      const output = stdout || stderr;

      console.log('Script execution output:', output);

      // Send the output back to the client
      res.send(output);

      // Remove the script file from the temporary folder
      fs.unlinkSync(path.join(tempFolderPath, 'tempScript.ps1'));

      // If this was the last installation, remove the temporary folder
      const filesInTempFolder = fs.readdirSync(tempFolderPath);
      if (filesInTempFolder.length === 0) {
        fs.rmdirSync(tempFolderPath);
        console.log(`Temporary folder ${tempFolderPath} removed successfully.`);
      }
    });
  } catch (error) {
    console.error('Error handling script:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
