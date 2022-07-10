import React from 'react'
import List from './List/List'
import Bottom from './Bottom'
import Inputer from './Tops/Inputer'

class Body extends React.Component {
  render () {
    return (
      <>
        <Inputer></Inputer>
        <List></List>
        <Bottom></Bottom>
      </>
    )
  }
}
export default Body
