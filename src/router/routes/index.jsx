import { privateRoutes } from './privateRoutes';
import Mainlayout from '../../layout/Mainlayout';
import ProtectRoute from './ProtectRoute';

export const getRoutes = () => {

    privateRoutes.map(r=>{
       r.element = <ProtectRoute route={r} >{r.element}</ProtectRoute>
    })

    return {
        path : '/',
        element : <Mainlayout />,
        children : privateRoutes
    }
}