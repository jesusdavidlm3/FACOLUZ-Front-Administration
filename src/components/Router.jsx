import React, {useContext} from "react";
import { routerContext } from "../context/routerContext";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Home from "../pages/Home";
import DateList from "../pages/DateList";
import History from "../pages/History"
import CurrentDate from '../pages/CurrentDate'

const Router = () => {

    const {view} = useContext(routerContext)

    try {
        switch(view){
            case "Home": return <Home/>
            case "Login": return <Login/>
            default: return <ErrorPage/>
        }
    } catch (err) {
        return <ErrorPage/>
    }
}

export default Router;
