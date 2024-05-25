const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/api/submit', (req, res) => {
    const { data } = req.body;  // Search query received from client
    console.log("Received data:", data);

    const scriptPath = 'all.py';
    exec(`python3 ${scriptPath} "${data}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send({ error: 'Execution error in Python script' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send({ error: stderr });
        }
        
        try {
            const parsedData = JSON.parse(stdout);
            res.send(parsedData); // Send the JSON data back to the client
        } catch (parseError) {
            console.error(`Error parsing JSON from Python script: ${parseParseError}`);
            res.status(500).send({ error: 'Error parsing JSON from Python script' });
        }
    });
    console.log("Success")
});

app.post('/api/submit1', (req, res) => {
    const { data } = req.body;  // Search query received from client
    console.log("Received data:", data);

    const scriptPath = 'FairpriceQuery.py';
    exec(`python3 ${scriptPath} "${data}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send({ error: 'Execution error in Python script' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send({ error: stderr });
        }
        
        try {
            const parsedData = JSON.parse(stdout);
            res.send(parsedData); // Send the JSON data back to the client
        } catch (parseError) {
            console.error(`Error parsing JSON from Python script: ${parseParseError}`);
            res.status(500).send({ error: 'Error parsing JSON from Python script' });
        }
    });
    console.log("Success")
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
