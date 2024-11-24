import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets' 

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}));   // create a new entry if product id is not available in our cartItem...
        }
        else {
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))  // if product item is avilable this else will increase the quantity... 
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))  // this will decrease the quantity if product item is availale...
    }

    useEffect(()=> {
        console.log(cartItems);
    },[cartItems]);  // when the cartItems get updated we will log the changes 

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;