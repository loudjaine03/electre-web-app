// src/logic/electre.js

/**
 * Calcule la méthode ELECTRE I
 * @param {Array} matrix - Matrice de performances (alternatives x critères)
 * @param {Array} weights - Poids bruts saisis par l'utilisateur (ex: 3, 2.5, 5.5)
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

    // 2. CALCUL DE LA MATRICE DE CONCORDANCE [cite: 111, 112]
    let concordanceMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i === j) { concordanceMatrix[i][j] = 1; continue; }
            let sumObserved = 0;
            for (let k = 0; k < numCrit; k++) {
                // Vérifie si l'alternative i est meilleure ou égale à j
                const isBetter = types[k] === 'max' ? matrix[i][k] >= matrix[j][k] : matrix[i][k] <= matrix[j][k];
                if (isBetter) sumObserved += normalizedWeights[k];
            }
            concordanceMatrix[i][j] = parseFloat(sumObserved.toFixed(3));
        }
    }

    // 3. CALCUL DES DISCORDANCES AVEC DELTA GLOBAL [cite: 118, 119, 122]
    let discordanceMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    
    // Trouver Delta (δ) : la plus grande différence sur l'ensemble de la matrice 
    let delta = 0;
    for (let k = 0; k < numCrit; k++) {
        const values = matrix.map(row => row[k]);
        const diff = Math.max(...values) - Math.min(...values);
        if (diff > delta) delta = diff;
    }
    if (delta === 0) delta = 1;

    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i === j) continue;
            let maxDiff = 0;
            for (let k = 0; k < numCrit; k++) {
                // On regarde les critères où j est strictement meilleur que i [cite: 125]
                const isWorse = types[k] === 'max' ? matrix[i][k] < matrix[j][k] : matrix[i][k] > matrix[j][k];
                if (isWorse) {
                    const diff = Math.abs(matrix[j][k] - matrix[i][k]);
                    if (diff > maxDiff) maxDiff = diff;
                }
            }
            // Application de la formule : max|g(j)-g(i)| / delta [cite: 119]
            discordanceMatrix[i][j] = parseFloat((maxDiff / delta).toFixed(3));
        }
    }

    // 4. GÉNÉRATION DU GRAPHE DE SURCLASSEMENT (S_pq) [cite: 128, 129]
    let outrankingMatrix = Array.from({ length: numAlt }, () => Array(numAlt).fill(0));
    for (let i = 0; i < numAlt; i++) {
        for (let j = 0; j < numAlt; j++) {
            if (i !== j && concordanceMatrix[i][j] >= p && discordanceMatrix[i][j] <= q) {
                outrankingMatrix[i][j] = 1;
            }
        }
    }

    // 5. EXTRACTION DU NOYAU (N) [cite: 144, 148]
    let kernel = [];
    for (let i = 0; i < numAlt; i++) {
        // Une alternative est dans le noyau si elle n'est surclassée par personne [cite: 146]
        let isOutranked = false;
        for (let j = 0; j < numAlt; j++) {
            if (outrankingMatrix[j][i] === 1) {
                isOutranked = true;
                break;
            }
        }
        if (!isOutranked) kernel.push(`Z${i + 1}`);
    }

    return { concordanceMatrix, discordanceMatrix, outrankingMatrix, kernel };
};