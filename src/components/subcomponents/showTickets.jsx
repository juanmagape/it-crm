import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase"

// Fíjate en la S mayúscula
function ShowTickets() {

    const {data: tickets, isLoading} = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const { data, error } = await supabase
            .from('tickets')
            .select('*');

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando tickets...</p>

    return (
    <ul>
      {tickets?.map(ticket => (
        <li key={ticket.id}>{ticket.asunto} - {ticket.estado}</li>
      ))}
    </ul>
  );
}

export default ShowTickets;