import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase"
import { useState } from "react";

function CrearTicket() {

    const [asunto, setAsunto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [clasificacion, setClasificacion] = useState('software');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (nuevoTicket) => {
            const { data, error} = await supabase
            .from('tickets')
            .insert([nuevoTicket])
            .select()

            if(error) throw new Error(error.message);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tickets']});

            setAsunto('');
            setDescripcion('');
            alert("Ticket creado")
        },
        onError: (error) => {
            alert("Error: " + error.message)
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!asunto.trim() || !descripcion.trim()) return alert("Tienes que rellenar todos los campos")

        const { data: { user } } = await supabase.auth.getUser();

        mutation.mutate({
            asunto: asunto,
            descripcion: descripcion,
            estado: 'nuevo',
            afectado_id: user.id,
            clasificacion: clasificacion
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2>Abrir Nuevo Ticket</h2>

            <div>
                <label>Asunto</label>
                <input 
                    type="text" 
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Ej: La pantalla parpadea"
                />
            </div>

            <div>
                <label>Clasificación</label>
                <select 
                    value={clasificacion}
                    onChange={(e) => setClasificacion(e.target.value)}
                >
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                    <option value="red">Redes / Internet</option>
                    <option value="accesos">Accesos / Contraseñas</option>
                </select>
            </div>

            <div>
                <label>Descripción del problema</label>
                <textarea 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Detalla lo que ocurre..."
                />
            </div>


            <button 
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? 'Guardando...' : 'Enviar Ticket'}
            </button>
        </form> 
        </div>
    )
}

export default CrearTicket;