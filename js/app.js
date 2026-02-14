const ingresos = [
  new Ingreso("Salario", 2100.00),
  new Ingreso("Venta Coche", 2400.00),
];

const egresos = [
  new Egreso("Renta departamento", 1600.00),
  new Egreso("Ropa", 1400.00),
];
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};
let totalIngresos = () => {
  let totalIngresos = 0;
  for (let ingreso of ingresos) {
    totalIngresos += ingreso.valor;
  }
  return totalIngresos;
};
let totalEgreso = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};
let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgreso();
  let porcentajeEgreso = totalEgreso() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML =
    formatoMoneda(totalIngresos());
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgreso());
};
const formatoMoneda = (valor) => {
  return valor.toLocaleString("Es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
};
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};
const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const cargarEgresos = () => {
  let EgresosHTML = '';
  for (let egreso of egresos) {
    EgresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById('lista-egresos').innerHTML = EgresosHTML;
}


const eliminarEgreso = (idEgreso) => {
  let indiceEliminar = egresos.findIndex(egreso => egreso.idEgreso === idEgreso);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
}

const eliminarIngreso = (idIngreso) => {
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.idIngreso === idIngreso);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
}

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
  <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
             <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                   <div class="elemento_eliminar">
                   <button class="elemento_eliminar--btn">
                   <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon>
                   </button>
             </div>
          </div>
    </div>`;
  return ingresoHTML;
};
const crearEgresoHTML = (egreso) => {
  let EgresoHTML = `
   <div class="elemento limpiarEstilos">
          <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                  <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgreso())}</div>
                      <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                           <ion-icon name="close-circle-outline" 
                           onclick="eliminarEgreso(${egreso.idEgreso})"></ion-icon>
                    </button>
              </div>
         </div>
     </div>`;
  return EgresoHTML;
}
const agregarDato = () => {
  let forma = document.forms['forma'];
  let tipo = forma['tipo'];
  let descripcion = forma['descripcion'];
  let valor = forma['valor'];
  if (descripcion.value !== '' && valor.value !== '') {
    if (tipo.value === 'ingreso') {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    }
    else if (tipo.value === 'egreso') {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
}

