"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { CartUpdateContext } from './_context/CartUpdateContext'
import Footer from './_components/Footer'

function Provider({children}) {
  const [updateCart, setUpdateCart] = useState(false);
    return (
      <div>
          <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>
            <div>
              <Header/>
              <Toaster/>
              {children}
              <Footer/>
            </div>
          </CartUpdateContext.Provider>
      </div>
    )
}

export default Provider
