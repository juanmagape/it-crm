function formatearFecha(fechaIn) {
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

export default formatearFecha;