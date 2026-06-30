import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [numeroEmpleado, setNumeroEmpleado] = useState('');
    const [password, setPassword] = useState('');
    const { iniciarSesion } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data: email, error: rpcError } = await supabase
            .rpc('obtener_email_por_numero', { num_empleado: parseInt(numeroEmpleado) });

        if (!email) return alert("Número de empleado no encontrado");

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) return alert("Contraseña incorrecta");

        const { data: perfilData } = await supabase
            .from('empleados')
            .select('id, nombre_completo, es_tecnico')
            .eq('id', authData.user.id)
            .single();

        iniciarSesion(perfilData);

        if (perfilData.es_tecnico) {
            navigate('/'); 
        } else {
            navigate('/employeeportal');
        }
    } 

    return (
        <form onSubmit={handleLogin}>
            <h2>Acceso Login</h2>

            <input 
                type="number"
                value={numeroEmpleado}
                onChange={(e) => setNumeroEmpleado(e.target.value)}
            />

            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit'>Entrar</button>
        </form>
    );
}

export default Login;