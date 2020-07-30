import React from 'react'
import {connect} from 'react-redux'
import {setFilter} from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = e => {
    const filter = e.target.value
    props.setFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)