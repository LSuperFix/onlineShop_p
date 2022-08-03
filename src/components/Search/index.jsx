import styles from './search.module.scss'
import iconSearch from "../../assets/img/211818_search_icon.svg"
import iconExit from "../../assets/img/4781838_cancel_close_delete_exit_logout_icon.svg"
import { useRef } from 'react'

function Search({searchValue, setSearchValue}) {
  const inputRef = useRef()
  function cleanSearchValue() {
    setSearchValue('')
    inputRef.current.focus()
  }
  return(
    <div className={styles.root}> 
      <img className={styles.iconSearch} src={iconSearch} />
      <input 
        className={styles.input} 
        placeholder='Поиск'
        value={searchValue} 
        ref={inputRef}
        onChange={(e)=>setSearchValue(e.target.value)}
      />
      {searchValue&&<img className={styles.iconExit} onClick={() => cleanSearchValue()} src={iconExit}/>}
    </div>
    
  )
} 

export default Search