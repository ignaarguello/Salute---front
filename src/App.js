import './App.css';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

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


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/*" element={<Inicio />}></Route>
        <Route path="/productos" element={<Produtos />}></Route>
        <Route path="/nosotros" element={<AcercaDe />}></Route>
        <Route path="/salute-tv" element={<SaluteTV />}></Route>
        <Route path="/zonas-entrega" element={<ZonasEntrega />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/ingresar' element={<SignIn />}></Route>
        <Route path='/registrar' element={<SignUp />}></Route>
        <Route path='/carrito' element={<Carrito />}></Route>
      </Routes>
    </Layout>

  );
}

export default App;
