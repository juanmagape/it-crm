import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useState } from "react";


function Inventory() {
    const [filtroActivo, setFiltroActivo] = useState('todos')

    const {data: inventory, isLoading} = useQuery({
        queryKey: ['inventory', filtroActivo],
        queryFn: async () => {
          let query = supabase.from('hardware').select('*, sedes(nombre)');
          
          if (filtroActivo !== 'todos') {
              query = query.eq('tipo', filtroActivo);
          }

          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando inventario...</p>

    const FiltroButton = ({ estadoBD, label }) => (
      <button onClick={() => setFiltroActivo(estadoBD)}>
            {label}
      </button>
    );

    return (
        <div>
            <h1>Inventory</h1>
        
        <div>
            <FiltroButton estadoBD="todos" label="Todos" />
            <FiltroButton estadoBD="Móvil" label="Móvil" />
            <FiltroButton estadoBD="Portátil" label="Portátil" />
            <FiltroButton estadoBD="Periférico" label="Periférico" />
            <FiltroButton estadoBD="Impresora" label="Impresora" />
            <FiltroButton estadoBD="Dock Station" label="Dock Station" />
            <FiltroButton estadoBD="Monitor" label="Monitor" />
            <FiltroButton estadoBD="Tablet" label="Tablet" />
            <FiltroButton estadoBD="Auriculares" label="Auriculares" />
            <FiltroButton estadoBD="Servidor" label="Servidor" />
        </div>
        
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