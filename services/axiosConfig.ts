import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Crear instancia de axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Subido a 30s para tolerar cold starts de Laravel y endpoints con queries
  // pesadas. Sin esto los users veían "timeout exceeded" al primer acceso.
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Aquí puedes agregar tokens de autenticación si los necesitas
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Manejo de errores
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Response Error:', error.response.status, error.response.data);

      switch (error.response.status) {
        case 401:
          // Manejar error de autenticación
          console.error('No autorizado');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error del servidor');
          break;
        default:
          console.error('Error en la petición');
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No response received:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
