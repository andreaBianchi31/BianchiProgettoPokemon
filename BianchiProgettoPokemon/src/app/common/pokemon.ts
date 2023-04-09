import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";

export class Pokemon
{
    id: number;
    name: string;
    officialArtworkNormal: string;
    officialArtworkShiny: string;
    
    /*

    pokedexNumber: number;

    height: number; //7 = 0,7 m
    weight: number; //1128 = 112,8 kg

    type1: string;
    type2: string;

    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;

    varieties: Pokemon[];
    pokemonSpecies: PokemonSpecies;
    speciesName: string;
    speciesURL: string;

    officialArtworkDefault: string;
    officialArtworkShiny: string;

    pixelFrontDefault: string;
    pixelFrontShiny: string;
    pixelBackDefault: string;
    pixelBackShiny: string;
    
    */

    constructor(id: number, name: string, officialArtworkNormal: string, officialArtworkShiny: string)
    {
        this.id = id;
        this.name = name;
        this.officialArtworkNormal = officialArtworkNormal;
        this.officialArtworkShiny = officialArtworkShiny;
    }


    // EQUALS => ID
    equals(pokemon: Pokemon): boolean
    {
        if (pokemon == null || pokemon.id != this.id)
            return false;
        else
            return true;
    }

    
    equalsName(pokemon: Pokemon): boolean
    {
        if (pokemon == null || pokemon.name != this.name)
            return false;
        else
            return true;
    }


    /* EQUALS => specie (ID)
    equalsSpecies(pokemon: Pokemon): boolean
    {
        if (pokemon == null || !pokemon.pokemonSpecies.equals(this.pokemonSpecies))
            return false;
        else
            return true;
    }*/
}
