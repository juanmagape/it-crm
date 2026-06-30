import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function Inventory() {

        const {data: inventory, isLoading} = useQuery({
        queryKey: ['inventory'],
        queryFn: async () => {
          let query = supabase.from('hardware').select('*, sedes(nombre)');
          
          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando empleados...</p>


    return (
        <div>
            <h1>Inventory</h1>

        <table>
            <thead>
                <tr>
                    <th>Equipo</th>
                    <th>Modelo</th>
                    <th>Nº Serie</th>
                    <th>Estado</th>
                    <th>Oficina</th>
                </tr>
            </thead>
            <tbody>
                {inventory?.map(inv => (
                    <tr key={inv.id}>
                        <td>{inv.numero_equipo}</td>
                        <td>{inv.modelo}</td>
                        <td>{inv.numero_serie}</td>
                        <td>{inv.estado}</td>
                        <td>{inv.sedes?.nombre || 'Sin oficina asignada'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Inventory;