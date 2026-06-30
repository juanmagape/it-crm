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

    const estadosUnicos = [...new Set(inventory?.map(inv => inv.tipo).filter(Boolean))];

    return (
        <div>
            <h1>Inventory</h1>
        

            <div>
                <FiltroButton estadoBD="todos" label="Todos" />
                {estadosUnicos.map(estado => (
                    <FiltroButton key={estado} estadoBD={estado} label={estado}></FiltroButton>
                ))}
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
                        <td>{inv.estado ? inv.estado.charAt(0).toUpperCase() + inv.estado.slice(1) : ''}</td>
                        <td>{inv.sedes?.nombre || 'Sin oficina asignada'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Inventory;