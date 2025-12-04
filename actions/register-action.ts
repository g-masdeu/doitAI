'use server'

import axios from 'axios'
import https from 'https' 

interface RegisterState {
  error?: string | null;
  success?: boolean;
  message?: string | null;
}

export async function registerAction(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validaciones básicas
  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  // Preparamos el objeto EXACTO que pide tu Java (RegisterRequest)
  const registerData = {
    email,
    password,
    nombre: formData.get('nombre'),
    apellidoUno: formData.get('apellidoUno'),
    apellidoDos: formData.get('apellidoDos'),
    telefono: formData.get('telefono'),
    web: formData.get('web'),
    identificador: formData.get('identificador'), // DNI/NIF
    direccion: formData.get('direccion'),
    codigoPostal: formData.get('codigoPostal'),
    localizacion: formData.get('localizacion'),
    
    // Datos de empresa
    empresa: formData.get('empresa'),
    identificadorFiscalEmpresa: formData.get('identificadorFiscalEmpresa'),
    direccionEmpresa: formData.get('direccionEmpresa'),
    codigoPostalEmpresa: formData.get('codigoPostalEmpresa'),
    localizacionEmpresa: formData.get('localizacionEmpresa'),
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    
    // 1. Creamos el agente para ignorar SSL en desarrollo
    const agent = new https.Agent({  
      rejectUnauthorized: false 
    });
    
    // 2. Pasamos el agente en la configuración de Axios (tercer parámetro)
    await axios.post(`${apiUrl}/api/auth/register`, registerData, {
      httpsAgent: agent
    })

    // Si Java devuelve 200 OK
    return { 
        success: true, 
        message: 'Usuario registrado correctamente. Por favor revisa tu correo para activar la cuenta.' 
    }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        // Capturamos el error que devuelve Java
        // A veces es un string directo, a veces un objeto JSON
        const data = error.response.data
        const errorMessage = typeof data === 'string' ? data : (data.message || 'Error al registrar usuario')
        
        return { error: errorMessage }
    }
    return { error: `Error de conexión: ${error}` }
  }
}