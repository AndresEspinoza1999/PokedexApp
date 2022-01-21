import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'
import PokemonDetails from './components/PokemonDetails'
import { render } from '@testing-library/react'

const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=893')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

      })
     
    }
    createPokemonObject(data.results)
    
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="app-contaner">
      <h1>PokeDex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons .sort((a, b) => a.id > b.id? 1 : -1).map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.home.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types.map(type => type.type.name).join(" ")}
            />)}
          
        </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
         
}

export default App;
