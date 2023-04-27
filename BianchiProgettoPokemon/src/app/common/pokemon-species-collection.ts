import { Pokemon } from "./pokemon";
import { PokemonSpecies } from "./pokemon-species";

export class PokemonSpeciesCollection
{
    private pokemonSpeciesList: PokemonSpecies[] = [];


    constructor()
    {
    }


    indexOf(pokemonSpecies: PokemonSpecies): number
    {
        for (let index = 0; index < this.pokemonSpeciesList.length; index++)
        {
            if (this.pokemonSpeciesList[index].equals(pokemonSpecies))
            return index;
        }

        return -1;
    }


    contains(pokemonSpecies: PokemonSpecies): boolean
    {
        for (let index = 0; index < this.pokemonSpeciesList.length; index++)
        {
            if (this.pokemonSpeciesList[index].equals(pokemonSpecies))
                return true;
        }

        return false;
    }


    add(pokemonSpecies: PokemonSpecies)
    {
        if (this.indexOf(pokemonSpecies) != -1)
        {
            this.pokemonSpeciesList.push(pokemonSpecies);
            this.sort();
        }
    }


    remove(pokemonSpecies: PokemonSpecies): boolean
    {
        let index = this.indexOf(pokemonSpecies);

        if (index != -1)
        {
            this.pokemonSpeciesList.splice(index, 1);
            return true;
        }
        else
        {
            return false;
        }
    }


    getLength(): number
    {
        return this.pokemonSpeciesList.length;
    }


    getList(): PokemonSpecies[]
    {
        return this.pokemonSpeciesList;
    }


    // BubbleSort
    sort()
    {
        for(let i = 0; i <= this.pokemonSpeciesList.length-1; i++)
        {
            for(let j = 0; j < (this.pokemonSpeciesList.length-i-1); j++)
            {
                if(this.pokemonSpeciesList[j].id > this.pokemonSpeciesList[j+1].id)
                {
                    let tmp = this.pokemonSpeciesList[j];
                    this.pokemonSpeciesList[j] = this.pokemonSpeciesList[j + 1];
                    this.pokemonSpeciesList[j+1] = tmp;
                }
            }
        }

        return this.pokemonSpeciesList;
    }


    containsByName(name: string): boolean
    {
        for (let index = 0; index < this.pokemonSpeciesList.length; index++)
        {
            if (this.pokemonSpeciesList[index].name == name)
                return true;
        }

        return false;
    }

}
