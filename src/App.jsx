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
      console.log(requiredData)
      setPokelist(requiredData)
    }
    catch(err){
      console.log(err)
      setError(err)
    }
    finally{
      setLoading(false)
    }
   // console.log(data?.results)
  }
  //console.log(filter)

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
    else if(filter === 'poison'){;
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
    {error ?
    <div className=' w-[100%] h-[100vh]'>
      <img className=' w-[100%] h-[100%]' alt='no-data' src='https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4369.jpg?w=900' />

    </div>
    
    :
    
      <div className=' xl:w-[1278px] lg:w-[1000px] md:w-[780px] sm:w-[500px] w-[310px] mx-auto '>
        <Header />
        <div className=' mt-[30px]'>
          <div className=' flex lg:ml-[50px] md:ml-[35px] sm:ml-[20px] ml-0 md:w-[400px] sm:w-[360px] w-[280px]'>
            <div className=' border-[1px] border-gray-300 h-[35px] sm:w-[200px] w-[160px] sm:ml-[20px] ml-[5px] rounded-sm lg:mr-[30px] ml:mr-[20px] sm:mr-[10px] mr-[5px]'>
              <input type='text' placeholder='Search pokemon' value={search} onChange={(e) => setSearch(e.target.value)} className=' my-[6px]  text-gray-500 text-sm outline-none border-none pl-[15px] font-medium placeholder:text-gray-500' />          
            </div>

          
            <select className=' cursor-pointer w-[85px] pl-[5px] text-gray-500 font-medium text-sm pb-[2px] border-[1px] h-[35px] border-gray-300 outline-none rounded-md' onChange={(e) => setFilter(e.target.value)} >
              {filterOptions.map((option) => (
                <option key={option.name} className=' cursor-pointer font-medium' value={option.value} >{option.name} </option>
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
