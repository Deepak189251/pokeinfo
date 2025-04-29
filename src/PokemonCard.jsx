
const PokemonCard = ({data}) => {
    //console.log(data)
    const types = data.types.map((type) => type.type.name)
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1)
    //console.log(types)
  return (
    <div className=" w-[310px] h-[300px] border-[1px] border-gray-300 pt-[5px] px-[10px] m-[7px]">
        <p className=" ">{data.id}</p>
        <img className=" w-[200px] h-[200px] mx-auto mt-[2px]" src={data.sprites.other.dream_world.front_default} />
        <p className=" text-xl font-semibold mt-[5px]">{name}</p>
        <p className=" text-base font-semibold">{types.join(", ")}</p>
    </div>
  )
}

export default PokemonCard