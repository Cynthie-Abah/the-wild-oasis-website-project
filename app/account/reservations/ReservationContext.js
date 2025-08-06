"use client"

import React, { useState, useContext, createContext  } from 'react'

const ReservationContext  = createContext()

export default function ReservationProvider({children}) {
    
    const initialState = {from: undefined, to: undefined}
    const [range, setRange] = useState(initialState)

    const resetRange =()=>{
        setRange(initialState)
    }

  return (
    <ReservationContext.Provider value={{range, setRange, resetRange}}>{children}</ReservationContext.Provider>
  )
}

export const useReservation = ()=>{
    const context = useContext(ReservationContext)
    if (!context) {
        throw new Error("context was used outside of reservation provider")
    }
    return context
}