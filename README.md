Descripción del Proyecto
Guía práctica para utilizar la simulación de cajeros

¿Qué hace este programa?
Este programa simula el funcionamiento de varios cajeros bancarios que atienden de manera concurrente a múltiples clientes. Cada cliente realiza una transacción seleccionada previamente, como un depósito, retiro, cobro de remesa o consulta de saldo.

¿Cómo se utiliza?
1. En la parte superior del sistema, encontrarás dos botones desplegables:
  a. Transacción: Elige el tipo de transacción que realizará el cliente.
  b. Cajero: Selecciona el cajero al cual se asignará el nuevo cliente.
2. Haz clic en el botón "Agregar Cliente". El cliente se añadirá a la cola del cajero seleccionado.
3. El cajero procesará automáticamente a cada cliente en orden, mostrando qué cliente está siendo atendido y el resultado de su transacción.

Funcionamiento interno
Cada cajero gestiona su propia cola de clientes y atiende de manera asíncrona usando async/await y temporizadores. Las transacciones tienen una duración simulada entre 4 y 7 segundos. Luego de completar una transacción, el cajero continúa con el siguiente cliente.

Importante
  |Es posible agregar múltiples clientes a diferentes cajeros simultáneamente.
  |El sistema distribuye y atiende las colas de forma autónoma sin intervención del usuario.
  |No es necesario eliminar clientes manualmente, ya que el sistema gestiona automáticamente el avance en la cola.
