// Función asincrónica para obtener y mostrar datos del servidor
async function fetchData() {
    try {
        // Obtenemos los valores de los campos de entrada
        let device = document.getElementById("device").value;
        let order_by = document.getElementById("order").value;
        let lastest1st = document.getElementById("sort-dir").checked == true;
        let limit = document.getElementById("limit").value;
        
        // Hacemos una solicitud al servidor para obtener los datos
        const response = await fetch(
            device != "all"
                ? `https://backend-guml.onrender.com/sensordata/${device}?limit=${limit}&sortby=${order_by}&lastest1st=${lastest1st}`
                : `https://backend-guml.onrender.com/sensordata?limit=${limit}&sortby=${order_by}&lastest1st=${lastest1st}`,
        );
        
        // Convertimos la respuesta a formato JSON
        const data = await response.json();
        
        // Seleccionamos el cuerpo de la tabla donde mostraremos los datos
        const tableBody = document.getElementById("table-body");
        
        // Si hay datos recibidos
        if (data) {
            // Eliminamos los elementos hijos del cuerpo de la tabla para actualizar los datos
            deleteChild(tableBody);
            
            // Iteramos sobre los datos y creamos una fila para cada uno
            data.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item["_id"]}</td>    
                    <td>${item["device"]}</td>
                    <td>${item["temperature"]}</td>
                    <td>${item["humidity"]}</td>
                    <td>${item.date}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Función para eliminar todos los elementos hijos de un elemento dado
function deleteChild(e) {
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
