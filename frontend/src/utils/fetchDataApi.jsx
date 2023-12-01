import axios from 'axios'

export const getDataApi = async (url, token) =>{
    const res= await axios.get(`http://localhost:3003/api/${url}`,{
        headers :{Authorization : token}
    })
   return res;
}
export const postDataApi = async (url, post, token) => {
    try {
        const apiUrl = `http://localhost:3003/api/${url}`;
        const res = await axios.post(apiUrl, post, {
            headers: { Authorization: token }
        });
        return res;  // Devolver el objeto de respuesta completo
    } catch (error) {
        console.error("Error en postDataApi:", error.response);
        throw error; 
    }
};

export const putDataApi = async (url,post, token) =>{
    console.log('URL de la solicitud 3:', `/api/${url}`);
    const res= await axios.put(`http://localhost:3003/api/${url}`,post,{
        headers :{Authorization : token}
    })
   return res;
}
export const patchDataApi = async (url,post, token) =>{
    console.log('URL de la solicitud 4:', `/api/${url}`);
    const res= await axios.patch(`http://localhost:3003/api/${url}`,post,{
        headers :{Authorization : token}
    })
   return res;
}

export const deleteDataApi = async (url, token) =>{
    const res= await axios.delete(`http://localhost:3003/api/${url}`,{
        headers :{Authorization : token}
    })
   return res;
}
