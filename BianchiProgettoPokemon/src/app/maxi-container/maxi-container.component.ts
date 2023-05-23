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
  pokemonList: PokemonSpecies[] = []; //Lista dei pokemon da visualizzare (va in CardContainer)
  selectedPokemon: Pokemon | null = null; //Pokemon scelto

  // =====> GENERATION
  generation: number = 1;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  // =====> GAME VERSION
  game: string = '2'; //NB: non esiste '2'

  // =====> PARAMETRO - FILTRO
  parameter: string = 'generation';

  datiDisponibili: boolean;
  cambioForma: boolean;

  tmp: number = 0;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex | Home');
    this.generation = 1;
    this.game = '2';
    this.getPokemonList();
    this.datiDisponibili = false;
    this.cambioForma = false;
  }


  modificaPokemon(pokemon: Pokemon | null)
  {
    this.selectedPokemon = pokemon;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  //Cambia la lista dei pokemon in base al parametro
  changeOption()
  {
    console.log('Scelta: ' + this.parameter);

    //Se il parametro sono i pokemon preferiti, ricarica la lista dei preferiti guardando il local host
    if (this.parameter == 'favourites')
    {
      this.pokedex.reloadFavouriteList();
    }

    this.getPokemonList();

    this.modificaPokemon(null);
  }


  //Elimina tutti i pokemon preferiti e ricarica la lista delle specie di pokemon
  deleteAllFavourites()
  {
    this.pokedex.clearFavouriteList();
    this.getPokemonList();
    this.datiDisponibili = true;
  }


  //Ricarica la lista delle specie di pokemon, in base al parametro di ricerca
  reloadList()
  {
    this.changeOption();
  }


  //Ricarica la lista delle specie di pokemon, SOLO SE il parametro di ricerca è "favourites"
  reloadFavourite()
  {
    if (this.parameter == 'favourites')
    {
      this.changeOption();
    }
  }


  //Modifica la lista delle specie di pokemon (effettuando richieste GET), in base al parametro di ricerca
  getPokemonList()
  {
    //Modifica il titolo della pagina in base al parametro di ricerca
    this.setSelectionTitle();

    this.pokemonList = [];
    this.datiDisponibili = false;

    //Anche se ci sono errori, funziona lo stesso
    this.tmp = 0;

    // =====> FAVOURITES <=====
    if (this.parameter == 'favourites')
    {
      let favouriteList = this.pokedex.getFavouritePokemonList();

      //console.log(favouriteList);

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
    else // =====> GENERATION & GAME-VERSION <=====
    {
      //Observable per la richiesta GET
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
      }
  
      observable.subscribe(
        (data: any) => {
          //console.log(data);

          //Parametro che rappresenta la lista delle specie pokemon, in base al parametro di ricerca
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
  
          pokemonSpecList.forEach((pokemon: any) => {

            //Observable per la richiesta del singolo pokemon
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


  //Controlla se tutti i pokemon sono stati aggiunti alla lista
  checkCompletation()
  {
    if (this.tmp == this.pokemonList.length) {
      this.datiDisponibili = true;
      this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);

      //Se si stanno cercando TUTTE le specie pokemon di tutte le generazioni, ridimensiona la lista ai primi 905 (esclude la 9 Gen.)
      if (this.parameter == 'generation' && this.generation == 0) {
        this.pokemonList = this.pokemonList.splice(0, this.pokedex.getLastPokemon());
      }

      console.log(this.pokemonList);

      //Setta tutte le forme alternative di tutte le specie di pokemon nella lista
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


  //Imposta il titolo della pagina in base al parametro di ricerca
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
