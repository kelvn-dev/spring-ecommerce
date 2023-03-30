import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
 
const RouteGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
   }

   return hasJWT() ? <Outlet/> : <Navigate to="/auth"/>

  //  return (
  //      <Route {...rest}
  //          render={props => (
  //              hasJWT() ?
  //                  <Outlet/>
  //                  :
  //                  <Navigate to={{ pathname: '/auth' }} />
  //          )}
  //      />
  //  );
};
 
export default RouteGuard;