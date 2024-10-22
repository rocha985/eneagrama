import calculateScores from './calculateScores';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const userAnswers = req.body;

        try {
            const resultEneatipo = calculateScores(userAnswers);

            res.status(200).json({ resultEneatipo });
        } catch (error) {
            console.error("Erro ao calcular o eneatipo:", error);
            res.status(500).json({ error: "Erro ao calcular o eneatipo" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
