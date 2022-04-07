import App from "./App";
import {Route, Switch} from "react-router-dom";
import React from "react";
import Details from "./components/Details";

export const MAIN_ROUTE = "MAIN_ROUTE";
export const PEOPLE_DETAILS_ROUTE = "PEOPLE_DETAILS_ROUTE";

const routes = [
    {
        id: MAIN_ROUTE,
        path: "/",
        exact: true,
        component: App
    },
    {
        id: PEOPLE_DETAILS_ROUTE,
        path: "/people/:id",
        exact: true,
        component: Details
    }
];

 export const getRouterConfig = id => {
    const route = routes.find(r=> r.id === id);

    if (route) {
        const {component, ...rest} = route;
        return rest;
    }
}

const Routes = () => {
    return (
        <Switch>
            {
                routes.map(route => {
                    const {id, ...props} = route;
                    return <Route key={id} {...props}/>
                })
            }
        </Switch>
    )
}

export default Routes;
