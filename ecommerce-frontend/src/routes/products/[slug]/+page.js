export async function load({ params }) {
    // Aquí podrías hacer una llamada a una API para obtener los detalles del producto
    // basado en params.slug
    return {
      product: {
        name: `Producto ${params.slug}`,
        price: 29.99,
        description: 'Descripción detallada del producto.'
      }
    };
  }