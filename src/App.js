import './App.css';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import usuariosActions from './redux/actions/usuariosActions';
import { useDispatch, useSelector } from 'react-redux'

//Importacion de componentes de pagina
import Inicio from './pages/Inicio/Inicio'
import Produtos from './pages/Productos/Productos'
import AcercaDe from './pages/AcercaDe/AcercaDe'
import SaluteTV from './pages/SaluteTV/SaluteTV'
import ZonasEntrega from './pages/ZonasEntrega/ZonasEntrega'
import Admin from './pages/Admin/Admin';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Carrito from './pages/Carrito/Carrito';
import ProteccionRutas from './components/ProteccionRutas/ProteccionRutas'



function App() {
  //*Variable de acciones de usuarios y Dispatch
  let dispatch = useDispatch()
  const { ingreso_token } = usuariosActions
  const { rol, logeado } = useSelector(store => store.usuarios)

  //? Use Effect para Sign-in con Token
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      dispatch(ingreso_token(token.token.user))
    }
  }, [])
  console.log('propiedad logeado',logeado)
  console.log('propiedad rol',rol)
  

  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<Inicio />}></Route>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/productos" element={<Produtos />}></Route>
        <Route path="/nosotros" element={<AcercaDe />}></Route>
        <Route path="/salute-tv" element={<SaluteTV />}></Route>
        <Route path="/zonas-entrega" element={<ZonasEntrega />}></Route>
        <Route path='/ingresar' element={<SignIn />}></Route>
        <Route path='/registrar' element={<SignUp />}></Route>
        {/* //? Si el usuario esta logeado y es 'usuario comun' */}
        <Route element={<ProteccionRutas isAllowed={logeado === true && rol === "usuario"} reDirect={"/"} />}>
          <Route path='/carrito' element={<Carrito />}></Route>
        </Route>
        {/* //? Si el usuario esta logeado y es 'usuario comun' */}
        <Route element={<ProteccionRutas isAllowed={logeado === true && rol === "admin"} reDirect={"/"} />}>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/carrito' element={<Carrito />}></Route>
        </Route>
      </Routes>
    </Layout>

  );
}

export default App;
