const productos = [
    { id: 1, name: "Antivirus Cuántico 2026", price: 2500, img: "🛡️", desc: "Protección contra IA rebelde." },
    { id: 2, name: "Nodo de Red Inteligente", price: 8900, img: "📡", desc: "5G con auto-reparación." },
    { id: 3, name: "Firewall Industrial G-8", price: 12400, img: "🔥", desc: "Grado militar para plantas." },
    { id: 4, name: "Sniffer de Intrusos", price: 1500, img: "🕵️", desc: "Detección temprana en tiempo real." }
];

let carrito = JSON.parse(localStorage.getItem('cart')) || [];

// --- Autenticación ---
function handleLogin() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === 'admin' && p === '123') {
        localStorage.setItem('session', 'active');
        initApp();
    } else {
        alert("Credenciales incorrectas");
    }
}

function handleLogout() {
    localStorage.removeItem('session');
    location.reload();
}

// --- Renderizado ---
function initApp() {
    if(localStorage.getItem('session')) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        renderProductos();
        renderCarrito();
    }
}

function renderProductos() {
    const grid = document.getElementById('lista-productos');
    grid.innerHTML = productos.map(p => `
        <div class="card-prod animate-pop">
            <div class="card-img">${p.img}</div>
            <div style="padding:15px;">
                <h3 style="margin:0">$${p.price.toLocaleString()}</h3>
                <p style="color:#666">${p.name}</p>
                <button onclick="addToCart(${p.id})" class="btn-primary">Agregar al carrito</button>
            </div>
        </div>
    `).join('');
}

function renderCarrito() {
    const list = document.getElementById('items-carrito');
    list.innerHTML = carrito.map((item, index) => `
        <div class="cart-item animate-pop" style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <b>$${item.price}</b>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-precio').innerText = `$${total.toLocaleString()}`;
}

function addToCart(id) {
    const p = productos.find(x => x.id === id);
    carrito.push(p);
    localStorage.setItem('cart', JSON.stringify(carrito));
    renderCarrito();
}

function finalizarCompra() {
    if(carrito.length === 0) return;
    alert("¡Pedido procesado con éxito!");
    carrito = [];
    localStorage.removeItem('cart');
    renderCarrito();
}

// Ejecutar al cargar
initApp();
