import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase"
import { useState } from "react";

function ShowTickets() {

  const [filtroActivo, setFiltroActivo] = useState('todos')

    const {data: tickets, isLoading} = useQuery({
        queryKey: ['tickets', filtroActivo],
        queryFn: async () => {
          let query = supabase.from('tickets').select('*');
          
          if (filtroActivo !== 'todos') {
            query = query.eq('estado', filtroActivo);
          }
          
          
          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando tickets...</p>

    const FiltroButton = ({ estadoBD, label }) => (
      <button onClick={() => setFiltroActivo(estadoBD)}>
            {label}
      </button>
    );

    return (

      <>
      <div>
            <FiltroButton estadoBD="todos" label="Todos" />
            <FiltroButton estadoBD="en curso" label="En curso" />
            <FiltroButton estadoBD="espera cliente" label="Pendiente" />
            <FiltroButton estadoBD="resuelto" label="Cerrado" />
        </div>

      <ul>
      {tickets?.map(ticket => (
        <li key={ticket.id}>{ticket.asunto} - {ticket.estado}</li>
      ))}
      </ul>
    </>
  );
}

export default ShowTickets;