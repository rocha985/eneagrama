const express = require("express");
const bodyParser = require("body-parser");
const calculateScores = require("./calculateScores");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/calculate", (req, res) => {
    const userAnswers = req.body;
    try {
        const resultEneatipo = calculateScores(userAnswers);
        res.json({ resultEneatipo });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
