
const PokemonCard = ({data}) => {
    //console.log(data)
    const types = data.types.map((type) => type.type.name)
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
    //console.log(types)
  return (
    <div className=" lg:w-[280px] md:w-[245px] sm:w-[220px] w-[145px] lg:h-[280px] md:h-[260px] sm:h-[240px] h-[220px] border-[1px] border-gray-300 pt-[5px] px-[10px] sm:m-[7px] m-[4px]">
        <p className=" ">{data.id}</p>
        <img className=" lg:w-[200px] md:w-[180px] sm:w-[165px] w-[120px] lg:h-[180px] md:h-[165px] h-[120px] mx-auto mt-[2px]" alt="pokemonimage" src={data.sprites.other.dream_world.front_default} />
        <p className=" sm:text-xl text-base font-semibold mt-[5px]">{name}</p>
        <p className=" sm:text-base text-sm font-semibold">{types.join(", ")}</p>
    </div>
  )
}

export default PokemonCard