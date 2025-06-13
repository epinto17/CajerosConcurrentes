document.addEventListener("DOMContentLoaded", () => {
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

  function realizarTransaccion(cliente) {
    switch (cliente.accion) {
      case "depositar":
        return cliente.depositar();
      case "retirar":
        return cliente.retirar();
      case "cobrarRemesa":
        return cliente.cobrarRemesa();
      case "consultarEstadoCuenta":
        return cliente.consultarEstadoCuenta();
      default:
        return "Acción desconocida.";
    }
  }

  function $(id) {
    return document.getElementById(id);
  }

  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function limpiarTextoAtencion(num) {
    $(`atendiendo${num}`).textContent = " ";
  }

  document.querySelectorAll("#dropdownAccion a").forEach((a) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      selectedAccion = a.dataset.accion;
      $("btn-accion").textContent = a.textContent;
    });
  });

  document.querySelectorAll("#dropdownCajero a").forEach((a) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      selectedCajero = a.dataset.cajero;
      $("btn-cajero").textContent = a.textContent;
    });
  });

  $("btn-agregar").addEventListener("click", () => {
    const cliente = new Cliente(`Cliente ${contadorClientes++}`);
    cliente.accion = selectedAccion;
    cajeros[selectedCajero].queue.push(cliente);
    actualizarColaUI(selectedCajero);
    atenderSiguiente(selectedCajero);
  });

  async function atenderSiguiente(id) {
    const cajero = cajeros[id];
    if (cajero.busy || cajero.queue.length === 0) return;

    cajero.busy = true;
    const cliente = cajero.queue.shift();
    actualizarColaUI(id);

    const num = cajero.num;
    $(`atendiendo${num}`).textContent = `Atendiendo: ${cliente.nombre}`;

    const servicio = Math.floor(Math.random() * 5000) + 3000;
    await esperar(servicio);

    const resultado = realizarTransaccion(cliente);
    $(`atendiendo${num}`).textContent = resultado;

    await esperar(1000);
    limpiarTextoAtencion(num);

    cajero.busy = false;
    atenderSiguiente(id);
  }

  function actualizarColaUI(id) {
    const num = cajeros[id].num;
    const ul = $(`queue${num}`);
    ul.innerHTML = "";
    cajeros[id].queue.forEach((cliente, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${cliente.nombre}`;
      ul.appendChild(li);
    });
  }
});