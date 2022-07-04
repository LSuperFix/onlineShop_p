import styles from './search.module.scss'
import iconSearch from "../../assets/img/211818_search_icon.svg"
import iconExit from "../../assets/img/4781838_cancel_close_delete_exit_logout_icon.svg"

function Search({searchValue, setSearchValue}) {
  return(
    <div className={styles.root}> 
      <img className={styles.iconSearch} src={iconSearch} />
      <input 
        className={styles.input} 
        placeholder='Поиск'
        value={searchValue} 
        onChange={(e)=>setSearchValue(e.target.value)}
      />
      {searchValue&&<img className={styles.iconExit} onClick={()=>setSearchValue('')} src={iconExit}/>}
    </div>
    
  )
} 

export default Search