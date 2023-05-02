import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";

export class PokemonSpecies
{
    id: number = 0;
    name: string = 'MissingNo';
    pokedexNumber: number = 0; //numero pokedex
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
    defaultPokemonArtwork: string = '../assets/images/utility/pokeball-icon.png';

    preferito: boolean = false;


    /* DA IMPLEMENTARE (non necessari)
    evolvesFromSpecies: Pokemon;
    evolutionChain: Pokemon[];
    varieties: Pokemon[];
    */

    constructor(id: number,
        names: any[],
        pokedexNumbers: any[],
        isBaby: boolean,
        isLegendary: boolean,
        isMythical: boolean,
        flavorTextEntries: any[],
        formDescription: any,
        category: any,
        generation: string,
        varieties: any[],
        pokedex: PokedexService)
    {
        // ===> GENERIC
        this.id = id;
        this.isBaby = isBaby;
        this.isLegendary = isLegendary;
        this.isMythical = isMythical;
        this.category = category;
        this.defaultPokemonArtwork = pokedex.imageNotAvailable;

        
        // ===> FAVOURITE
        if (this.isPokemonPreferito(pokedex))
            this.preferito = true;
        else
            this.preferito = false;


        // ===> NAME
        let trovato = false;
        for (let index = 0; index < names.length && !trovato; index++)
        {
            if ((names[index].language.name + '') == pokedex.getLanguage()) {
                this.name = names[index].name;
                this.name.replace('-', '.');
                trovato = true;
            }
        }


        // ===> FORM DESCRIPTION
        if (formDescription == null)
            this.formDescription = 'no-description';
        else
            this.formDescription = formDescription;


        // ===> CATEGORY
        trovato = false;
        for (let index = 0; index < category.length && !trovato; index++)
        {
            if ((category[index].language.name + '') == pokedex.getLanguage()) {
                this.category = category[index].genus;
                trovato = true;
            }
        }


        // ===> POKEDEX NUMBER
        trovato = false;
        for (let index = 0; index < pokedexNumbers.length && !trovato; index++)
        {
            if ((pokedexNumbers[index].pokedex.name + '') == 'national') {
                this.pokedexNumber = pokedexNumbers[index].entry_number;
                trovato = true;
            }
        }


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
        this.flavorTextEntries = pokedex.getEntryByLanguage(flavorTextEntries, pokedex.getLanguage());


        // ===> VARIETIES
        this.varieties = varieties;


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
        //console.log(pokemon.pokedexNumber + ' - ' + this.pokedexNumber);
        if (pokemon == null || pokemon == undefined || pokemon.pokedexNumber != this.pokedexNumber)
            return false;
        else
            return true;
    }


    changeEntries(language: string, pokedex: PokedexService)
    {
        this.flavorTextEntries = pokedex.getEntryByLanguage(this.flavorTextEntries, language);
    }


    setPokemonVarieties(pokedex: PokedexService): Pokemon[]
    {
        this.varieties.forEach((variety: any) => {
            pokedex.getPokemonByURL(variety.pokemon.url).subscribe (
                (data) => {
                    let pokemon = new Pokemon(data.id, data.name, this.category, this.generation, this.pokedexNumber, data.sprites.front_default, data.sprites.front_shiny, data.sprites.back_default, data.sprites.back_shiny, data.sprites.other['official-artwork'].front_default, data.sprites.other['official-artwork'].front_shiny, data.height, data.weight, data.types, data.stats, data.forms, data.is_default, this.flavorTextEntries, pokedex);
                    this.pokemonVarieties.push(pokemon);
                    //console.log(this.name + ': ' + this.pokemonVarieties.length + ' - ' + this.varieties.length);

                    if (this.pokemonVarieties.length == this.varieties.length)
                    {
                        for (let index = 0; index < this.pokemonVarieties.length; index++)
                        {
                            this.pokemonVarieties[index].pokemonVarieties = this.pokemonVarieties;
                            if (this.pokemonVarieties[index].isDefault)
                            {
                                this.defaultPokemon = this.pokemonVarieties[index];
                                this.defaultPokemonArtwork = this.pokemonVarieties[index].officialArtworkDefault;
                            }
                        }

                        //this.setAllPokemonForms(pokedex);
                        this.setPokemonFormNames(pokedex);
                    }
                }
            );
        });

        return this.pokemonVarieties;
    }


    /* (UNUSED)
    setAllPokemonForms(pokedex: PokedexService)
    {
        let count = this.pokemonVarieties.length;

        this.defaultPokemon.forms.forEach((form: any) => {
            pokedex.getPokemonFormByUrl(form.url).subscribe (
                (data: any) => {
                    pokedex.getPokemonByURL(data.pokemon.url).subscribe (
                        (data2: any) => {
                            let pokemon = new Pokemon(data2.id, data2.name, this.category, this.generation, this.pokedexNumber, data2.sprites.front_default, data2.sprites.front_shiny, data2.sprites.back_default, data2.sprites.back_shiny, data2.sprites.other['official-artwork'].front_default, data2.sprites.other['official-artwork'].front_shiny, data2.height, data2.weight, data2.types, data2.stats, data2.forms, data2.is_default, this.flavorTextEntries, pokedex);
                            this.pokemonVarieties.push(pokemon);
                            //console.log(pokemon);

                            if (this.pokemonVarieties.length == count + (this.defaultPokemon.forms.length))
                            {
                                this.setPokemonFormNames(pokedex);
                            }

                        }
                    )
                }
            );
        });
    }*/


    setPokemonFormNames(pokedex: PokedexService): Pokemon[]
    {
        this.pokemonVarieties.forEach((variety: any) => {
            variety.forms.forEach((form: any) => {
                pokedex.getPokemonFormByUrl(form.url).subscribe (
                    (data: any) => {
                        if (data.names.length == 0) {
                            variety.name = variety.name.charAt(0).toUpperCase() + variety.name.slice(1);
                        }
                        else
                        {
                            let trovato = false;
                            for (let index = 0; index < data.names.length && !trovato; index++) {
                                if (data.names[index].language.name == pokedex.getLanguage()) {
                                    variety.name = data.names[index].name;
                                    trovato = true;
                                }
                            }
                        }

                        if (variety.isDefault)
                        {
                            this.defaultPokemon.name = this.name;
                        }
                    }
                ); 
            });
        });

        return this.pokemonVarieties;
    }


    isPokemonPreferito(pokedex: PokedexService)
    {
        return pokedex.isFavouritePokemonSpecies(this.pokedexNumber);
    }

}
