document.addEventListener('DOMContentLoaded', () => {
    const formRutina = document.getElementById('form-rutina');
    const resultadoContainer = document.getElementById('resultado-container');
    const listaRutinas = document.getElementById('lista-rutinas');
    const btnRegresar = document.getElementById('btn-regresar');
    const tituloPlan = document.getElementById('titulo-plan');
    const subPlan = document.getElementById('sub-plan');
    const btnModoOscuro = document.getElementById('btn-modo-oscuro');
    const iconoTheme = document.getElementById('icono-theme');

    // Elementos del Modal
    const modalEjercicio = document.getElementById('modal-ejercicio');
    const cerrarModal = document.getElementById('cerrar-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');

    // Elementos del Cronómetro
    const cronometroBox = document.getElementById('cronometro-box');
    const tiempoRestante = document.getElementById('tiempo-restante');
    const btnCancelarTimer = document.getElementById('btn-cancelar-timer');
    let temporizador = null;

    // --- 1. MODO OSCURO ---
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(iconoTheme) iconoTheme.textContent = 'light_mode';
    }

    if(btnModoOscuro) {
        btnModoOscuro.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if(iconoTheme) iconoTheme.textContent = 'light_mode';
            } else {
                localStorage.setItem('theme', 'light');
                if(iconoTheme) iconoTheme.textContent = 'dark_mode';
            }
        });
    }

    // --- 2. GENERADOR DE RUTINAS CON DATOS CORPORALES ---
    if(formRutina) {
        formRutina.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capturar datos corporales
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const edad = parseInt(document.getElementById('edad').value);
            const objetivo = document.getElementById('objetivo').value;
            const dias = parseInt(document.getElementById('dias').value);

            // Calcular IMC (Altura de cm a metros)
            const alturaMetros = altura / 100;
            const imc = (peso / (alturaMetros * alturaMetros)).toFixed(1);
            
            // Definir estado de peso según IMC
            let estadoImc = "Peso normal";
            if (imc < 18.5) estadoImc = "Bajo peso";
            else if (imc >= 25 && imc < 30) estadoImc = "Sobrepeso";
            else if (imc >= 30) estadoImc = "Obesidad";

            // Textos descriptivos para el plan
            const nombresObjetivo = {
                musculo: "Ganancia de Masa Muscular (Hipertrofia)",
                grasa: "Pérdida de Grasa y Definición",
                fuerza: "Ganancia de Fuerza Pura"
            };

            if(tituloPlan) tituloPlan.textContent = `Plan: ${nombresObjetivo[objetivo]}`;
            if(subPlan) subPlan.textContent = `Edad: ${edad} años | Peso: ${peso}kg | IMC: ${imc} (${estadoImc}) | ${dias} Días por semana`;

            // Generar estructura de días y ejercicios
            if(listaRutinas) listaRutinas.innerHTML = '';
            const rutinaData = obtenerEjerciciosPorObjetivo(objetivo, dias);

            rutinaData.forEach((diaInfo, index) => {
                const diaCard = document.createElement('div');
                diaCard.className = 'dia-card anime-fade-in';
                
                let ejerciciosHTML = diaInfo.ejercicios.map(ej => `
                    <div class="ejercicio-item" data-nombre="${ej.nombre}" data-desc="${ej.desc}">
                        <div class="ejercicio-info">
                            <span class="material-icons">fitness_center</span>
                            <div>
                                <strong>${ej.nombre}</strong>
                                <p>${ej.series} series x ${ej.reps} reps</p>
                            </div>
                        </div>
                        <button class="btn-timer-trigger" title="Iniciar descanso">
                            <span class="material-icons">timer</span> 60s
                        </button>
                    </div>
                `).join('');

                diaCard.innerHTML = `
                    <h4>Día ${index + 1}: ${diaInfo.titulo}</h4>
                    <div class="ejercicios-lista">${ejerciciosHTML}</div>
                `;

                if(listaRutinas) listaRutinas.appendChild(diaCard);
            });

            // Ocultar solo el formulario usando la clase oculto de tu CSS
            formRutina.classList.add('oculto');
            if(resultadoContainer) resultadoContainer.classList.remove('oculto');
            
            activarEventosDinamicos();
        });
    }

    // --- 3. BOTÓN REGRESAR ---
    if(btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            if(resultadoContainer) resultadoContainer.classList.add('oculto');
            if(formRutina) {
                formRutina.classList.remove('oculto');
                formRutina.reset();
            }
            detenerCronometro();
        });
    }

    // --- 4. FUNCIONES DE APOYO PARA RUTINAS ---
    function obtenerEjerciciosPorObjetivo(objetivo, dias) {
        const banco = {
            musculo: [
                { nombre: "Press de Banca con Barra", desc: "Acuéstate en el banco plano, sujeta la barra un poco más abierta que tus hombros, baja de forma controlada al pecho y empuja con fuerza hacia arriba.", series: 4, reps: "8-10" },
                { nombre: "Sentadilla Libre", desc: "Coloca la barra sobre la parte alta de la espalda, mantén el core apretado, baja la cadera hacia atrás como si fueras a sentarte y sube.", series: 4, reps: "8-12" },
                { nombre: "Dominadas en Barra", desc: "Sujeta la barra con las manos hacia el frente, cuelga con los brazos extendidos y elvíntate hasta pasar la barbilla por encima de la barra.", series: 3, reps: "8-10" },
                { nombre: "Press Militar con Mancuernas", desc: "Sentado o de pie, sostén las mancuernas a la altura de los hombros y presiona verticalmente hacia arriba sin arquear la espalda.", series: 3, reps: "10-12" },
                { nombre: "Curl de Bíceps con Barra Z", desc: "De pie, sujeta la barra con agarre supino y flexiona los codos contrayendo los bíceps sin mover el tronco.", series: 3, reps: "12" },
                { nombre: "Extensiones de Tríceps en Polea", desc: "Agarra el mango de la polea alta, mantén los codos fijos a los costados y empuja hacia abajo extendiendo los brazos.", series: 3, reps: "12" }
            ],
            grasa: [
                { nombre: "Zancadas (Lunges) caminando", desc: "Da un paso al frente y baja la cadera hasta que ambas rodillas formen un ángulo de 90 grados, alterna las piernas de forma dinámica.", series: 4, reps: "12 por pierna" },
                { nombre: "Flexiones de Pecho", desc: "Coloca las manos en el suelo a la altura de los hombros, mantén el cuerpo recto y baja el pecho casi rozando el suelo.", series: 4, reps: "15" },
                { nombre: "Remo con Mancuerna a una mano", desc: "Apoya una rodilla y una mano en un banco, con la otra mano eleva la mancuerna llevando el codo bien atrás.", series: 3, reps: "12" },
                { nombre: "Sentadillas con Salto", desc: "Realiza una sentadilla profunda y al subir explota con un salto vertical amortiguando la caída.", series: 3, reps: "12" },
                { nombre: "Plancha Abdominal", desc: "Apoya los antebrazos y las puntas de los pies en el suelo, mantén el abdomen contraído y el cuerpo alineado por 45 segundos.", series: 3, reps: "45 seg" }
            ],
            fuerza: [
                { nombre: "Peso Muerto Tradicional", desc: "Con los pies separados al ancho de hombros, agarra la barra, mantén la espalda totalmente recta y eleva extendiendo caderas y rodillas.", series: 5, reps: "5" },
                { nombre: "Press de Banca Pesado", desc: "Enfoque en cargas altas y pocas repeticiones con buena estabilidad en escápulas.", series: 5, reps: "5" },
                { nombre: "Sentadilla Pesada", desc: "Sentadillas con barra libre a un 80-85% de tu capacidad máxima.", series: 5, reps: "5" },
                { nombre: "Press Militar Estricto", desc: "Empuje vertical de fuerza con barra desde los hombros sin impulso de piernas.", series: 4, reps: "6" }
            ]
        };

        const seleccion = banco[objetivo] || banco.musculo;
        let resultado = [];
        
        for(let i = 0; i < dias; i++) {
            let inicio = (i * 2) % seleccion.length;
            let ejerciciosDia = [
                seleccion[inicio % seleccion.length],
                seleccion[(inicio + 1) % seleccion.length],
                seleccion[(inicio + 2) % seleccion.length]
            ];
            resultado.push({
                titulo: `Fuerza y Rendimiento - Bloque ${i + 1}`,
                ejercicios: ejerciciosDia
            });
        }
        return resultado;
    }

    // --- 5. ACTIVAR EVENTOS DINÁMICOS (MODAL Y CRONÓMETRO) ---
    function activarEventosDinamicos() {
        const itemsEjercicio = document.querySelectorAll('.ejercicio-item');
        itemsEjercicio.forEach(item => {
            const infoDiv = item.querySelector('.ejercicio-info');
            if(infoDiv) {
                infoDiv.addEventListener('click', () => {
                    const nombre = item.getAttribute('data-nombre');
                    const desc = item.getAttribute('data-desc');
                    if(modalTitulo) modalTitulo.textContent = nombre;
                    if(modalDescripcion) modalDescripcion.textContent = desc;
                    if(modalEjercicio) modalEjercicio.classList.remove('oculto');
                });
            }

            const btnTimer = item.querySelector('.btn-timer-trigger');
            if(btnTimer) {
                btnTimer.addEventListener('click', (e) => {
                    e.stopPropagation();
                    iniciarCronometro(60);
                });
            }
        });
    }

    if(cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            if(modalEjercicio) modalEjercicio.classList.add('oculto');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalEjercicio) {
            modalEjercicio.classList.add('oculto');
        }
    });

    // --- 6. FUNCIONALIDAD DEL CRONÓMETRO ---
    function iniciarCronometro(segundos) {
        detenerCronometro();
        if(cronometroBox) cronometroBox.classList.remove('oculto');
        
        let tiempoRestando = segundos;
        actualizarTextoTimer(tiempoRestando);

        temporizador = setInterval(() => {
            tiempoRestando--;
            actualizarTextoTimer(tiempoRestando);

            if (tiempoRestando <= 0) {
                detenerCronometro();
                if(tiempoRestante) tiempoRestante.textContent = "¡A entrenar!";
                setTimeout(() => {
                    if(cronometroBox) cronometroBox.classList.add('oculto');
                }, 2000);
            }
        }, 1000);
    }

    function actualizarTextoTimer(seg) {
        const min = Math.floor(seg / 60);
        const s = seg % 60;
        if(tiempoRestante) {
            tiempoRestante.textContent = `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
    }

    function detenerCronometro() {
        if (temporizador) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }

    if(btnCancelarTimer) {
        btnCancelarTimer.addEventListener('click', () => {
            detenerCronometro();
            if(cronometroBox) cronometroBox.classList.add('oculto');
        });
    }
});

