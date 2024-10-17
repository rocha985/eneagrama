const express = require("express");
const bodyParser = require("body-parser");
const calculateScores = require("./calculateScores");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/calculate", (req, res) => {
    const userAnswers = req.body;
    try {
        const resultEneatipo = calculateScores(userAnswers);
        res.json({ resultEneatipo });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
