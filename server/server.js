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
        return response.text();
    }
    catch(error) {
        console.error("Error Generating Gemini Content: ", error);
    }
  }

// app.post('/api/generateIngredients', async (req, res) => {
// const { inputFoodName } = req.body;
// try {
//     const ingredients = await GeminiPrompt(`Output nothing else except the json data. List me only the ingredients in json format needed to make ${inputFoodName}. e.g: [
//         "rice",
//         "coconut milk",
//         "pandan leaves",
//         "salt",
//         "santan",
//         "garlic"
//       ]`);
//     //res.json(ingredients);
//     try {
//         const parsedData = JSON.parse(ingredients);
//         res.send(parsedData); // Send the JSON data back to the client
//     } catch (parseError) {
//         console.error(`Error parsing JSON from Python script: ${parseParseError}`);
//         res.status(500).send({ error: 'Error parsing JSON from Python script' });
//     }
// } catch (error) {
//     res.status(500).json({ error: 'Failed to generate ingredients' });
// }
// });

app.post('/api/generateIngredients', async (req, res) => {
    const { inputFoodName } = req.body;
    try {
      const ingredients = await GeminiPrompt(`Output nothing else except the json data. List me only the ingredients in json format needed to make ${inputFoodName}. e.g: [
          "rice",
          "coconut milk",
          "pandan leaves",
          "salt",
          "santan",
          "garlic"
        ]`);
      console.log('Raw ingredients:', ingredients); // Log raw response
      
      try {
        const parsedData = JSON.parse(ingredients);
        console.log('Parsed ingredients:', parsedData); // Log parsed response
        res.send(parsedData); // Send the JSON data back to the client
      } catch (parseError) {
        console.error(`Error parsing JSON: ${parseError}`);
        res.status(500).send({ error: 'Error parsing JSON' });
      }
    } catch (error) {
      console.error('Failed to generate ingredients:', error);
      res.status(500).json({ error: 'Failed to generate ingredients' });
    }
  });
  

app.post('/api/submitGrab', (req, res) => {
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

app.post('/api/submitFairPrice', (req, res) => {
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
            console.log(parsedData);
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
