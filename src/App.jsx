import React, {useContext} from "react";
import {routerContext} from './context/routerContext';
import Router from './components/Router';
import LatPanel from './components/LatPanel';
import ContextProvider from './context/ContextProvider';
import DateContextProvider from "./context/DateContextProvider";
import HistoryContextProvider from "./context/HistoryContextProvider";

const App = () => {

    const {view} = useContext(routerContext)

    return(
        <ContextProvider>
            <div className="Root">
                {view != "Login" && <LatPanel/>}
                <HistoryContextProvider>
                <DateContextProvider>
                    <Router />
                </DateContextProvider>
                </HistoryContextProvider>
            </div>
        </ContextProvider>
    )
}

export default App;