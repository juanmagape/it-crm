import ShowTickets from "./subcomponents/showTickets";
import CrearTicket from "./subcomponents/CrearTicket";

function Tickets() {
        return (
        <div>
            <h1>Tickets</h1>
            
            <CrearTicket />
            <ShowTickets />
        </div>
    )
}

export default Tickets;