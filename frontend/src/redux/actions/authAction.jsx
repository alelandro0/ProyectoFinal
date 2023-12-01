import { postDataApi } from '../../utils/fetchDataApi';
import { ALERT_TYPES } from './alertActions';

export const TYPES = {
  AUTH: 'AUTH',
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataApi('login', data);
    localStorage.setItem('login',true)
    console.log(res);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    console.log('Mensaje de error', error.response.data.msg);
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};


export const refreshToken = () => async (dispatch) => {
  const login = localStorage.getItem('login');
  console.log('este es login enrute', login);

  if (login) {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        loading: true,
      },
      
    });
    try {
      const res = await postDataApi('refresh_token');
      console.log('respuesta del refres_token en auth reducer ', res);
      dispatch({
        type: TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      // Establecer el nuevo token en el almacenamiento local
      // localStorage.setItem('access_token', res.data.access_token);

      dispatch({
        type: TYPES.AUTH,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (error) {
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};
