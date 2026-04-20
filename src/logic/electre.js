// src/logic/electre.js

/**
 * Calcule la méthode ELECTRE I de manière générale
 * @param {Array} matrix - Matrice de performances (alternatives x critères)
 * @param {Array} weights - Poids bruts saisis par l'utilisateur
 * @param {Array} types - Tableau de types ('max' ou 'min')
 * @param {number} p - Seuil de concordance (ex: 0.8)
 * @param {number} q - Seuil de discordance (ex: 0.25)
 */
export const calculateElectreI = (matrix, weights, types, p, q) => {
    const numAlt = matrix.length;
    const numCrit = matrix[0].length;

    // 1. NORMALISATION AUTOMATIQUE DES POIDS 
    // Calcule la somme totale pour transformer les poids bruts en poids relatifs
    const sumWeights = weights.reduce((a, b) => a + b, 0) || 1;
    const normalizedWeights = weights.map(w => w / sumWeights);

    // 2. CALCUL DE LA MATRICE DE CONCORDANCE [cite: 31]
    let concordanceMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i === j) continue;
            let sumObserved = 0;
            for (let k = 0; k < numCrit; k++) {
                // Vérifie si l'alternative i est meilleure ou égale à j
                const isBetter = types[k] === 'max' ? matrix[i][k] >= matrix[j][k] : matrix[i][k] <= matrix[j][k];
                if (isBetter) sumObserved += normalizedWeights[k];
            }
            concordanceMatrix[i][j] = parseFloat(sumObserved.toFixed(3));
        }
    }

    // 3. CALCUL DE LA MATRICE DE DISCORDANCE [cite: 32]
    let discordanceMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    // Calcul des étendues (échelles) pour chaque critère
    const ranges = Array(numCrit).fill(0);
    for (let k = 0; k < numCrit; k++) {
        const values = matrix.map(row => row[k]);
        ranges[k] = Math.max(...values) - Math.min(...values) || 1;
    }

    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i === j) continue;
            let maxDiff = 0;
            for (let k = 0; k < numCrit; k++) {
                const isWorse = types[k] === 'max' ? matrix[i][k] < matrix[j][k] : matrix[i][k] > matrix[j][k];
                if (isWorse) {
                    const diff = Math.abs(matrix[i][k] - matrix[j][k]) / ranges[k];
                    if (diff > maxDiff) maxDiff = diff;
                }
            }
            discordanceMatrix[i][j] = parseFloat(maxDiff.toFixed(3));
        }
    }

    // 4. MATRICE DE SURCLASSEMENT (S_pq) [cite: 33]
    let outrankingMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i !== j && concordanceMatrix[i][j] >= p && discordanceMatrix[i][j] <= q) {
                outrankingMatrix[i][j] = 1;
            }
        }
    }

    // 5. EXTRACTION DU NOYAU (N) 
    let kernel = [];
    for (let i = 0; i < numAlt; i++) {
        let isOutranked = false;
        for (let j = 0; j < numAlt; j++) {
            if (outrankingMatrix[j][i] === 1) {
                isOutranked = true;
                break;
            }
        }
        if (!isOutranked) kernel.push(`A${i + 1}`);
    }

    return { concordanceMatrix, discordanceMatrix, outrankingMatrix, kernel };
};