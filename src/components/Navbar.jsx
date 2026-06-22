import { NavLink } from "react-router-dom";

const nav = [
    {to: "/", icon: "", label: "Dashboard"},
    {to: "/offices", icon: "", label: "Oficinas"},
    {to: "/employees", icon: "", label: "Empleados"},
    {to: "/tickets", icon: "", label: "Tickets"},
    {to: "/inventory", icon: "", label: "Inventario"},
    {to: "/employeeportal", icon: "", label: "Portal empleado"}
]

function NavBar() {
    return (
        <div>
            <h1>I.T CRM</h1>

            {nav.map((item) => (
                <NavLink 
                key={item.to}
                to={item.to}>
                    {item.label}
                    </NavLink>
            ))}
        </div>
    )
}

export default NavBar;
