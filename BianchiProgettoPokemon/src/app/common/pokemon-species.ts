import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    id: number = 0;
    name: string = '';
    pokedexNumber: number = 0; //numero pokedex
    isBaby: boolean = false;
    isLegendary: boolean = false;
    isMythical: boolean = false;
    //evolves_from_species: PokemonSpecies;
    //evolution_chain
    flavorTextEntries: string[] = ['', '', '', '', ''];
    formDescriptions: string = ''; //non per tutti i pokemon, opzionale ("NB: descrizione")
    category: string = ''; //genera
    varieties: Pokemon[] = []; //forme alternative
    generation: number = 0;

    arrivati: boolean = false;


    constructor(id: number,
        name: string,
        pokedexNumber: number,
        isBaby: boolean,
        isLegendary: boolean,
        isMythical: boolean,
        flavorTextEntries: string[],
        formDescriptions: string,
        category: string,
        varieties: string[],
        generation: number,
        arrivati: boolean)
    {
        this.id = id;
        this.name = name;
        this.pokedexNumber = pokedexNumber;
        this.isBaby = isBaby;
        this.isLegendary = isLegendary;
    }

    
    equals(pokemon: Pokemon): boolean
    {
        if (pokemon == null || pokemon.id != this.id)
            return false;
        else
            return true;
    }

}
