import styles from './search.module.scss'
import iconSearch from "../../assets/img/211818_search_icon.svg"
import iconExit from "../../assets/img/4781838_cancel_close_delete_exit_logout_icon.svg"
import { useState, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'

function Search({setSearchValue}) {
  const [searchValueLocal, setSearchValueLocal] = useState('')
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 250), [])

  function onChangeInput(event) {
    setSearchValueLocal(event.target.value)
    updateSearchValue(event.target.value)
  }

  const inputRef = useRef()
  function cleanSearchValue() {
    setSearchValue('')
    setSearchValueLocal('')
    inputRef.current.focus()
  }
  return(
    <div className={styles.root}> 
      <img className={styles.iconSearch} src={iconSearch} />
      <input 
        className={styles.input} 
        placeholder='Поиск'
        value={searchValueLocal} 
        ref={inputRef}
        onChange={(e)=>onChangeInput(e)}
      />
      {searchValueLocal&&<img className={styles.iconExit} onClick={() => cleanSearchValue()} src={iconExit}/>}
    </div>
    
  )
} 

export default Search