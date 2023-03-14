import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Layout.css'
import AutoToTop from '../components/AutoToTop/AutoToTop'

export default function Layout(props) {
    return (
        <>
            <AutoToTop />
            <Navbar />
            <div className="content-layout">{props.children}</div>
            <Footer />
        </>
    )
}
