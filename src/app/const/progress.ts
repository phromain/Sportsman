export interface CategoryInfo {
    title: string; // Titre
    beforeBar: string; // Afficher devant la barre de progression
    afterBar: string; // Afficher à la fin de la barre de progression
    maxPoints: number; // Nombre maximum de points
}

export const Categories: { [key: string]: CategoryInfo } = {
    communication: {
        title: 'Communication',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
    concentration: {
        title: 'Concentration',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
    activation: {
        title: 'Activation',
        beforeBar: 'Sous-activation',
        afterBar: 'Activation optimale',
        maxPoints: 50,
    },
    stress: {
        title: 'Stress',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 25,
    },
    anxiete: {
        title: 'Anxiété',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 25,
    },
    confiance: {
        title: 'Confiance',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
    motivation: {
        title: 'Motivation',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
    emotions: {
        title: 'Émotions',
        beforeBar: 'Bon contrôle',
        afterBar: 'Gestion déficiente',
        maxPoints: 50,
    },
    estime: {
        title: 'Estime de soi',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
    energie: {
        title: 'Énergie',
        beforeBar: 'Niveau faible',
        afterBar: 'Niveau élevé',
        maxPoints: 50,
    },
};
