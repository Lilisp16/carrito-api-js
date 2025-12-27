const contenedorProductos = document.getElementById("productos")
const subtotal = document.getElementById("total");


function mostrarProductos(productos){
    contenedorProductos.innerHTML = "";

    productos.forEach((producto, indice) => {
        
        contenedorProductos.innerHTML += `
      <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <img src="${producto.image}" alt="${producto.title}" class="h-40 object-contain mb-4">
        <h4 class="font-semibold text-center">${producto.title}</h4>
        <p class="text-indigo-600 font-bold">$${producto.price}</p>
        <button data-id="${producto.id}" class="btn-agregar mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-fuchsia-500">
          + Agregar al Carrito
        </button>
      </div>
    `;
     
    });



    //se agrega un evento click
    document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const producto = productos.find(p => p.id == id);
        agregarAlCarrito(producto);
  });
});

} 







// se crea la variable vacia para el carrito
let carrito = [];


//se verifica si hay productos en el carrito
const productosCarrito = localStorage.getItem("carrito");
if (productosCarrito){
    carrito = JSON.parse(productosCarrito)
}


//funcion agregar al carrito  (CREATE - UPDATE)
function agregarAlCarrito(producto){
    const existe = carrito.find(item => item.id === producto.id);
    
    if(existe){
        existe.cantidad++;
    }else{
        carrito.push({
            id: producto.id,
            nombre: producto.title,
            precio: Number(producto.price),
            cantidad: 1,

        });
    }
    

    guardarCarrito();
    mostrarCarrito();
    // se Llama a esta función cada vez que se agreguen o se eliminan productos:
    actualizarContador();

}

//funcion guardar productos en el carrito en localStorage

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}




//funcion eliminar producto DELETE
function eliminarProducto(id){
    const producto = carrito.find(item => item.id === id);

    if(producto.cantidad > 1){
        producto.cantidad--;

    }else {
        carrito = carrito.filter(item => item.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarContador(); // <-- Actualiza la burbuja
}




const contenedorCarrito = document.getElementById("carrito");

//funcion para mostrar el contenido del carrito
function mostrarCarrito(){
    contenedorCarrito.innerHTML = "";

    if(carrito.length === 0){
        contenedorCarrito.innerHTML = `
        <p class="text-center text-gray-500 mt-4">Tu carrito está vacío</p>`;

        subtotal.innerHTML = `Subtotal: $0.00`;
        return;
    }

    carrito.forEach((item, index) => {
        contenedorCarrito.innerHTML += `

       <div class="flex items-center justify-between p-2 mb-2 border-b">
  
  <!-- Información del producto -->
  <div class="flex flex-col">
    <p class="font-semibold text-sm">${item.nombre}</p>
    <p class="text-indigo-600 font-bold">$${(item.precio * item.cantidad).toFixed(2)}</p>
  </div>

  <!-- Controles de cantidad -->
  <div class="flex items-center gap-2">
    <button onclick="sumarUnidad(${index})" class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">+</button>
    <p class="text-gray-500 text-sm">${item.cantidad}</p>
    <button onclick="eliminarProducto(${item.id})" class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">-</button>
  </div>

</div>

        `;
    });

    mostrarTotal();

    
}


// Incrementa cantidad de un producto existente en el carrito
function sumarUnidad(index) {
  carrito[index].cantidad++;
  guardarCarrito();
  mostrarCarrito();
  actualizarContador(); // Actualiza la burbuja
}




//funcion calcular total
function mostrarTotal(){
    let total = 0;

    carrito.forEach(item => {
        total += Number(item.precio) * item.cantidad;
    });

    // Mostrar en el HTML subtotal
    subtotal.innerHTML = `Subtotal: $${total.toFixed(2)}`;
}




//vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  localStorage.removeItem("carrito"); // borra del storage
  carrito = [];                       // limpia el array
  mostrarCarrito();                   // actualiza la vista
  actualizarContador();                // actualiza la burbuja de unidades
});



//globito de unidades del carrito



function actualizarContador() {
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contadorCarrito = document.getElementById("contador-carrito");
  contadorCarrito.textContent = totalUnidades;

  // ocultar si es 0
  if(totalUnidades === 0){
    contadorCarrito.style.display = "none";
  } else {
    contadorCarrito.style.display = "flex";
  }
}

