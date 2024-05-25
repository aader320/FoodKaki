const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD1CfDsa3D9YH-ksmwzPkl-RS0zZi-1VQs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

async function GeminiPrompt(prompt) {
    try{
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    }
    catch(error) {
        console.error("Error Generating Gemini Content: ", error);
    }
  }

app.post('/api/submit', (req, res) => {
    const { data } = req.body;  // Search query received from client
    console.log("Received data:", data);

    const scriptPath = 'GrabQuery.py';
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

GeminiPrompt("Output nothing else except the json data. List me the ingredients in json format needed to make" + "nasi lemak");

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
