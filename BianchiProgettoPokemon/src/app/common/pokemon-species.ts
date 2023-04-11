import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    id: number = 0;
    name: string = 'sos';
    pokedexNumber: number = 0; //numero pokedex
    isBaby: boolean = false;
    isLegendary: boolean = false;
    isMythical: boolean = false;
    evolvesFromSpecies: any; // PokemonSpecies
    evolutionChain: PokemonSpecies[] = [];
    flavorTextEntries: string[] = [];
    formDescription: string = ''; //non per tutti i pokemon, opzionale ("NB: descrizione")
    category: string = ''; //genera
    varieties: Pokemon[] = []; //forme alternative
    generation: number = 0;
    //defaultPokemon: Pokemon; //pokemon da mostrare (es. immagine)

    //arrivati: boolean = false;


    /*
    evolvesFromSpecies: any,
    evolutionChain: any,
    varieties: string[],
    */

    constructor(id: number,
        names: any[],
        pokedexNumber: number,
        isBaby: boolean,
        isLegendary: boolean,
        isMythical: boolean,
        flavorTextEntries: any[],
        formDescription: any,
        category: string,
        generation: string,
        pokedex: PokedexService)
    {
        // ===> GENERICS
        this.id = id;
        this.pokedexNumber = pokedexNumber;
        this.isBaby = isBaby;
        this.isLegendary = isLegendary;
        this.isMythical = isMythical;
        this.category = category;


        // ===> NAME
        let nomeTrovato = false;
        for (let index = 0; index < names.length && !nomeTrovato; index++)
        {
            if ((names[index].language.name + '') == pokedex.language) {
                this.name = names[index].name;
                nomeTrovato = true;
            }
        }


        // ===> FORM DESCRIPTION
        if (formDescription == null)
            this.formDescription = 'no-description';
        else
            this.formDescription = formDescription;


        // ===> GENERATION
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
            default: this.generation = 1; break;
        }


        // ===> FLAVOR TEXT ENTRIES
        let entryText = '';
        flavorTextEntries.forEach(entry => {
            if (entry.language != undefined && entry.language != null && entry.language.name == pokedex.language)
            {
                entryText = entry.flavor_text;
                entryText = entryText.replace(/\n/g,' ');
                entryText = entryText.replace(/\f/g,' ');
                entryText = entryText.replace('POKéMON', 'Pokémon');
                entryText = entryText.trim();

                this.flavorTextEntries.push(entryText);
            }
        });


        /*
        // ===> EVOLVES FROM
        if (evolvesFromSpecies == null)
        {
            // setta a nullo
            //this.evolvesFromSpecies = ;
        }
        else
        {
            pokedex.getPokemonSpeciesByUrl(evolvesFromSpecies.url).subscribe (
                (data) => {
                    this.evolvesFromSpecies = new PokemonSpecies(0, '', 0, true, true, true, '', [''], [''], '', '', [''], '', true, pokedex);
                }
            );
        }


        // ===> EVOLUTION CHAIN
        pokedex.getPokemonByEvolutionChain(evolutionChain.url).subscribe (
            (data) => {
                let evolutionList = data.chain.evolves_to;
                let creature: PokemonSpecies;

                evolutionList.forEach((monster: any) => {
                    pokedex.getPokemonSpeciesByUrl(monster.species.url).subscribe (
                        (data: any) => {
                            monster.evolves_to.forEach((other: any) => {
                                pokedex.getPokemonSpeciesByUrl(other.species.url).subscribe (
                                    (data: any) => {
                                        creature = new PokemonSpecies(0, '', 0, true, true, true, '', [''], [''], '', '', [''], '', true, pokedex);
                                        this.evolutionChain.push(creature);
                                    }
                                );
                            });
                            creature = new PokemonSpecies(0, '', 0, true, true, true, '', [''], [''], '', '', [''], '', true, pokedex);
                            this.evolutionChain.push(creature);
                        }
                    );
                });
            }
        );
        
        // varieties => ricerca (pokemon normali, multpli)
        if(this.varieties.length == 0)
        {
            //this.defaultPokemon = httpAssistant.missingNoPokemon;
        }
        else
        {
            //this.defaultPokemon = this.varieties[0];
        }
        
        */
        
    }

    
    equals(pokemon: PokemonSpecies): boolean
    {
        if (pokemon == null || pokemon == undefined || pokemon.id != this.id)
            return false;
        else
            return true;
    }

}
