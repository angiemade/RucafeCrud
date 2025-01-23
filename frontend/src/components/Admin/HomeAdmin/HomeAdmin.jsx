import React from 'react'
import Categorias from '../Categorias/Categorias'
import Subcategorias from '../Subcategorias/Subcategorias'
import Productos from '../Productos/Productos'

function HomeAdmin() {
  return (
    <div>
      <div> <Categorias/> </div>
      <div> <Subcategorias/> </div>
      <div><Productos/></div>
    </div>
  )
}

export default HomeAdmin
