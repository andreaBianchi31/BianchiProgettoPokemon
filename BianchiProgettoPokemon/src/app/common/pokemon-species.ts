import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    id: number = -151;
    name: string = 'MissingNo';
    pokedexNumber: number = -151; //numero pokedex
    isBaby: boolean = false;
    isLegendary: boolean = false;
    isMythical: boolean = false;
    evolvesFromSpecies: any; // PokemonSpecies
    evolutionChain: PokemonSpecies[] = [];
    flavorTextEntries: string[] = [];
    formDescription: string = 'This Pokémon species does not exist. This is an error that was not meant to happen.'; //non per tutti i pokemon, opzionale ("NB: descrizione")
    category: string = 'Missing Number pokémon'; //genera
    generation: number = 1;

    varieties: any[] = []; //forme alternative
    pokemonVarieties: Pokemon[] = [];
    defaultPokemon: Pokemon = this.varieties[0]; //pokemon da mostrare (es. immagine)


    /* DA IMPLEMENTARE (non necessari)
    evolvesFromSpecies: Pokemon;
    evolutionChain: Pokemon[];
    varieties: Pokemon[];
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
        varieties: any[],
        pokedex: PokedexService)
    {
        // ===> GENERIC
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
        this.flavorTextEntries = pokedex.getEntryByLanguage(flavorTextEntries, pokedex.language);


        // ===> VARIETIES
        this.varieties = varieties;

        

        /*let entryText = '';
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
        });*/


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
        
        */
        
    }

    
    equals(pokemon: PokemonSpecies): boolean
    {
        if (pokemon == null || pokemon == undefined || pokemon.id != this.id)
            return false;
        else
            return true;
    }


    changeEntries(language: string, pokedex: PokedexService)
    {
        this.flavorTextEntries = pokedex.getEntryByLanguage(this.flavorTextEntries, language);
    }


    setPokemonVarieties(pokedex: PokedexService)
    {
        this.varieties.forEach((variety: any) => {
            pokedex.getPokemonByURL(variety.pokemon.url).subscribe (
                (data) => {
                    let pokemon = new Pokemon(data.id, data.name, this.pokedexNumber, data.sprites, data.height, data.weight, data.types, data.stats, data.forms, pokedex);
                    this.pokemonVarieties.push(pokemon);
                }
            );

            if (this.pokemonVarieties.length == this.varieties.length)
            {
                this.defaultPokemon = this.pokemonVarieties[0];
            }
        });
    }


    setPokemonFormNames(pokedex: PokedexService)
    {
        this.pokemonVarieties.forEach((variety: Pokemon) => {
            console.log(variety.forms);
            variety.forms.forEach((form: any) => {
                pokedex.getPokemonFormByUrl(form.url).subscribe (
                    (data: any) => {
                        let trovato = false;
                        for (let index = 0; index < data.names.length && !trovato; index++)
                        {
                            if (data.names[index].language.name == pokedex.getLanguage())
                            {
                                console.log(data.names[index].name);
                                variety.name = data.names[index].name;
                                trovato = true;
                            }
                        }
    
                        this.defaultPokemon = this.pokemonVarieties[0];
                    }
                ); 
            });
        });
    }

}
