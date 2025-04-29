import {
     useState } from "react";

export default function useLocalStorage(initialState,key){
    const[value,setValue]=useState(function(){
        const storedValue=localStorage.getItem(key)
        return storedValue? JSON.parse(storedValue):initialState
    })
    return[value,setValue]
}