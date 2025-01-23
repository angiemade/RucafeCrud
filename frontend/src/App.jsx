import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/User/Home/Home'
import Sandwiches from './components/User/MenuOptions/Sandwiches/Sandwiches'
import Licuados from './components/User/MenuOptions/Licuados/Licuados'
import DesayunosMeriendas from './components/User/MenuOptions/DesayunosMeriendas/DesayunosMeriendas'
import Bebidas from './components/User/MenuOptions/Bebidas/Bebidas'
import AlmuerzosCenas from './components/User/MenuOptions/AlmuerzosCenas/AlmuerzosCenas'
import CafeteriaPanaderia from './components/User/MenuOptions/CafeteriaPanaderia/CafeteriaPanaderia'
import ParaPicar from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/ParaPicar/ParaPicar'
import Pizzas from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/Pizzas/Pizzas'
import MilanesasAlPlato from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/MilanesasAlPlato/MilanesasAlPlato'
import HamburguesaSandwiches from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/HamburguesaSandwiches/HamburguesaSandwiches'
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin'


export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sandwiches" element={<Sandwiches />} />
          <Route exact path="/licuados" element={<Licuados />} />
          <Route exact path="/desayunos-meriendas" element={<DesayunosMeriendas />} />
          <Route exact path="/bebidas" element={<Bebidas />} />
          <Route exact path="/almuerzos-cenas" element={<AlmuerzosCenas />} />
          <Route exact path="/cafeteria-panaderia" element={<CafeteriaPanaderia />} />
          <Route exact path="/para-picar" element={<ParaPicar />} />
          <Route exact path="/pizzas" element={<Pizzas />} />
          <Route exact path="/al-plato" element={<MilanesasAlPlato />} />
          <Route exact path="/hamburguesas-y-sandwiches" element={<HamburguesaSandwiches />} />
          <Route exact path="/admin" element={< HomeAdmin/>} />
        </Routes>
      </div>
    </Router>
  )
}
