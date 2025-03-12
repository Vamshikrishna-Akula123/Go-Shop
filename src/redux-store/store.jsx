import { configureStore } from "@reduxjs/toolkit";
import CartSlice from '../redux-slicer/slicer.jsx'


export default configureStore(
    {
        reducer: { Cart : CartSlice }
    }
)