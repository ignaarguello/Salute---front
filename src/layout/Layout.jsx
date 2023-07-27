import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Layout.css'
import AutoToTop from '../components/AutoToTop/AutoToTop'
import CarritoBoton from '../components/CarritoBoton/CarritoBoton'
import { useSelector } from 'react-redux'


export default function Layout(props) {
    const { logeado } = useSelector(store => store.usuarios)

    return (
        <>
            <AutoToTop />
            <Navbar />
            <div className="content-layout">{props.children}</div>
            {logeado &&
                <CarritoBoton />
            }
            <Footer />
        </>
    )
}
