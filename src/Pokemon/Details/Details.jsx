import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { PokeColors } from '../components/Constants';
import EvolutionTree from '../components/EvolutionTree';

const Details = () => {
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState(null)
  const [type, setType] = useState("normal")
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchPokedata = async () => {
    try {
      setloading(true)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const jData = await response.json();
      setdata(jData)
      setloading(false)
      setType(jData?.types[0]?.type?.name)


    } catch (error) {
      setloading(false)
      navigate('/404');
    }

  }

  useEffect(() => {
    fetchPokedata();
  }, [id])

  return (
    <div>
      {!loading && data && data.id ?
        <div className='detailsContainer'>
          <div className={`contain type-${type}`} >
            {/* <h1 style={{ backgroundColor: color, borderTopLeftRadius: '28px', borderTopRightRadius: '28px' }} >PokeDex Data</h1> */}
            <h1 className='pokemonName'>{data.name}</h1>

            {/* <img className='detailsimg' src={data['sprites']['other']['dream_world']['front_default'] || '/question.png'} alt="" /> */}

            <div className={`neon-wrapper `}>
              <div className={`neon-circle type-${type}`}></div>
              <img
                className="pokemon-img"
                src={data?.sprites?.other?.dream_world?.front_default || '/question.png'}
                alt={data?.name}
              />
            </div>

            <div className="center">
              <div className="left">
                <h3>Basic Info</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>ID :  </td>
                      <td> #{data.id}</td>
                    </tr>

                    <tr>
                      <td>Type :  </td>
                      <td> {data['types'].map((types, index) => <span style={{ backgroundColor: PokeColors[type] }} key={index} className='types'>{types['type']['name']}</span>)}</td>
                    </tr>

                    <tr>
                      <td>Height :  </td>
                      <td> {data.height}</td>
                    </tr>

                    <tr>
                      <td>Weight :  </td>
                      <td>{data.weight}</td>
                    </tr>

                  </tbody>
                </table>

              </div>

              <div className="right">
                <h3>Abilities</h3>

                <div className="abilities">
                  {data['abilities'].map((abilities, index) => <p key={index} className='abilities'>{abilities.ability['name']}</p>)}

                </div>
              </div>
            </div>

            <div className="stats">
              <h3>Base Stats:</h3>
              {data.stats.map((stat, i) => (
                <div key={i} className='statWrapper'>
                  <div className='statContent'>
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                  </div>
                  <div
                    style={{
                      background: "#eee",
                      width: "60%",
                      height: 10,
                      borderRadius: 5,
                      overflow: "hidden",
                      margin: "0.3rem 0",
                    }}
                  >
                    <div
                      style={{
                        width: `${stat.base_stat}%`,
                        background: PokeColors[type],
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>


            <h3 className='movesHeading'>Moves</h3>
            <div className="moves">
              {data['moves'].splice(0, 50).map((moves, index) => <span key={index} className='moves-span' style={{ backgroundColor: PokeColors[type] }}>{moves['move']['name']}</span>)}
            </div>
          </div>


          <div className={`evolution-data-container type-${type}`}>
            <h2 className='pokemonName'>Evolution Chain</h2>
            <EvolutionTree pokemonId={data?.id} />
          </div>


        </div>
        : <Loader />}
    </div>
  )
}

export default Details
