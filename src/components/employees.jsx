import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function Employees() {


    const {data: employees, isLoading} = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
          let query = supabase.from('empleados').select('*, sede:sedes!sede_id(nombre)');
          
          const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data;
        }
    })

    if (isLoading) return <p>Cargando empleados...</p>



    return (
        <div>
            <h1>Employees</h1>

            <table>
                <thead>
                    <tr>
                        <th>Número de empleado</th>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Departamento</th>
                        <th>Sede</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.numero_empleado}</td>
                            <td>{employee.nombre_completo}</td>
                            <td>{employee.email}</td>
                            <td>{employee.cargo}</td>
                            <td>{employee.departamento}</td>
                            <td>{employee.sede?.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Employees;