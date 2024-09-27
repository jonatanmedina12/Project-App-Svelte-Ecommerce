import { authStore } from '$lib/stores/auth';
import { get } from 'svelte/store';

const BASE_URL = "http://localhost:5131/api";
const Url_login = "Auth";
const url_product = "Product";
const Url_orden = "Order";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
    const { token } = get(authStore);
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        if (response.status === 401) {
            authStore.logout();
        }
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }
    return response.json();
}
export async function forgotPassword(email: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/${Url_login}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process forgot password request');
    }
    return response.json();
}

// Autenticación
export async function login(username: string, password: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/${Url_login}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    authStore.login(data.token, { username });
    return data;
}

export async function register(username: string, email: string, password: string): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${Url_login}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
}

export function logout(): void {
    authStore.logout();
}

// Productos
export async function getProducts(): Promise<any[]> {
    return fetchWithAuth(`${BASE_URL}/${url_product}/TraerProductos`);
}

export async function getProduct(id: number): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${url_product}/BuscarProducto/${id}`);
}

export async function createProduct(productData: any): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${url_product}/CrearProducto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
}

export async function updateProduct(id: number, productData: any): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${url_product}/ActualizarProducto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
}

export async function deleteProduct(id: number): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${url_product}/EliminarProducto/${id}`, {
        method: 'DELETE'
    });
}

// Pedidos
export async function getOrders(): Promise<any[]> {
    return fetchWithAuth(`${BASE_URL}/${Url_orden}/TraerOrdenes`);
}

export async function getOrder(id: number): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${Url_orden}/BuscarOrden/${id}`);
}

export async function createOrder(orderData: any): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${Url_orden}/CrearOrden`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
}

export async function updateOrder(id: number, orderData: any): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${Url_orden}/ActualizarOrden/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
}

export async function deleteOrder(id: number, customerEmail: string): Promise<any> {
    return fetchWithAuth(`${BASE_URL}/${Url_orden}/EliminarOrden/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, customerEmail })
    });
}