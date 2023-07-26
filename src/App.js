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

//Rutas de los 'Payments' de Mercadopago
import PaymentSuccess from './pages/StatusPayment/PaymentSuccess/PaymentSuccess';



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
  console.log(logeado, rol)

  return (
    <Layout>
      <Routes>
        {/* Rutas públicas */}
        <Route path="" element={<Inicio />} />
        <Route path="/productos" element={<Produtos />} />
        <Route path="/nosotros" element={<AcercaDe />} />
        <Route path="/salute-tv" element={<SaluteTV />} />
        <Route path="/zonas-entrega" element={<ZonasEntrega />} />
        <Route path='/ingresar' element={<SignIn />} />
        <Route path='/registrar' element={<SignUp />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        {/* Si el usuario está logeado y es 'usuario común' */}
        <Route element={<ProteccionRutas isAllowed={!!logeado && (rol === "usuario" || rol === "admin")} reDirect={'/'} />}>
          <Route path='/carrito' element={<Carrito />} />
        </Route>
        {/* Si el usuario está logeado y es 'usuario admin' */}
        <Route element={<ProteccionRutas isAllowed={!!logeado && rol === "admin"} reDirect={'/'} />}>
          <Route path='/admin' element={<Admin />} />
        </Route>
      </Routes>
    </Layout>

  );
}

export default App;
