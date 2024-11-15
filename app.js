const express = require("express");
const bodyParser = require("body-parser");
const calculateScores = require("./api/calculateScores");
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
        const top3Eneatipos = calculateScores(userAnswers);
        res.json(top3Eneatipos);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
