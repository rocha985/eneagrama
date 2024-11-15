import calculateScores from './calculateScores';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const userAnswers = req.body;

        try {
            const allEneatipos = calculateScores(userAnswers);
            
            const sortedEneatipos = allEneatipos.sort((a, b) => b.score - a.score);
            
            res.status(200).json(sortedEneatipos);
        } catch (error) {
            console.error("Erro ao calcular o eneatipo:", error);
            res.status(500).json({ error: "Erro ao calcular o eneatipo" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
