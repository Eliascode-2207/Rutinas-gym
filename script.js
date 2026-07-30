const baseEjercicios = {
    musculo: {
        3: [
            { dia: "Día 1: Full Body A", ejercicios: ["Sentadilla libre - 4 series x 8 repeticiones", "Press de banca plano - 4 series x 8 repeticiones", "Remo con barra - 4 series x 10 repeticiones"] },
            { dia: "Día 2: Full Body B", ejercicios: ["Peso muerto rumano - 3 series x 10 repeticiones", "Press militar con mancuernas - 3 series x 10 repeticiones", "Dominadas o Jalón al pecho - 3 series x 10 repeticiones"] },
            { dia: "Día 3: Full Body C", ejercicios: ["Prensa de pierna - 4 series x 10 repeticiones", "Flexiones de pecho - 3 series al fallo", "Curl de bíceps y Extensiones de tríceps - 3 series x 12 repeticiones"] }
        ],
        4: [
            { dia: "Día 1: Torso", ejercicios: ["Press de banca - 4 series x 8 repeticiones", "Remo en polea baja - 4 series x 10 repeticiones", "Press militar - 3 series x 10 repeticiones"] },
            { dia: "Día 2: Pierna", ejercicios: ["Sentadilla búlgara - 3 series x 10 repeticiones", "Curl femoral acostado - 4 series x 12 repeticiones", "Elevación de talones - 4 series x 15 repeticiones"] },
            { dia: "Día 3: Torso (Enfoque Espalda)", ejercicios: ["Dominadas - 3 series x 8 repeticiones", "Press inclinado con mancuernas - 4 series x 10 repeticiones", "Elevaciones laterales - 4 series x 15 repeticiones"] },
            { dia: "Día 4: Pierna (Enfoque Glúteo/Cadera)", ejercicios: ["Peso muerto convencional - 3 series x 6 repeticiones", "Hip thrust - 4 series x 10 repeticiones", "Extensiones de cuádriceps - 3 series x 12 repeticiones"] }
        ],
        5: [
            { dia: "Día 1: Pecho y Tríceps", ejercicios: ["Press plano - 4 series x 8 repeticiones", "Press inclinado - 3 series x 10 repeticiones", "Extensiones de tríceps - 3 series x 12 repeticiones"] },
            { dia: "Día 2: Espalda y Bíceps", ejercicios: ["Dominadas - 4 series x 8 repeticiones", "Remo con barra - 4 series x 10 repeticiones", "Curl de bíceps - 3 series x 12 repeticiones"] },
            { dia: "Día 3: Pierna (Enfoque Cuádriceps)", ejercicios: ["Sentadilla libre - 4 series x 8 repeticiones", "Prensa - 4 series x 10 repeticiones", "Extensiones de cuádriceps - 3 series x 12 repeticiones"] },
            { dia: "Día 4: Hombro y Abdomen", ejercicios: ["Press militar - 4 series x 8 repeticiones", "Elevaciones laterales - 4 series x 15 repeticiones", "Plancha abdominal - 3 series x 1 minuto"] },
            { dia: "Día 5: Pierna (Enfoque Glúteo/Femoral)", ejercicios: ["Peso muerto rumano - 4 series x 8 repeticiones", "Curl femoral - 4 series x 12 repeticiones", "Elevación de talones - 4 series x 15 repeticiones"] }
        ]
    },
    grasa: {
        3: [
            { dia: "Día 1: Circuito A + Cardio", ejercicios: ["Burpees - 4 series x 12 repeticiones", "Zancadas caminando - 4 series x 20 pasos", "Plancha abdominal - 4 series x 45 segundos", "Cardio moderado - 20 minutos"] },
            { dia: "Día 2: Circuito B + Core", ejercicios: ["Flexiones de pecho - 4 series x 15 repeticiones", "Sentadillas con salto - 4 series x 12 repeticiones", "Escaladores - 4 series x 40 segundos"] },
            { dia: "Día 3: Full Body Dinámico", ejercicios: ["Kettlebell swings - 4 series x 15 repeticiones", "Remo con mancuerna - 4 series x 12 repeticiones", "HIIT final - 15 minutos"] }
        ],
        4: [
            { dia: "Día 1: Alta Intensidad", ejercicios: ["Thrusters - 4 series x 12 repeticiones", "Dominadas asistidas - 3 series x 10 repeticiones", "Cardio HIIT - 20 minutos"] },
            { dia: "Día 2: Tren Inferior + Abdomen", ejercicios: ["Zancadas estáticas - 4 series x 12 repeticiones", "Puente de glúteos - 4 series x 15 repeticiones", "Elevación de piernas - 3 series x 12 repeticiones"] },
            { dia: "Día 3: Tren Superior Metabólico", ejercicios: ["Press con mancuernas - 4 series x 12 repeticiones", "Remo en TRX - 4 series x 12 repeticiones", "Flexiones declinadas - 3 series x 10 repeticiones"] },
            { dia: "Día 4: Cardio y Resistencia", ejercicios: ["Circuito aeróbico - 30 minutos de duración", "Cuerda de saltar - 5 series de 2 minutos"] }
        ],
        5: [
            { dia: "Día 1: Full Body Metabólico", ejercicios: ["Burpees y sentadillas - 5 series x 15 repeticiones", "Flexiones - 4 series x 20 repeticiones"] },
            { dia: "Día 2: Cardio y Abdomen", ejercicios: ["Trote continuo - 30 minutos", "Crunch abdominal y planchas - 4 series"] },
            { dia: "Día 3: Tren Superior Ágil", ejercicios: ["Press de hombros con mancuernas - 4 series x 12 repeticiones", "Jalón al pecho - 4 series x 12 repeticiones"] },
            { dia: "Día 4: Tren Inferior Dinámico", ejercicios: ["Zancadas en movimiento - 4 series x 20 pasos", "Saltos al cajón - 4 series x 10 repeticiones"] },
            { dia: "Día 5: HIIT Total", ejercicios: ["Entrenamiento interválico de alta intensidad - 30 minutos sin parar"] }
        ]
    },
    fuerza: {
        3: [
            { dia: "Día 1: Sentadilla y Accesorios", ejercicios: ["Sentadilla libre - 5 series x 3-5 repeticiones", "Prensa - 3 series x 8 repeticiones"] },
            { dia: "Día 2: Press de Banca y Empuje", ejercicios: ["Press de banca - 5 series x 3-5 repeticiones", "Fondos en paralelas - 3 series x 8 repeticiones"] },
            { dia: "Día 3: Peso Muerto y Tracción", ejercicios: ["Peso muerto - 4 series x 3 repeticiones", "Remo con barra - 4 series x 6 repeticiones"] }
        ],
        4: [
            { dia: "Día 1: Tren Superior A", ejercicios: ["Press de banca pesado - 5 series x 3 repeticiones", "Remo con barra - 4 series x 5 repeticiones"] },
            { dia: "Día 2: Tren Inferior A", ejercicios: ["Sentadilla pesada - 5 series x 3 repeticiones", "Peso muerto rumano - 4 series x 6 repeticiones"] },
            { dia: "Día 3: Tren Superior B", ejercicios: ["Press militar - 5 series x 5 repeticiones", "Dominadas lastradas - 4 series x 5 repeticiones"] },
            { dia: "Día 4: Tren Inferior B", ejercicios: ["Peso muerto convencional - 4 series x 3 repeticiones", "Zancadas pesadas - 3 series x 8 repeticiones"] }
        ],
        5: [
            { dia: "Día 1: Sentadilla Pesada", ejercicios: ["Sentadilla libre - 5 series x 3 repeticiones", "Prensa - 3 series x 8 repeticiones"] },
            { dia: "Día 2: Press de Banca Pesado", ejercicios: ["Press de banca - 5 series x 3 repeticiones", "Fondos en paralelas - 3 series x 8 repeticiones"] },
            { dia: "Día 3: Descanso Activo", ejercicios: ["Movilidad y estiramientos"] },
            { dia: "Día 4: Peso Muerto", ejercicios: ["Peso muerto convencional - 4 series x 3 repeticiones", "Remo con barra - 4 series x 6 repeticiones"] },
            { dia: "Día 5: Press Militar", ejercicios: ["Press militar - 5 series x 5 repeticiones", "Dominadas con peso - 3 series x 5 repeticiones"] }
        ]
    }
};

const form = document.getElementById('form-rutina');
const resultadoContainer = document.getElementById('resultado-container');
const listaRutinas = document.getElementById('lista-rutinas');
const subPlan = document.getElementById('sub-plan');
const btnRegresar = document.getElementById('btn-regresar');

const btnModoOscuro = document.getElementById('btn-modo-oscuro');
const iconoTheme = document.getElementById('icono-theme');

if (localStorage.getItem('modo-oscuro') === 'true') {
    document.body.classList.add('dark-mode');
    iconoTheme.textContent = 'light_mode';
}

btnModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    iconoTheme.textContent = isDarkMode ? 'light_mode' : 'dark_mode';
    localStorage.setItem('modo-oscuro', isDarkMode);
});

const cronometroBox = document.getElementById('cronometro-box');
const tiempoRestanteEl = document.getElementById('tiempo-restante');
const btnCancelarTimer = document.getElementById('btn-cancelar-timer');
let temporizadorID = null;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const objetivo = document.getElementById('objetivo').value;
    const dias = document.getElementById('dias').value;

    const rutinaSeleccionada = baseEjercicios[objetivo][dias];
    
    let textoObjetivo = 'Hipertrofia';
    if (objetivo === 'grasa') textoObjetivo = 'Pérdida de Grasa';
    if (objetivo === 'fuerza') textoObjetivo = 'Ganar Fuerza Pura';

    subPlan.innerHTML = `Objetivo: <strong>${textoObjetivo}</strong> | Frecuencia: <strong>${dias} días</strong>`;
    listaRutinas.innerHTML = '';

    rutinaSeleccionada.forEach(bloque => {
        const divDia = document.createElement('div');
        divDia.className = 'dia-card';

        let listaEjerciciosHTML = '';
        bloque.ejercicios.forEach(ej => {
            // Intentar detectar cuántas series tiene el ejercicio leyendo el texto (ej. "4 series")
            let matchSeries = ej.match(/(\d+)\s*series/);
            let numSeries = matchSeries ? parseInt(matchSeries[1]) : 3; // Por defecto 3 si no lo encuentra

            let checksHTML = '';
            for (let i = 1; i <= numSeries; i++) {
                checksHTML += `<div class="serie-check" onclick="toggleSerie(this)" title="Marcar serie ${i}">${i}</div>`;
            }

            listaEjerciciosHTML += `
                <div class="ejercicio-item">
                    <div class="ejercicio-info">
                        <span>${ej}</span>
                        <button class="btn-descanso" onclick="iniciarDescanso(60)">⏱️ Descansar 60s</button>
                    </div>
                    <div class="series-container">
                        ${checksHTML}
                    </div>
                </div>`;
        });

        divDia.innerHTML = `
            <h4>${bloque.dia}</h4>
            <ul>${listaEjerciciosHTML}</ul>
        `;

        listaRutinas.appendChild(divDia);
    });

    form.classList.add('oculto');
    resultadoContainer.classList.remove('oculto');
});

// Función para marcar/desmarcar series
window.toggleSerie = function(elemento) {
    elemento.classList.toggle('completada');
};

window.iniciarDescanso = function(segundosTotales) {
    if (temporizadorID) clearInterval(temporizadorID);

    cronometroBox.classList.remove('oculto');
    let tiempoRestante = segundosTotales;

    actualizarTextoTimer(tiempoRestante);

    temporizadorID = setInterval(() => {
        tiempoRestante--;
        actualizarTextoTimer(tiempoRestante);

        if (tiempoRestante <= 0) {
            clearInterval(temporizadorID);
            tiempoRestanteEl.textContent = "¡A entrenar! 💪";
            setTimeout(() => {
                cronometroBox.classList.add('oculto');
            }, 3000);
        }
    }, 1000);
};

function actualizarTextoTimer(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    const formato = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    tiempoRestanteEl.textContent = formato;
}

btnCancelarTimer.addEventListener('click', () => {
    if (temporizadorID) clearInterval(temporizadorID);
    cronometroBox.classList.add('oculto');
});

btnRegresar.addEventListener('click', () => {
    if (temporizadorID) clearInterval(temporizadorID);
    cronometroBox.classList.add('oculto');
    resultadoContainer.classList.add('oculto');
    form.classList.remove('oculto');
});