import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    //missingNo: PokemonSpecies; (-151)

    id: number = 0;
    name: string = '';
    pokedexNumber: number = 0; //numero pokedex
    isBaby: boolean = false;
    isLegendary: boolean = false;
    isMythical: boolean = false;
    evolvesFromSpecies: PokemonSpecies[] = [];
    evolutionChain: PokemonSpecies[] = [];
    flavorTextEntries: string[] = ['', '', '', '', ''];
    formDescription: string = ''; //non per tutti i pokemon, opzionale ("NB: descrizione")
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
        evolvesFromSpecies: any,
        evolutionChain: string[],
        flavorTextEntries: string[],
        formDescription: string,
        category: string,
        varieties: string[],
        generation: string,
        arrivati: boolean,
        httpAssistant: HttpClient)
    {


        this.id = id;
        this.name = name;
        this.pokedexNumber = pokedexNumber;
        this.isBaby = isBaby;
        this.isLegendary = isLegendary;
        this.isMythical = isMythical;
        
        // evolvesFrom => ricerca (specie unica)

        if (evolvesFromSpecies == null)
        {
            // setta a nullo
            //this.evolvesFromSpecies = ;
        }
        else
        {
            httpAssistant.get(evolvesFromSpecies).subscribe(
                (data) => {

                }
            );
        }

        // evolutionChian => ricerca (multiple species)

        // flavor text entries => fare un vettore con tutte

        this.formDescription = formDescription;
        this.category = category;
        
        // varieties => ricerca (pokemon normali, multpli)

        switch(generation)
        {
            case 'generation-i': this.generation = 1; break;
            case 'generation-ii': this.generation = 2; break;
            case 'generation-iii': this.generation = 3; break;
            case 'generation-iv': this.generation = 4; break;
            case 'generation-v': this.generation = 5; break;
            case 'generation-vi': this.generation = 6; break;
            case 'generation-vii': this.generation = 7; break;
            case 'generation-viii': this.generation = 8; break;
            case 'generation-ix': this.generation = 9; break;
        }
    }

    
    equals(pokemon: Pokemon): boolean
    {
        if (pokemon == null || pokemon.id != this.id)
            return false;
        else
            return true;
    }

}
