import React from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import GetCarsAvailableToUser  from '../user/GetCarsAvailableToUser';
import CarDetails from '../user/CarDetails';
import AllUsers from '../admin/AllUsers';
import AllCars from '../admin/AllCars';
import Transactions from '../admin/Transactions';
import AddCar from '../admin/AddCar';
import EditCar from '../admin/EditCar';

import PrivateRoutes from './privateRoutes';
import { Route } from 'react-router-dom';

function Routes(){
    return(
        <>
            <Route exact path={'/register/admin'} component={Register} />
            <Route exact path={'/register/user'} component={Register} />
            <Route exact path={'/login/admin'} component={Login} />
            <Route exact path={'/login/user'} component={Login} />

            <Route exact path={'/user/show-cars-available'} component={GetCarsAvailableToUser} />
            <Route exact path={`/user/car-details/:id`} component={CarDetails} />
            <Route exact path={'/admin/all-users'} component={AllUsers} />
            <Route exact path={'/admin/all-cars'} component={AllCars} />
            <Route exact path={'/admin/transactions'} component={Transactions} />
            <Route exact path={'/admin/add-car'} component={AddCar} />
            <Route exact path={'/admin/edit-car/:id'} component={EditCar} />
        </>
    )
}

Routes.propTypes = {

}

export default Routes;
