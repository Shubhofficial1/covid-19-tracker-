import React from 'react'

const List = ({ data }) => {
  return (
    <div className='list'>
      <div className='list__info'>
        <div className={`circle`}></div>
        <h1>{data.Country}</h1>
      </div>
      <h1>{data.TotalConfirmed}</h1>
    </div>
  )
}

export default List
