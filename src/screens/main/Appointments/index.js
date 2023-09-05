import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routesNames } from '../../../services';
import SpecialitySelect from './SpecialitySelect';
import SelectDoctor from './SelectDoctor';
import BookAppointment from './BookAppointment';
import SearchScreen from './SearchScreen';


const _Appointments = createStackNavigator();

const Appointments = () => (
    <_Appointments.Navigator headerMode='none'>
        <_Appointments.Screen name={routesNames.appointmentsSearch} component={SearchScreen} />
        <_Appointments.Screen name={routesNames.selectDoctor} component={SelectDoctor} />
        <_Appointments.Screen name={routesNames.bookYourAppointment} component={BookAppointment} />
    </_Appointments.Navigator>
)

export default Appointments;