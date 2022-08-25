import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

function FullPizza() {
  const { id } = useParams()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    async function getOnePizza() {
      try{
        const {data} = await axios.get('https://629b5375656cea05fc374b90.mockapi.io/items/' + id)
        console.log(data)
        setPizza(data)
      }catch(e) {
        console.log(e)
      }
    }
    getOnePizza()

  }, [])

  if(!pizza) {
    return 'loading'
  }

  return(
  <div>
    <img src={pizza.imageUrl}/>
    <h2> {pizza.name}</h2>
  </div>

  )
}

export default FullPizza