import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase"
import { useState } from "react";

function ShowTickets() {

  const [filtroActivo, setFiltroActivo] = useState('todos')

    const {data: tickets, isLoading, isError, error} = useQuery({
        queryKey: ['tickets', filtroActivo],
        queryFn: async () => {
          let query = supabase.from('tickets').select('*, afectado:empleados!afectado_id(nombre_completo)');
          
          if (filtroActivo !== 'todos') {
            query = query.eq('estado', filtroActivo);
          }
          
          
          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando tickets...</p>

    if (isError) return <p>Error de base de datos: {error.message}</p>


    const FiltroButton = ({ estadoBD, label }) => (
      <button onClick={() => setFiltroActivo(estadoBD)}>
            {label}
      </button>
    );

    const formatearFecha = (fechaIn) => {
    if (!fechaIn) return "Sin fecha"; 
    
    const fecha = new Date(fechaIn);
    
    return fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

    return (

      <>
      <div>
            <FiltroButton estadoBD="todos" label="Todos" />
            <FiltroButton estadoBD="en curso" label="En curso" />
            <FiltroButton estadoBD="espera cliente" label="Pendiente" />
            <FiltroButton estadoBD="resuelto" label="Cerrado" />
        </div>

        <table>
            <thead>
                <tr>
                    <th>Número de ticket</th>
                    <th>Nombre de afectado</th>
                    <th>Asunto</th>
                    <th>Estado</th>
                    <th>Fecha de apertura</th>
                    <th>Última interacción</th>
                </tr>
            </thead>
            <tbody>
                {tickets?.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.numero_ticket}</td>
                        <td>{ticket.afectado?.nombre_completo}</td>
                        <td>{ticket.asunto}</td>
                        <td>
                          {ticket.estado ? ticket.estado.charAt(0).toUpperCase() + ticket.estado.slice(1) : ''}
                        </td>
                        <td>{formatearFecha(ticket.creado_en)}</td>
                        <td>{formatearFecha(ticket.actualizado_en)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  );
}

export default ShowTickets;