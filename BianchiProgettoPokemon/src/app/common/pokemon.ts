import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";

export class Pokemon
{
    id: number = 0; //order
    name: string = 'MissingNo';
    category: string = 'Missing Number Pokemon';
    generation: number = 0;

    basePath: string = '../assets/images';
    imageNotAvailable = '/utility/pokeball-icon.png';

    officialArtworkDefault: string = this.imageNotAvailable;
    officialArtworkShiny: string = this.imageNotAvailable;

    pixelFrontDefault: string = this.imageNotAvailable;
    pixelFrontShiny: string = this.imageNotAvailable;
    pixelBackDefault: string = this.imageNotAvailable;
    pixelBackShiny: string = this.imageNotAvailable;

    pokedexNumber: number = 0; //id

    height: number = 0; // metri
    weight: number = 0; // kilogrammi

    type1: string = 'bird';
    type2: string = 'bird';

    hp: number = 0;
    attack: number = 0;
    defense: number = 0;
    specialAttack: number = 0;
    specialDefense: number = 0;
    speed: number = 0;

    forms: any[] = [];
    isDefault: boolean = true;
    pokemonVarieties: Pokemon[] = [];

    entries: string[] = [];

    constructor(id: number, name: string, category: string, generation: number, pokedexNumber: number, pixelFrontDefault: any, pixelFrontShiny: any,
        pixelBackDefault: any, pixelBackShiny: any, officialArtworkDefault: any, officialArtworkShiny: any,
        height: number, weight: number, types: any, stats: any[], forms: any[], isDefault: boolean, entries: string[], pokedex: PokedexService)
    {
        // ===> GENERIC
        this.id = id;
        this.name = name;
        this.pokedexNumber = pokedexNumber;
        this.forms = forms;
        this.height = height/10;
        this.weight = weight/10;
        this.isDefault = isDefault;
        this.category = category;
        this.generation = generation;
        this.entries = entries;

        this.basePath = pokedex.basePath;
        this.imageNotAvailable = this.basePath + pokedex.imageNotAvailable;


        // ===> STATS
        for (let index = 0; index < stats.length; index++)
        {
            switch(stats[index].stat.name)
            {
                case 'hp': this.hp = stats[index].base_stat; break;
                case 'attack': this.attack = stats[index].base_stat; break;
                case 'defense': this.defense = stats[index].base_stat; break;
                case 'special-attack': this.specialAttack = stats[index].base_stat; break;
                case 'special-defense': this.specialDefense = stats[index].base_stat; break;
                case 'speed': this.speed = stats[index].base_stat; break;
            }
        }


        // ===> TYPES
        this.type1 = types[0].type.name;

        if (types.length == 2)
            this.type2 = types[1].type.name;
        else
            this.type2 = 'bird';
        
        
        // ===> ARTWORK & SPRITES

               
        // OFFICIAL - DEFAULT
        if (officialArtworkDefault == null)
            this.officialArtworkDefault = pokedex.imageNotAvailable;
        else
            this.officialArtworkDefault = officialArtworkDefault;
        
        // OFFICIAL - SHINY
        if (officialArtworkShiny == null)
            this.officialArtworkShiny = this.officialArtworkDefault;
        else
            this.officialArtworkShiny = officialArtworkShiny;

        // FRONT - DEFAULT
        if (pixelFrontDefault == null)
            this.pixelFrontDefault = this.officialArtworkDefault;
        else
            this.pixelFrontDefault = pixelFrontDefault;
        
        // BACK - DEFAULT
        if (pixelBackDefault == null)
            this.pixelBackDefault = this.pixelFrontDefault;
        else
            this.pixelBackDefault = pixelBackDefault;
        
        // FRONT - SHINY
        if (pixelFrontShiny == null)
            this.pixelFrontShiny = this.pixelBackDefault;
        else
            this.pixelFrontShiny = pixelFrontShiny;
        
        // BACK - SHINY
        if (pixelBackShiny == null)
            this.pixelBackShiny = this.pixelFrontShiny;
        else
            this.pixelBackShiny = pixelBackShiny;
        
    }


    // EQUALS => ID
    equals(pokemon: Pokemon): boolean
    {
        if (pokemon == null || pokemon == undefined || pokemon.id != this.id)
            return false;
        else
            return true;
    }

}
