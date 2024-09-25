const BASE_URL = 'https://tu-api-net.com/api'; // Reemplaza con la URL de tu API .NET

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }
    return response.json();
}

// Autenticación
export async function login(username: string, password: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
}

export async function register(username: string, email: string, password: string): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
}

export async function forgotPassword(email: string): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
}

export function logout(): void {
    localStorage.removeItem('token');
}

// Productos
export async function getProducts(): Promise<any[]> {
    return fetchWithAuth(`${BASE_URL}/products`);
}

export async function getProduct(id: number): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/products/${id}`);
}

// Pedidos
export async function getOrders(): Promise<any[]> {
    return fetchWithAuth(`${BASE_URL}/orders`);
}

export async function createOrder(orderData: any): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
}

export async function getOrder(id: number): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/orders/${id}`);
}