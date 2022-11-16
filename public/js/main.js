const socket = io.connect();
// productos

function addproductos() {
  const nombreProducto = document.getElementById('nombreProducto').value;
  const precioProducto = document.getElementById('precioProducto').value;
  const imagenProducto = document.getElementById('imagenProducto').value;

  const nuevoProducto = {
    nombreProducto: nombreProducto,
    precioProducto: precioProducto,
    imagenProducto: imagenProducto
  };

  socket.emit('nuevo-productos', nuevoProducto);
  return false;
}

function render(data) {
  const html = data.map((prod) => {
    return (`
      <tr>
        <td>${prod.nombreProducto}</td>
        <td>${prod.precioProducto}</td>
        <td><img src="${prod.imagenProducto}" alt="${prod.nombreProducto}"/></td>
      </tr>
    `)
  })

  document.getElementById('listaProducto').innerHTML = html;
}

socket.on('productos', function(data) {
  render(data);
});

// chat

function addMessage() {
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;

  const nuevoMensaje = {
    nombre: nombre,
    mensaje: mensaje,
    fecha: new Date().toLocaleString()
  };

  socket.emit('nuevo-mensaje', nuevoMensaje);
  return false;
}

function renderMensajes(data) {
  const html = data.map((elem, index) => {
    return (`
      <div>
        <h4>${elem.nombre}</h4>
        <p>${elem.mensaje}</p>
        <p>${elem.fecha}</p>
      </div>
    `)
  }).join(' ');

  document.getElementById('chat').innerHTML = html;
}

socket.on('mensajes', function(data) {
  renderMensajes(data);
});