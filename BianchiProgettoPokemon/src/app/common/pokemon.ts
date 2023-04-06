export class Pokemon
{
    name: string;
    description: string;
    id: number;
    pokedexNumber: number;
    forms: Pokemon[];
    category: string; //genera
    generation: string;

    healthPoints: number;
    attack: number;
    defence: number;
    speed: number;
    specialAttack: number;
    specialDefence: number;

    type1: string;
    type2: string;

    isBaby: boolean;
    isLegendary: boolean;
    isMythical: boolean;

    evolutionChain: string;
    flavorText: string;
    description: string;


    constructor(name: string, description: string,
        id: number,
        pokedexNumber: number,
        forms: Pokemon[],
        category: string,
        generation: string,
        healthPoints: number,
        attack: number,
        defence: number,
        speed: number,
        specialAttack: number,
        specialDefence: number,
        type1: string,
        type2: string,
        isLegendary: boolean,
        isMythical: boolean)
        {
            this.name = name;
            this.description = description;
            this.id = id;
            this.pokedexNumber = pokedexNumber;
            this.forms = forms;
            this.category = category;
            this.generation = generation;

            this.healthPoints = healthPoints;
            this.attack = attack;
            this.defence = defence;
            this.speed = speed;
            this.specialAttack = specialAttack;
            this.specialDefence = defence;

            this.type1 = type1;
            this.type2 = type2;

            this.isLegendary = isLegendary;
            this.isMythical = isMythical;
        }
}