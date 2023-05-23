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

    varieties: any[] = []; //forme alternative (url)
    pokemonVarieties: Pokemon[] = []; //forma alternative (pokemon)
    defaultPokemon: Pokemon = this.varieties[0]; //pokemon di default da mostrare
    defaultPokemonArtwork: string = '../assets/images/utility/pokeball-icon.png';

    preferito: boolean = false;


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
        
    }

    
    equals(pokemon: PokemonSpecies): boolean
    {
        if (pokemon == null || pokemon == undefined || pokemon.pokedexNumber != this.pokedexNumber)
            return false;
        else
            return true;
    }


    //Setta tutte le forme alternative dei pokemon
    setPokemonVarieties(pokedex: PokedexService): Pokemon[]
    {
        //In caso di errori, funziona ugualmente
        let tmp = 0;

        this.varieties.forEach((variety: any) => {
            pokedex.getPokemonByURL(variety.pokemon.url).subscribe (
                (data) => {
                    let pokemon = new Pokemon(data.id, data.name, this.category, this.generation, this.pokedexNumber, data.sprites.front_default, data.sprites.front_shiny, data.sprites.back_default, data.sprites.back_shiny, data.sprites.other['official-artwork'].front_default, data.sprites.other['official-artwork'].front_shiny, data.height, data.weight, data.types, data.stats, data.forms, data.is_default, this.flavorTextEntries, pokedex);
                    this.pokemonVarieties.push(pokemon);
                    tmp++;

                    // Se tutte le forma alternative sono state completate
                    if (this.pokemonVarieties.length == this.varieties.length)
                    {
                        for (let index = 0; index < this.pokemonVarieties.length; index++)
                        {
                            //Imposta le forme alternative di tutte le varieties uguali
                            this.pokemonVarieties[index].pokemonVarieties = this.pokemonVarieties;

                            //Controllo default pokemon
                            if (this.pokemonVarieties[index].isDefault)
                            {
                                this.defaultPokemon = this.pokemonVarieties[index];
                                this.defaultPokemonArtwork = this.pokemonVarieties[index].officialArtworkDefault;
                            }
                        }

                        //Imposta il nome corretto di tutte le forme
                        this.setPokemonFormNames(pokedex);
                    }
                },
                (error) => {
                    tmp--;
                }
            );
        });

        return this.pokemonVarieties;
    }


    // Setta i nomi corretti di tutte le forme alternative
    setPokemonFormNames(pokedex: PokedexService): Pokemon[]
    {
        //Per tutte le forme alternative della specie...
        this.pokemonVarieties.forEach((variety: any) => {

            //Per tutte le forme del singolo pokemon...
            variety.forms.forEach((form: any) => {

                //Ottiene informazioni sulla forma
                pokedex.getPokemonFormByUrl(form.url).subscribe (
                    (data: any) => {
                        //Se la lista dei nomi è vuota, imposta come nome quello normale ma con la prima lettera maiuscola
                        if (data.names.length == 0)
                        {
                            variety.name = variety.name.charAt(0).toUpperCase() + variety.name.slice(1);
                        }
                        else //Se la lista dei nomi è piena, imposta quello della lingua corretta
                        {
                            let trovato = false;
                            for (let index = 0; index < data.names.length && !trovato; index++) {
                                if (data.names[index].language.name == pokedex.getLanguage()) {
                                    variety.name = data.names[index].name;
                                    trovato = true;
                                }
                            }
                        }

                        /*if (variety.isDefault)
                        {
                            this.defaultPokemon.name = this.name;
                        }*/
                    }
                ); 
            });
        });

        return this.pokemonVarieties;
    }


    //Verifica se questa specie pokemon è preferita
    isPokemonPreferito(pokedex: PokedexService)
    {
        return pokedex.isFavouritePokemonSpecies(this.pokedexNumber);
    }


    //Rimuove tutti i duplicati
    removeDuplicateForms()
    {
        for (let i = 0; i < this.pokemonVarieties.length; i++)
        {
            for (let j = 0; j < this.pokemonVarieties.length; j++)
            {
                if (this.pokemonVarieties[i].equals(this.pokemonVarieties[j]))
                {
                    this.pokemonVarieties.splice(j, 1);
                }
            }
        }
    }

}
