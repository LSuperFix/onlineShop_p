import { useEffect } from 'react'
import { useState } from 'react'
import styles from './pagination.module.scss'

function Pagination( {currentPage, onSetCurrentPage} ) {
  const [massivPagesLineState, setMassivPagesLineState] = useState([])
  let pages = 3
  //const massivPagesLineState = ['<', 1, 2, 3, '>']

  useEffect(() => {
    let massivPagesLine = []
    //massivPagesLine.push('<')
    for(let i = 1; i <= pages; i ++) {
      massivPagesLine.push(i)
    }
    //massivPagesLine.push('>')
    setMassivPagesLineState(...massivPagesLineState, massivPagesLine)
  }, [pages])

  return(
    <div className={styles.root}>
      <ul>
        <li
          onClick={() => currentPage > 1 ? onSetCurrentPage(currentPage - 1) : null}
        >{'<'}</li>
        {massivPagesLineState.map((num, index) => (
        <li key={num+index}
            className = {num && num===currentPage ? styles.active : ''}
            onClick = {() => onSetCurrentPage(num)}
          > {num} </li>)
        )}
        <li
          onClick={() => currentPage < pages ? onSetCurrentPage(currentPage + 1) : null}
        >{'>'}</li>
      </ul>
    </div>
  )
}

export default Pagination