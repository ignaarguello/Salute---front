import React from 'react'
import './CardTailwind.css'
import { useDispatch, useSelector } from "react-redux";
import productosActions from '../../redux/actions/productosActions'
import { useEffect } from 'react';


export default function CardTailwind(props) {

    let {nombre, img, tipo, precio, href} = props

    const dispatch = useDispatch();
    const { traer_productos } = productosActions
    const { productos } = useSelector(store => store.productos)

    useEffect(() => {
        dispatch(traer_productos())
    }, [])

    console.log(productos)


    return (
        <div id='container-general__CardTailwind'>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                    <img
                                        src={img}
                                        alt={nombre}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {nombre}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{tipo}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{precio}$</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
