//  import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loading from './Loading';
import Toast from './Toast';
import {ALERT_TYPES} from '../redux/actions/alertActions'

const Alert = () => {
    const { auth, alert } = useSelector(state => state);
    const dispatch = useDispatch();

    const close = () => {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {},
            
        });
        console.log('este es el estado de error',dispatch().payload());
    }

    console.log("estado de Alert:", alert); 

    return (
        <div>
            {alert.loading && <Loading />}
            {console.log("resultado de  error alert",alert.error)}
            {alert.error && <Toast msg={{ title: 'Error', body: alert.error }} bgColor="red" handleShow={close} />}
            {alert.success && <Toast msg={{ title: 'Success', body: alert.success }} bgColor="green" handleShow={close} />}
        </div>
    )
}

export default Alert
