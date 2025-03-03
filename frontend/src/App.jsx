// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './components/User/Home/Home'
// import Sandwiches from './components/User/MenuOptions/Sandwiches/Sandwiches'
// import Licuados from './components/User/MenuOptions/Licuados/Licuados'
// import DesayunosMeriendas from './components/User/MenuOptions/DesayunosMeriendas/DesayunosMeriendas'
// import Bebidas from './components/User/MenuOptions/Bebidas/Bebidas'
// import AlmuerzosCenas from './components/User/MenuOptions/AlmuerzosCenas/AlmuerzosCenas'
// import CafeteriaPanaderia from './components/User/MenuOptions/CafeteriaPanaderia/CafeteriaPanaderia'
// import ParaPicar from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/ParaPicar/ParaPicar'
// import Pizzas from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/Pizzas/Pizzas'
// import MilanesasAlPlato from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/MilanesasAlPlato/MilanesasAlPlato'
// import HamburguesaSandwiches from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/HamburguesaSandwiches/HamburguesaSandwiches'
// import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin'
// import Login from './components/Admin/Login/Login'

// function ProtectedRoute({ children }) {
//   const isAuth = localStorage.getItem('auth');
//   return isAuth ? children : <Navigate to="/login" />;
// }
// export default function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route exact path="/sandwiches" element={<Sandwiches />} />
//           <Route exact path="/licuados" element={<Licuados />} />
//           <Route exact path="/desayunos-meriendas" element={<DesayunosMeriendas />} />
//           <Route exact path="/bebidas" element={<Bebidas />} />
//           <Route exact path="/almuerzos-cenas" element={<AlmuerzosCenas />} />
//           <Route exact path="/cafeteria-panaderia" element={<CafeteriaPanaderia />} />
//           <Route exact path="/para-picar" element={<ParaPicar />} />
//           <Route exact path="/pizzas" element={<Pizzas />} />
//           <Route exact path="/al-plato" element={<MilanesasAlPlato />} />
//           <Route exact path="/hamburguesas-y-sandwiches" element={<HamburguesaSandwiches />} />
//           <Route path="/login" element={<Login/>} />
//           <Route exact path="/admin" element={<ProtectedRoute>< HomeAdmin/></ProtectedRoute>}/>
//         </Routes>
//       </div>
//     </Router>
//   )
// }


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/User/Home/Home';
import Sandwiches from './components/User/MenuOptions/Sandwiches/Sandwiches';
import Licuados from './components/User/MenuOptions/Licuados/Licuados';
import DesayunosMeriendas from './components/User/MenuOptions/DesayunosMeriendas/DesayunosMeriendas';
import Bebidas from './components/User/MenuOptions/Bebidas/Bebidas';
import AlmuerzosCenas from './components/User/MenuOptions/AlmuerzosCenas/AlmuerzosCenas';
import CafeteriaPanaderia from './components/User/MenuOptions/CafeteriaPanaderia/CafeteriaPanaderia';
import ParaPicar from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/ParaPicar/ParaPicar';
import Pizzas from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/Pizzas/Pizzas';
import MilanesasAlPlato from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/MilanesasAlPlato/MilanesasAlPlato';
import HamburguesaSandwiches from './components/User/MenuOptions/AlmuerzosCenas/MenuAlmuerzosCena/HamburguesaSandwiches/HamburguesaSandwiches';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import Login from './components/Admin/Login/Login';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sandwiches" element={<Sandwiches />} />
          <Route path="/licuados" element={<Licuados />} />
          <Route path="/desayunos-meriendas" element={<DesayunosMeriendas />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/almuerzos-cenas" element={<AlmuerzosCenas />} />
          <Route path="/cafeteria-panaderia" element={<CafeteriaPanaderia />} />
          <Route path="/para-picar" element={<ParaPicar />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/al-plato" element={<MilanesasAlPlato />} />
          <Route path="/hamburguesas-y-sandwiches" element={<HamburguesaSandwiches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}


