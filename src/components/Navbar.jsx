import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; 

function NavBar() {
    const { perfil } = useAuthStore();

    if (!perfil) return null;

    return (
        <div >
            <h1 >I.T CRM</h1>
            <p >Hola, {perfil.nombre_completo}</p>

            <div >
                <NavLink to="/employeeportal" >Portal Empleado</NavLink>

                {perfil.es_tecnico && (
                    <>
                        <NavLink to="/" >Dashboard</NavLink>
                        <NavLink to="/tickets" >Tickets</NavLink>
                        <NavLink to="/inventory" >Inventario</NavLink>
                    </>
                )}
            </div>
        </div>
    )
}

export default NavBar;