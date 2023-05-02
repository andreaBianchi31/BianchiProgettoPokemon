import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokedexService } from '../common/pokedex.service';
import { PokemonSpecies } from '../common/pokemon-species';
import { Pokemon } from '../common/pokemon';

@Component({
  selector: 'app-maxi-container',
  templateUrl: './maxi-container.component.html',
  styleUrls: ['./maxi-container.component.css']
})
export class MaxiContainerComponent
{
  pokemonList: PokemonSpecies[] = [];
  selectedPokemon!: Pokemon;

  generation: number = 1;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  game: number = 1;

  parameter: string = 'generation';

  datiDisponibili: boolean;
  cambioForma: boolean;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex - Home');
    this.generation = 1;
    this.game = 1;
    this.getPokemonByGeneration();
    this.datiDisponibili = false;
    this.cambioForma = false;
  }


  getPokemonByGeneration()
  {
    if (this.generation == 0)
    {
      console.log('Searching pokemon of All Generations...');
      this.title.setTitle('Pokédex - All Generations');

      this.pokemonList = [];
      this.datiDisponibili = false;

      let dati = this.pokedex.getAllPokemonSpecies().subscribe (
        (data) => {
            this.pokemonList = [];
            let pokemonSpeciesList = data.results;

            pokemonSpeciesList.forEach((pokemon: any, index: number) => {
                this.pokedex.getPokemonSpeciesByUrl(pokemon.url).subscribe(
                  (data: any) => {
                    let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
                    this.pokemonList.push(pokemon);

                    if (pokemonSpeciesList.length == this.pokemonList.length)
                    {
                      this.datiDisponibili = true;
                      this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);
                      this.pokemonList = this.pokemonList.splice(0, this.pokedex.lastPokemonNumber);
                      console.log(this.pokemonList);
                      this.getAllVarieties();
                    }
                  }
                )
            });
        },
        (error) => {
          console.log('Failed search!');
        }
      );
    }
    else
    {
      console.log('Searching pokemon of Generation ' + this.generation + '...');
      this.title.setTitle('Pokédex - Generation ' + this.generation);

      this.pokemonList = [];
      this.datiDisponibili = false;

      let dati = this.pokedex.getPokemonByGeneration('' + this.generation).subscribe (
        (data) => {
            this.pokemonList = [];
            let pokemonSpeciesList = data.pokemon_species;

            pokemonSpeciesList.forEach((pokemon: any) => {
              this.pokedex.getPokemonSpeciesByUrl(pokemon.url).subscribe(
                (data: any) => {
                  let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
                  this.pokemonList.push(pokemon);

                  if (pokemonSpeciesList.length == this.pokemonList.length)
                  {
                    this.datiDisponibili = true;
                    this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);
                    console.log(this.pokemonList.length + ' pokemon species found!');
                    console.log(this.pokemonList);
                    this.getAllVarieties();
                  }
                }
              )
            });
        },
        (error) => {
          console.log('Failed search!');
        }
      );
    }
  }


  // Setta tutte le forme alternative di ogni pokemon
  getAllVarieties()
  {
    this.pokemonList.forEach((pokemonSpecie: PokemonSpecies) => {
      pokemonSpecie.setPokemonVarieties(this.pokedex);
    });

  }


  getPokemonByGameVersion()
  {
    let tmp = 'Pokédex - ';
    if (this.game == 1)
    tmp += 'National';
    console.log(this.game);
    /*
    switch(this.game) {
      case 1: tmp += 'National'; break;
      case 2: tmp += 'Red | Blue | Yellow'; console.log(tmp); break;
      case 3: tmp += 'Gold | Silver | Crystal'; break;
      case 4: tmp += 'Ruby | Sapphire | Emerald'; break;
      case 5: tmp += 'Diamond | Pearl'; break;
      case 6: tmp += 'Platinum'; break;
      case 7: tmp += 'HeartGold | SoulSilver'; break;
      case 8: tmp += 'Black | White'; break;
      case 9: tmp += 'Black 2 | White 2'; break;
      case 11: tmp += 'Pokemon Conquest'; break;
      case 12: tmp += 'X | Y (plain)'; break;
      case 13: tmp += 'X | Y (coast)'; break;
      case 14: tmp += 'National'; break;
      case 15: tmp += 'National'; break;
      case 16: tmp += 'Sun | Moon'; break;
      case 21: tmp += 'UltraSun | UltraMoon'; break;
      case 26: tmp += 'Let\'s Go Pikachu | Eevee'; break;
      case 27: tmp += 'Sword | Shield'; break;
      case 28: tmp += 'Isle of Armoral'; break;
      case 29: tmp += 'Chrown Tundra'; break;
      case 30: tmp += 'Legends: Arceus'; break;
      default: tmp += this.game; break;
    }*/
    this.title.setTitle(tmp);

    this.pokemonList = [];
    this.datiDisponibili = false;

    let dati = this.pokedex.getPokemonByPokedex('' + this.game).subscribe (
      (data) => {
          this.pokemonList = [];
          let pokemonSpeciesList = data.pokemon_entries;

          pokemonSpeciesList.forEach((pokemon: any, index: number) => {
              this.pokedex.getPokemonSpeciesByUrl(pokemon.pokemon_species.url).subscribe(
                (data: any) => {
                  let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
                  this.pokemonList.push(pokemon);

                  if (pokemonSpeciesList.length == this.pokemonList.length)
                  {
                    this.datiDisponibili = true;
                    this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);

                    if (this.game == 1) {
                      this.pokemonList = this.pokemonList.splice(0, this.pokedex.lastPokemonNumber);
                    }

                    console.log(this.pokemonList);
                    this.getAllVarieties();
                  }
                }
              )
          });
      },
      (error) => {
        console.log('Failed search!');
      }
    );
  }


  getPokemonByFavourites()
  {
    console.log('Searching your favourite Pokémon...');
    this.title.setTitle('Pokédex - Favourites');

    this.pokemonList = [];
    this.datiDisponibili = false;

    let favoruiteList = this.pokedex.getFavouritePokemonList();

    favoruiteList.forEach(pokemonName => {
      this.pokedex.getPokemonSpecies('' + pokemonName).subscribe (
        (data: any) => {
          console.log(data);
          let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
          this.pokemonList.push(pokemon);

          if (favoruiteList.length == this.pokemonList.length)
          {
            this.datiDisponibili = true;
            this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);

            console.log(this.pokemonList);
            this.getAllVarieties();
          }
        },
        (error) => {
          console.log('Failed search!');
        }
      );
    });
  }


  modificaPokemon(pokemon: Pokemon)
  {
    this.selectedPokemon = pokemon;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  changeOption()
  {
    console.log('Scelta: ' + this.parameter);

    switch(this.parameter)
    {
      case 'generation':
        this.getPokemonByGeneration();
        break;
      case 'game-versions':
        this.getPokemonByGameVersion();
        break;
      case 'favourites':
        this.pokedex.reloadFavouriteList();
        this.getPokemonByFavourites();
        break;
    }
  }


  deleteAllFavourites()
  {
    this.pokedex.clearFavouriteList();
    this.getPokemonByFavourites();
  }

}
