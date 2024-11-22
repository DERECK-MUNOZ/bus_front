import React, { useEffect, useState } from 'react';
import { fetchBuses } from '../api';
import './styles.css'; 

interface Bus {
    id: number;
    numeroBus: string;
    placa: string;
    fechaCreacion: string;
    características: string;
    marca: {
        nombre: string;
    };
    activo: boolean;
}

const BusTable: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(5); // Tamaño de página
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadBuses = async () => {
            setLoading(true);
            try {
                const data = await fetchBuses(page, size);
                setBuses(data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBuses();
    }, [page, size]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1>Lista de Buses</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Número de Bus</th>
                            <th>Placa</th>
                            <th>Fecha de Creación</th>
                            <th>Marca</th>
                            <th>Activo</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buses.map((bus) => (
                            <tr key={bus.id}>
                                <td>{bus.id}</td>
                                <td>{bus.numeroBus}</td>
                                <td>{bus.placa}</td>
                                <td>{new Date(bus.fechaCreacion).toLocaleDateString()}</td>
                                <td>{bus.marca.nombre}</td>
                                <td>{bus.activo ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button onClick={() => alert(`Bus ID: ${bus.id}, Número: ${bus.numeroBus}`)}>
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page <= 0}>
                    Anterior
                </button>
                <button onClick={() => handlePageChange(page + 1)}>Siguiente</button>
            </div>
        </div>
    );
};

export default BusTable;
