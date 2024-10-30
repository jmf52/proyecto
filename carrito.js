// Inicializar el carrito vacío
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Actualizar el carrito en la página
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const mensajeCarrito = document.getElementById("mensaje-carrito");
    
    listaCarrito.innerHTML = "";
    let totalPrecio = 0;

    carrito.forEach((producto) => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio} MXN`;
        listaCarrito.appendChild(item);
        totalPrecio += producto.precio;
    });

    total.textContent = totalPrecio.toFixed(2);
    
    // Mostrar mensaje si el carrito está vacío
    mensajeCarrito.textContent = carrito.length === 0 ? "Tu carrito está vacío." : "";
}

// Finalizar la compra
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-comprar").addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Compra realizada con éxito!");
            carrito = [];
            actualizarCarrito();
        } else {
            alert("Tu carrito está vacío.");
        }
    });
});
