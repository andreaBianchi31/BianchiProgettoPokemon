import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";

export class Pokemon
{
    id: number = 0; //order
    name: string = 'MissingNo';

    officialArtworkDefault: string = '../images/missing-number/missing-number-sprite.png';
    officialArtworkShiny: string = '../images/missing-number/missing-number-sprite.png';

    pixelFrontDefault: string = '../images/missing-number/missing-number-sprite.png';
    pixelFrontShiny: string = '../images/missing-number/missing-number-sprite.png';
    pixelBackDefault: string = '../images/missing-number/missing-number-sprite.png';
    pixelBackShiny: string = '../images/missing-number/missing-number-sprite.png';

    pokedexNumber: number; //id

    height: number; //7 = 0,7 m
    weight: number; //1128 = 112,8 kg

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

    favouritePokemon: Pokemon[] = [];
    

    constructor(id: number, name: string, pokedexNumber: number, sprites: any, pixelFrontDefault: any, pixelFrontShiny: any,
        pixelBackDefault: any, pixelBackShiny: any, officialArtworkDefault: any, officialArtworkShiny: any,
        height: number, weight: number, types: any, stats: any[], forms: any[], isDefault: boolean, pokedex: PokedexService)
    {
        // ===> GENERIC
        this.id = id;
        this.name = name;
        this.pokedexNumber = pokedexNumber;
        this.forms = forms;
        this.height = height/10;
        this.weight = weight/1000;
        this.isDefault = isDefault;


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

        // FRONT - DEFAULT
        if (pixelFrontDefault == null)
            this.pixelFrontDefault = pokedex.imageNotAvailable;
        else
            this.pixelFrontDefault = pixelFrontDefault;
        
        // BACK - DEFAULT
        if (pixelBackDefault == null)
            this.pixelBackDefault = this.pixelFrontDefault;
        else
            this.pixelBackDefault = pixelBackDefault;
        
        // FRONT - SHINY
        if (pixelFrontShiny == null)
            this.pixelFrontShiny = pokedex.imageNotAvailable;
        else
            this.pixelFrontShiny = pixelFrontShiny;
        
        // BACK - SHINY
        if (pixelBackShiny == null)
            this.pixelBackShiny = this.pixelFrontShiny;
        else
            this.pixelBackShiny = pixelBackShiny;
        
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
