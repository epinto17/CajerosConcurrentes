class Cliente {
  constructor(nombre) {
    this.nombre = nombre;
  }

  depositar() {
    return `${this.nombre} realizó un Depósito.`;
  }

  retirar() {
    return `${this.nombre} realizó un Retiro.`;
  }

  cobrarRemesa() {
    return `${this.nombre} realizó un Cobro de Remesa.`;
  }

  consultarEstadoCuenta() {
    return `${this.nombre} consultó su cuenta.`;
  }
}

let selectedAccion = "depositar";
let selectedCajero = "cajero1";
let contadorClientes = 1;

const cajeros = {
  cajero1: { queue: [], busy: false, num: 1 },
  cajero2: { queue: [], busy: false, num: 2 },
  cajero3: { queue: [], busy: false, num: 3 },
};

function transaccionAleatoria(cliente) {
  const acciones = [
    "depositar",
    "retirar",
    "cobrarRemesa",
    "consultarEstadoCuenta",
  ];
  const accion = acciones[Math.floor(Math.random() * acciones.length)];
  const monto = Math.floor(Math.random() * 1000) + 1;

  switch (accion) {
    case "depositar":
      return cliente.depositar(monto);
    case "retirar":
      return cliente.retirar(monto);
    case "cobrarRemesa":
      return cliente.cobrarRemesa(monto);
    case "consultarEstadoCuenta":
      return cliente.consultarEstadoCuenta();
  }
}

async function cajero(clientes, logId, time, caId) {
  const log = document.getElementById(logId);
  const h1Div = document.getElementById(caId);

  h1Div.innerHTML = '<h1 class="card-title pricing-card-title">'+time/1000+'<small class="text-muted fw-light">/s</small></h1>';

  for (const cliente of clientes) {
    await new Promise((resolve) =>
      setTimeout(() => {
        const resultado = transaccionAleatoria(cliente);
        const mensaje = `${resultado}`;
        const li = document.createElement("li");
        li.textContent = mensaje;
        log.appendChild(li);
        log.scrollTop = log.scrollHeight;
        resolve();
      }, time)
    );
  }
}

const clientes1 = [new Cliente("Carlos", 500), new Cliente("Ana", 1200)];
const clientes2 = [new Cliente("Luis", 800), new Cliente("Sofía", 300)];
const clientes3 = [new Cliente("Miguel", 1000)];


async function iniciarSimulacion() {
  await Promise.all([
    cajero(clientes1, "log1", 8000, "ca-1"),
    cajero(clientes2, "log2", 10000, "ca-2"),
    cajero(clientes3, "log3", 4000, "ca-3"),
  ]);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-iniciar")
    .addEventListener("click", function () {
      iniciarSimulacion();
    });
});