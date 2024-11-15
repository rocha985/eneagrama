const calculateScores = (answers) => {
    const eneatipoScores = {
        1: 0, 2: 0, 3: 0,
        4: 0, 5: 0, 6: 0,
        7: 0, 8: 0, 9: 0,
    };

    const questionToEneatipoMap = {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
        6: 6, 7: 7, 8: 8, 9: 9, 10: 1,
        11: 2, 12: 3, 13: 4, 14: 5, 15: 6,
        16: 7, 17: 8, 18: 9, 19: 1, 20: 2,
        21: 3, 22: 4, 23: 5, 24: 6, 25: 7,
        26: 8, 27: 9, 28: 1, 29: 2, 30: 3,
        31: 4, 32: 5, 33: 6, 34: 7, 35: 8,
        36: 9, 37: 1, 38: 2, 39: 3, 40: 4,
        41: 5, 42: 6, 43: 7, 44: 8, 45: 9,
    };

    if (!answers || typeof answers !== 'object') {
        throw new Error("Invalid answers format");
    }

    for (const [key, value] of Object.entries(answers)) {
        const questionIndex = parseInt(key.replace('q', ''));
        const eneatipo = questionToEneatipoMap[questionIndex];

        if (eneatipo) {
            const score = parseInt(value, 10);
            if (!isNaN(score)) {
                eneatipoScores[eneatipo] += score;
            }
        }
    }

    // Ordena os eneatipos por pontuação (do maior para o menor)
    const sortedEneatipos = Object.entries(eneatipoScores)
        .map(([eneatipo, score]) => ({ eneatipo: parseInt(eneatipo), score }))
        .sort((a, b) => b.score - a.score); // Ordenando pela pontuação

    return sortedEneatipos;
};
