import { Component, EventEmitter, Output } from '@angular/core';
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
  selectedPokemon: Pokemon | null = null;

  generation: number = 1;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  game: string = '2';

  parameter: string = 'generation';

  datiDisponibili: boolean;
  cambioForma: boolean;

  tmp: number = 0;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex | Home');
    this.generation = 1;
    this.game = '2';
    this.getPokemonByGeneration();
    this.datiDisponibili = false;
    this.cambioForma = false;
  }


  modificaPokemon(pokemon: Pokemon | null)
  {
    this.selectedPokemon = pokemon;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  changeOption()
  {
    console.log('Scelta: ' + this.parameter);

    if (this.parameter == 'favourites')
    {
      this.pokedex.reloadFavouriteList();
    }

    this.getPokemonByGeneration();

    this.modificaPokemon(null);
  }


  deleteAllFavourites()
  {
    this.pokedex.clearFavouriteList();
    this.getPokemonByGeneration();
    this.datiDisponibili = true;
  }


  reloadList()
  {
    this.changeOption();
  }

  
  reloadFavourite()
  {
    if (this.parameter == 'favourites')
    {
      this.changeOption();
    }
  }


  getPokemonByGeneration()
  {
    this.setSelectionTitle();

    this.pokemonList = [];
    this.datiDisponibili = false;
    this.tmp = 0;

    if (this.parameter == 'favourites')
    {
      let favouriteList = this.pokedex.getFavouritePokemonList();

      console.log(favouriteList);

      this.tmp = favouriteList.length;
  
      if (this.tmp == 0)
      {
        console.log('The favourite list is blank!');
        this.datiDisponibili = true;
      }
      else
      {
        favouriteList.forEach(pokemonName => {
          this.pokedex.getPokemonSpecies('' + pokemonName).subscribe (
            (data: any) => {
              console.log(data);
              let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
              this.pokemonList.push(pokemon);
              console.log(pokemon);

              this.checkCompletation();
            },
            (error: any) => {
              this.tmp -= 1;
            }
          );
        });
      }
    }
    else
    {
      let observable;

      if (this.parameter == 'generation')
      {
        if (this.generation == 0) {
          observable = this.pokedex.getAllPokemonSpecies();
        }
        else {
          observable = this.pokedex.getPokemonByGeneration('' + this.generation);
        }
      }
      else
      {
        observable = this.pokedex.getPokemonByPokedex('' + this.game);
        console.log('afdhjgtbnkijnbtsyadgkio');
      }
  
      observable.subscribe(
        (data: any) => {
          console.log(data);

          let pokemonSpecList;
          if (this.parameter == 'game-versions') {
            pokemonSpecList = data.pokemon_entries;
          }
          else if (this.generation == 0) {
            pokemonSpecList = data.results;
          }
          else {
            pokemonSpecList = data.pokemon_species;
          }
  
          this.tmp = pokemonSpecList.length;
          console.log(this.tmp);
  
          pokemonSpecList.forEach((pokemon: any) => {

            let observable2;
            if (this.parameter == 'game-versions') {
              observable2 = this.pokedex.getPokemonSpeciesByUrl(pokemon.pokemon_species.url);
            }
            else {
              observable2 = this.pokedex.getPokemonSpeciesByUrl(pokemon.url);
            }

            observable2.subscribe (
              (data: any) => {
                let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
                this.pokemonList.push(pokemon);

                this.checkCompletation();
              },
              (error: any) => {
                this.tmp -= 1;
              }
            )
          });
        },
        (error: any) => {
          console.log('ERROR => Failed search!');
        }
      );
    }

  }


  checkCompletation()
  {
    if (this.tmp == this.pokemonList.length) {
      this.datiDisponibili = true;
      this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);

      if (this.parameter == 'generation' && this.generation == 0) {
        this.pokemonList = this.pokemonList.splice(0, this.pokedex.getLastPokemon());
      }

      console.log(this.pokemonList);
      this.getAllVarieties();
    }
  }


  // Setta tutte le forme alternative di ogni pokemon
  getAllVarieties()
  {
    this.pokemonList.forEach((pokemonSpecie: PokemonSpecies) => {
      pokemonSpecie.setPokemonVarieties(this.pokedex);
    });
  }

  
  setSelectionTitle()
  {
    let title = 'Pokédex | ';

    if (this.parameter == 'generation')
    {
      if (this.generation == 0) {
        title += 'All Generations';
      }
      else {
        title += 'Generation ' + this.generation;
      }
    }
    else if (this.parameter == 'game-versions')
    {
      switch(this.game)
      {
        case '1': title += 'National'; break;
        case '2': title += 'Red, Blue & Yellow'; break;
        case '3': title += 'Gold, Silver & Crystal'; break;
        case '4': title += 'Ruby, Sapphire & Emerald'; break;
        case '5': title += 'Diamond & Pearl'; break;
        case '6': title += 'Platinum'; break;
        case '7': title += 'HeartGold & SoulSilver'; break;
        case '8': title += 'Black & White'; break;
        case '9': title += 'Black 2 & White 2'; break;
        case '11': title += 'Pokemon Conquest'; break;
        case '12': title += 'X & Y (plain)'; break;
        case '13': title += 'X & Y (coast)'; break;
        case '14': title += 'X & Y (mountain)'; break;
        case '16': title += 'Sun & Moon'; break;
        case '21': title += 'UltraSun & UltraMoon'; break;
        case '26': title += 'Let\'s Go Pikachu & Eevee'; break;
        case '27': title += 'Sword & Shield'; break;
        case '28': title += 'Isle of Armoral'; break;
        case '29': title += 'Chrown Tundra'; break;
        case '30': title += 'Legends: Arceus'; break;
      }
    }
    else if (this.parameter == 'favourites')
    {
      title += 'Favourites';
    }
    else
    {
      title += 'Error';
    }

    this.title.setTitle(title);
  }

}
