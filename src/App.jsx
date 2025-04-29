import { useEffect, useState } from 'react'
import Header from './Header'
import PokemonCard from './PokemonCard'
import Spinner from './ui/Spinner'
import './App.css'

const App = () => {
  const [pokelist, setPokelist] = useState()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(null)
  const [error, setError] = useState(null)

  const filterOptions = [
    {
      name: 'All',
      value: 'all'
    },
    {
      name: 'Fire',
      value: 'fire'
    },
    {
      name: 'Water',
      value: 'water'
    },
    {
      name: 'Grass',
      value: 'grass'
    },
    {
      name: 'Bug',
      value: 'bug'
    },
    {
      name: 'Normal',
      value: 'normal'
    },
    {
      name: 'Flying',
      value: 'flying'
    },
    {
      name: 'Poison',
      value: 'poison'
    },
    {
      name: 'Electric',
      value: 'electric'
    },
  ]

  const getPokemons = async () => {
    setLoading(true)
    try{

      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      const data = await res.json()
      //setPokelist(data.results)
      const pokemonData = data.results.map( async (pokemon) => {
        const response = await fetch(pokemon?.url)
        const json = await response.json()
        return json
      })
      const requiredData = await Promise.all(pokemonData)
      setPokelist(requiredData)
    }
    catch(err){
      console.log(err)
      setError(err)
    }
   // console.log(data?.results)
    setLoading(false)
  }
  console.log(filter)

  const handleFilter = () => {
   const data =  pokelist?.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase())
    })

    if(filter === 'fire'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'fire')
      })
    }
    else if(filter === 'water'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'water')
      })
    }
    else if(filter === 'grass'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'grass')
      })
    }
    else if(filter === 'bug'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'bug')
      })
    }
    else if(filter === 'normal'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'normal')
      })
    }
    else if(filter === 'flying'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'flying')
      })
    }
    else if(filter === 'poison'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'poison')
      })
    }
    else if(filter === 'electric'){
      return data?.filter((pokemon) => {
        return pokemon.types.some((type) => type.type.name === 'electric')
      })
    }
    else if(filter === 'all'){
      return data
    }
    else{
      return data?.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(search.toLowerCase())
      })
    }

    //return data
  } 

  const filteredData = handleFilter()
  console.log(filteredData)

  useEffect(() => {
    getPokemons()
  }, [])
  
  return (
    <>
    {error ? <img alt='no-data' src='https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4369.jpg?w=900' /> :
    
      <div className=' w-[1320px] mx-auto '>
        <Header />
        <div className=' mt-[30px]'>
          <div className=' flex justify-between w-[400px]'>
            <div className=' border-[1px] border-gray-300 h-[35px] w-[200px] ml-[20px] rounded-sm'>
              <input type='text' placeholder='Search pokemon' value={search} onChange={(e) => setSearch(e.target.value)} className=' my-[6px]  text-gray-500 text-sm outline-none border-none pl-[15px] font-medium placeholder:text-gray-500' />          
            </div>

          
            <select className=' cursor-pointer mt-[5px] border-[1px] border-black rounded-md' onChange={(e) => setFilter(e.target.value)} >
              {filterOptions.map((option) => (
                <option key={option.name} className=' cursor-pointer' value={option.value} >{option.name} </option>
              ))}
            </select>
          </div>
          {loading ? <Spinner />
          
           :
          <div className=' flex flex-wrap justify-evenly mt-[20px]'>
              {filteredData?.length ? filteredData.map((pokemon) => (
                <PokemonCard data={pokemon} key={pokemon.id} />

              ))
            :
            <img alt='no-data' src='https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4369.jpg?w=900' />
            }
            </div>
             }
        </div>
      </div>
      }
    </>
  )
}

export default App
