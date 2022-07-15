import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton'
import pizzas from '../assets/db.json'
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useContext } from 'react';
import { searchContdext } from '../App';
import {useSelector, useDispatch} from 'react-redux'
import { setCategoryId, setSortType } from '../redux/slices/filterSlice'

function Home() {
  const [items, setItems] = useState([])
  const [isLoarding, setIsLoardig] = useState(true)

  //const [categoryId, setCategoryId] = useState(0);
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const dispatch = useDispatch()
  function changeCategory(id) {
    dispatch(setCategoryId(id))
  }
  
  const [currentPage, setCurrentPage] = useState(1)

  const {searchValue} = useContext(searchContdext)

  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const orderBy = sortType.sortProperty.replace('-', '')
  const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc'
  const search = searchValue ? `search=${searchValue}` : ''

  const skeleton = [...new Array(6)].map((a,i)=><Skeleton key ={i} />)
  const pizza = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  console.log(currentPage)
  useEffect(()=>{
    setIsLoardig(true)
    fetch(`https://629b5375656cea05fc374b90.mockapi.io/items?${category}&orderBy=${orderBy}&order=${order}&${search}&page=${currentPage}&limit=4`)
    .then((res)=>res.json())
    .then((data)=>setItems(data))
    setTimeout(()=>setIsLoardig(false), 1000)
  }, [categoryId, sortType, searchValue, currentPage])
  return(
    <div className="container">
      <div className="content__top">
        <Categories categoryId = {categoryId} onChangeCategory = {(id) =>changeCategory(id)}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { isLoarding ? skeleton : pizza }
      </div>
      <Pagination currentPage={currentPage} onSetCurrentPage={n => setCurrentPage(n)} />
    </div>
  )
}

export default Home