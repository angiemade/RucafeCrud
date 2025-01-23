import React from 'react'
import style from './Home.module.scss'
import Header from './Header/Header'
import Carousel from './Carousel/Carousel'
import Menu from './Menu/Menu'
import Footer from './Footer/Footer'



export default function Home() {
    return (
        <div>
          <div className="">
            <Header/>
          </div>
          <div>
            <Carousel/>
          </div>
          <div className={style.buttonMenu}>
            <Menu/>
          </div>
          <div className={style.footer}>
            <Footer/>
          </div>
        </div>
    )
}
