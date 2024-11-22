const username = 'user';  
const password = 'password';  

export const fetchBuses = async (page: number, size: number) => {
    const response = await fetch(`http://localhost:8080/bus?page=${page}&size=${size}`, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)  
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching buses');
    }
    return response.json(); 
};

export const fetchBusById = async (id: number) => {
    const response = await fetch(`http://localhost:8080/bus/${id}`, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
    });
    if (!response.ok) {
        throw new Error('Error fetching bus details');
    }
    return response.json();  
};
