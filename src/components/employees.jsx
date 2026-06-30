import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function Employees() {


    const {data: employees, isLoading} = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
          let query = supabase.from('empleados').select('*');
          
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
                        <th>Nombre Completo</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.nombre_completo}</td>
                            <td>{employee.cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Employees;