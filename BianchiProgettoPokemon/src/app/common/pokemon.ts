import { HttpClient } from "@angular/common/http";
import { PokedexService } from "./pokedex.service";

export class Pokemon
{
    id: number = -151; //order
    name: string = 'MissingNo';

    officialArtworkDefault: string = '../images/missing-number/missing-number-normal.jpg';
    officialArtworkShiny: string = '../images/missing-number/missing-number-shiny.jpg';

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
    

    constructor(id: number, name: string, pokedexNumber: number, sprites: any, height: number, weight: number,
        types: any, stats: any[], pokedex: PokedexService)
    {
        // ===> GENERIC
        this.id = id;
        this.name = name;
        this.pokedexNumber = pokedexNumber;
        this.height = height/10;
        this.weight = weight/1000;


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
        if (sprites.front_default == null)
            this.pixelFrontDefault = pokedex.missingNumberSprite;
        else
            this.pixelFrontDefault = sprites.front_default;
        
        // BACK - DEFAULT
        if (sprites.back_default == null)
            this.pixelBackDefault = this.pixelFrontDefault;
        else
            this.pixelBackDefault = sprites.back_default;
        
        // FRONT - SHINY
        if (sprites.front_shiny == null)
            this.pixelFrontShiny = pokedex.missingNumberSprite;
        else
            this.pixelFrontShiny = sprites.front_shiny;
        
        // BACK - SHINY
        if (sprites.back_shiny == null)
            this.pixelBackShiny = this.pixelFrontShiny;
        else
            this.pixelBackShiny = sprites.back_shiny;
        
        // OFFICIAL - DEFAULT
        if (sprites.other['official-artwork'].front_default == null)
            this.officialArtworkDefault = pokedex.missingNumberNormal;
        else
            this.officialArtworkDefault = sprites.other['official-artwork'].front_default;
        
        // OFFICIAL - SHINY
        if (sprites.other['official-artwork'].front_shiny == null)
            this.officialArtworkShiny = pokedex.missingNumberShiny;
        else
            this.officialArtworkShiny = sprites.other['official-artwork'].front_shiny;
        
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
