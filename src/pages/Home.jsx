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
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizza, setItems } from '../redux/slices/pizzaSlice';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import list from '../components/Sort'
import { useRef } from 'react';


function Home() {
  //const [items, setItems] = useState([])
  //const [isLoarding, setIsLoardig] = useState(true)
  //const [it, setIt] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const {items, status} = useSelector(state => state.pizza)

  const list = [
    {name: 'популярности возр.', sortProperty: 'rating'}, 
    {name: 'популярности убыв.', sortProperty: 'rating-'},
    {name: 'цене возр.', sortProperty: 'price'}, 
    {name: 'цене убыв.', sortProperty: 'price-'}, 
    {name: 'алфавиту возр.', sortProperty: 'name'},
    {name: 'алфавиту убыв.', sortProperty: 'name-'}
  ]

  //const [categoryId, setCategoryId] = useState(0);
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const currentPage = useSelector(state => state.filter.currentPage)
  function changeCategory(id) {
    dispatch(setCategoryId(id))
  }

  function onSetCurrentPage(n) {
    dispatch(setCurrentPage(n))
  }
  
  //const [currentPage, setCurrentPage] = useState(1)

  const {searchValue} = useContext(searchContdext)

  const skeleton = [...new Array(6)].map((a,i)=><Skeleton key ={i} />)
  const pizza = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  async function getPizzas() {
    //setIsLoardig(true)
    
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const orderBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc'
    const search = searchValue ? `search=${searchValue}` : ''

    /*axios.get(`https://629b5375656cea05fc374b90.mockapi.io/items?${category}&orderBy=${orderBy}&order=${order}&${search}&page=${currentPage}&limit=4`)
    .then((res) => {
      setItems(res.data)
      setTimeout(()=>setIsLoardig(false), 1000)
    }).catch((err) =>{
      setTimeout(()=>setIsLoardig(false), 1000)
      console.log(err)
    })*/
    /*try {
      const res = await axios.get(`https://629b5375656cea05fc374b90.mockapi.io/items?${category}&orderBy=${orderBy}&order=${order}&${search}&page=${currentPage}&limit=4`)
       setItems(res.data)
       setTimeout(()=>setIsLoardig(false), 1000)
    } catch(err) {
      setTimeout(()=>setIsLoardig(false), 1000)
      alert("ERROR", err)
      console.log("Ошибка при получении пиц")
    }*/
    
    const {data} = await axios.get(`https://629b5375656cea05fc374b90.mockapi.io/items?${category}&orderBy=${orderBy}&order=${order}&${search}&page=${currentPage}&limit=4`)
    /*dispatch(fetchPizza(
      category,
      orderBy,
      order,
      search,
      currentPage
    ))*/  
    dispatch(fetchPizza(data))
    window.scrollTo(0,0)
  }

  //если был первый рендер то проверяем URL параметры и сохраняем их Redux
  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(obj => obj.sortProperty === params.sort)
      console.log({...params, sort})

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])

  //если был первый рейнджер и изменили параметры фильтрации
  useEffect(() => {
    if (isMounted.current) {
      const queryParams = qs.stringify({
        categoryId,
        currentPage,
        sort: sortType.sortProperty
      })
      navigate(`?${queryParams}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, searchValue, currentPage])

  //если был первый рендер то Обращаемся к серверу и запрашиваем пиццы
  useEffect(()=>{
      getPizzas()
      window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  return(
    <div className="container">
      <div className="content__top">
        <Categories categoryId = {categoryId} onChangeCategory = {(id) =>changeCategory(id)}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { status === 'error' ? (<h2>ОШИБКА ЗАГРУЗКИ ПИЦ</h2>) :
         (status === 'loading' ? skeleton : pizza) }
      </div>
      <Pagination currentPage={currentPage} onSetCurrentPage={n => onSetCurrentPage(n)} />
    </div>
  )
}

export default Home