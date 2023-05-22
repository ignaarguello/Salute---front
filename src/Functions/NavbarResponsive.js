const navbar_black = () => {
    const navbar = document.querySelector('.Navbar_total')
    navbar?.classList.add('bg-black')
    navbar?.classList.remove('ps_absolute')
}

const navbar_transparent = () => {
    const navbar = document.querySelector('.Navbar_total')
    navbar?.classList.add('ps_absolute')
    navbar?.classList.remove('bg-black')
}

export { navbar_black, navbar_transparent }