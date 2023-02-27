import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Layout.css'

export default function Layout(props) {
    return (
        <>
            <Navbar />
            <div className="content-layout">{props.children}</div>
            <Footer />
        </>
    )
}
