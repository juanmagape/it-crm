import { create } from "zustand";

export const useAuthStore = create((set) => ({
    perfil: null,
    estaLogueado: false,
    
    iniciarSesion: (datosPerfil) => set({ 
        perfil: datosPerfil, 
        estaLogueado: true 
    }),
  
    cerrarSesion: () => set({ 
        perfil: null, 
        estaLogueado: false
})
}));