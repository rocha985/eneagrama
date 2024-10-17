app.post("/calculate", (req, res) => {
    try {
        const userAnswers = req.body;
        const resultEneatipo = calculateScores(userAnswers);
        res.json({ resultEneatipo });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});
