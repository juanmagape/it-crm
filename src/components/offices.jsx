import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function Offices() {

    const {data: sedes, isLoading, isError, error} = useQuery({
        queryKey: ['sedes'],
        queryFn: async () => {
          let query = supabase.from('sedes').select('*, responsable:empleados!responsable_id(nombre_completo)');          
          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando oficinas...</p>
    
    if (isError) return <p>Error de base de datos: {error.message}</p>

    return (
        <div>
            <h1>Offices</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Rango IP</th>
                        <th>Esquema de Red</th>
                        <th>Fecha de Creación</th>
                        <th>Responsable</th>
                    </tr>
                </thead>
                <tbody>
                    {sedes?.map(sede => (
                        <tr key={sede.codigo}>
                            <td>{sede.codigo}</td>
                            <td>{sede.nombre}</td>
                            <td>{sede.ubicacion}</td>
                            <td>{sede.rango_ip}</td>
                            <td>{sede.esquema_red}</td>
                            <td>{sede.creado_en}</td>
                            <td>{sede.responsable?.nombre_completo || 'Sin responsable asignado'}</td>            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Offices;