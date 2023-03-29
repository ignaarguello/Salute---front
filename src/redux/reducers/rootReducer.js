import carritoReducer from './carritoReducer';
import productosReducer from './productosReducer'
import usuariosReducer from './usuariosReducer'
import zonasReducer from './zonasReducer';

const rootReducer = {

        productos: productosReducer,
        usuarios:usuariosReducer,
        zonas: zonasReducer,
        carrito: carritoReducer
};

export default rootReducer 