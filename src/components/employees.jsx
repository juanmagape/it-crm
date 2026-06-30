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

            {employees?.map(employee => (
                <li key={employee.id}>{employee.nombre_completo} - {employee.cargo}</li>
            ))}
        </div>
    )
}

export default Employees;