import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    id: number = 0;
    name: string = '';
    order: number = 0; //numero pokedex
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


    constructor()
    {

    }
}
