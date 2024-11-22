import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBusById } from '../api';

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

const BusDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadBus = async () => {
            try {
                const data = await fetchBusById(Number(id));
                setBus(data);
            } catch (error) {
                console.error('Error fetching bus details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBus();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!bus) {
        return <p>No se encontró el bus.</p>;
    }

    return (
        <div>
            <h1>Detalles del Bus</h1>
            <p><strong>ID:</strong> {bus.id}</p>
            <p><strong>Número de Bus:</strong> {bus.numeroBus}</p>
            <p><strong>Placa:</strong> {bus.placa}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(bus.fechaCreacion).toLocaleDateString()}</p>
            <p><strong>Características:</strong> {bus.características}</p>
            <p><strong>Marca:</strong> {bus.marca.nombre}</p>
            <p><strong>Activo:</strong> {bus.activo ? 'Activo' : 'Inactivo'}</p>
        </div>
    );
};

export default BusDetail;
