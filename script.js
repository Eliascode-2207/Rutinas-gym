document.addEventListener('DOMContentLoaded', () => {
    // Referencias generales
    const formRutina = document.getElementById('form-rutina');
    const resultadoContainer = document.getElementById('resultado-container');
    const btnRegresar = document.getElementById('btn-regresar');
    const listaRutinas = document.getElementById('lista-rutinas');
    const tituloPlan = document.getElementById('titulo-plan');
    const subPlan = document.getElementById('sub-plan');

    // MODO OSCURO / CLARO
    const btnModoOscuro = document.getElementById('btn-modo-oscuro');
    const iconoTheme = document.getElementById('icono-theme');
    
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
        if (iconoTheme) iconoTheme.textContent = 'light_mode';
    }

    if (btnModoOscuro) {
        btnModoOscuro.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('light-mode');
            document.documentElement.classList.toggle('light-mode');
            
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            if (iconoTheme) {
                iconoTheme.textContent = isLight ? 'light_mode' : 'dark_mode';
            }
        });
    }

    // --- LÓGICA DEL CALENDARIO DE RACHAS ---
    function renderizarCalendario() {
        const gridCalendario = document.getElementById('grid-calendario');
        const contadorRacha = document.getElementById('contador-racha');
        if (!gridCalendario) return;

        gridCalendario.innerHTML = '';

        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth();
        const totalDiasMes = new Date(año, mes + 1, 0).getDate();

        let diasEntrenados = JSON.parse(localStorage.getItem('dias_entrenados')) || [];
        let rachaActual = 0;

        for (let dia = 1; dia <= totalDiasMes; dia++) {
            const diaFormateado = String(dia).padStart(2, '0');
            const mesFormateado = String(mes + 1).padStart(2, '0');
            const fechaString = `${año}-${mesFormateado}-${diaFormateado}`;

            const celda = document.createElement('div');
            celda.classList.add('dia-celda');
            celda.textContent = dia;

            if (diasEntrenados.includes(fechaString)) {
                celda.classList.add('entrenado');
                rachaActual++;
            }

            celda.addEventListener('click', () => {
                if (diasEntrenados.includes(fechaString)) {
                    diasEntrenados = diasEntrenados.filter(d => d !== fechaString);
                } else {
                    diasEntrenados.push(fechaString);
                }
                localStorage.setItem('dias_entrenados', JSON.stringify(diasEntrenados));
                renderizarCalendario();
            });

            gridCalendario.appendChild(celda);
        }

        if (contadorRacha) {
            contadorRacha.textContent = rachaActual;
        }
    }
    renderizarCalendario();

    // --- LÓGICA DE RUTINA FAVORITA ---
    let rutinaActualData = null;
    const seccionFavorito = document.getElementById('seccion-favorito-guardado');
    const btnGuardarFavorito = document.getElementById('btn-guardar-favorito');
    const btnCargarFavorito = document.getElementById('btn-cargar-favorito');

    function verificarFavoritoGuardado() {
        const guardada = localStorage.getItem('rutina_favorita');
        if (guardada && seccionFavorito) {
            seccionFavorito.classList.remove('oculto');
        }
    }
    verificarFavoritoGuardado();

    if (btnGuardarFavorito) {
        btnGuardarFavorito.addEventListener('click', () => {
            if (rutinaActualData) {
                localStorage.setItem('rutina_favorita', JSON.stringify(rutinaActualData));
                alert('¡Rutina guardada en favoritos con éxito! ⭐');
                verificarFavoritoGuardado();
            }
        });
    }

    if (btnCargarFavorito) {
        btnCargarFavorito.addEventListener('click', () => {
            const guardada = JSON.parse(localStorage.getItem('rutina_favorita'));
            if (guardada) {
                document.getElementById('peso').value = guardada.peso;
                document.getElementById('altura').value = guardada.altura;
                document.getElementById('edad').value = guardada.edad;
                document.getElementById('objetivo').value = guardada.objetivo;
                document.getElementById('dias').value = guardada.dias;

                formRutina.dispatchEvent(new Event('submit'));
            }
        });
    }

    // --- BASE DE DATOS DE EJERCICIOS Y TIEMPOS DE DESCANSO ---
    const baseEjercicios = {
        musculo: {
            descanso: "90 - 120 segundos",
            dias: [
                ["Press de Banca plano (4x8-10)", "Aperturas con mancuernas (3x12)", "Press militar con barra (4x8)", "Elevaciones laterales (4x12)", "Extensiones de tríceps (3x12)"],
                ["Dominadas o Jalón al pecho (4x8-10)", "Remo con barra (4x8)", "Remo en polea baja (3x12)", "Curl de bíceps con barra (3x10)", "Curl martillo (3x12)"],
                ["Sentadilla libre (4x8)", "Prensa de pierna (4x10)", "Extensiones de cuádriceps (3x12)", "Curl femoral tumbado (3x12)", "Elevación de talones (4x15)"],
                ["Press inclinado con mancuernas (4x10)", "Cruce de poleas (3x12)", "Press Arnold (3x10)", "Fondos en paralelas (3xMAX)"],
                ["Peso muerto rumano (4x8)", "Hip thrust (4x10)", "Curl femoral sentado (3x12)", "Abdominales en polea (3x15)"]
            ]
        },
        grasa: {
            descanso: "45 - 60 segundos",
            dias: [
                ["Sentadillas con salto (4x15)", "Flexiones de pecho (4x12)", "Zancadas dinámicas (3x12 por pierna)", "Plancha abdominal (3x 45 seg)"],
                ["Burpees (4x10)", "Remo con mancuernas (4x12)", "Mountain Climbers (3x 45 seg)", "Elevaciones de piernas (3x15)"],
                ["Peso muerto con mancuernas (4x12)", "Press de hombros (4x12)", "Jumping Jacks (3x 1 min)", "Abdominales bicicleta (3x20)"],
                ["Thrusters con mancuernas (4x10)", "Dominadas asistidas (3x8)", "Sombra de boxeo o cuerda (4x 1 min)", "Plancha lateral (3x 30 seg c/u)"],
                ["Zancadas búlgaras (3x10)", "Flexiones diamante (3x10)", "Sprint estático (5x 30 seg)", "Crunches abdominales (3x20)"]
            ]
        },
        fuerza: {
            descanso: "3 - 5 minutos",
            dias: [
                ["Sentadilla trasera pesada (5x5)", "Press de banca pesado (5x5)", "Dominadas lastradas (4x6)", "Face pulls (3x12)"],
                ["Peso muerto convencional (4x3-5)", "Press militar estricto (4x5)", "Remo pendlay (4x6)", "Encogimientos con barra (3x8)"],
                ["Press de banca con parada (4x5)", "Fondos con peso (4x6)", "Curl con barra olímpica (3x6)", "Extensiones de tríceps pesado (3x6)"],
                ["Sentadilla frontal (4x5)", "Prensa pesada (4x6)", "Hip thrust pesado (4x6)", "Elevación de talones pesado (4x10)"],
                ["Peso muerto rumano pesado (4x5)", "Press inclinado con barra (4x5)", "Dominadas neutras (4x6)", "Abdominales con peso (3x10)"]
            ]
        },
        tonificacion: {
            descanso: "60 segundos",
            dias: [
                ["Sentadillas libres (4x12)", "Puente de glúteos (4x15)", "Press de hombros con mancuernas (3x12)", "Plancha abdominal (3x 45 seg)"],
                ["Zancadas estáticas (3x12)", "Curl de bíceps (3x12)", "Patada de tríceps (3x12)", "Elevaciones laterales (3x15)"],
                ["Peso muerto rumano con mancuernas (4x12)", "Aperturas de pecho (3x12)", "Remo inclinado con mancuernas (3x12)", "Abdominales en V (3x12)"],
                ["Sentadillas sumo (4x12)", "Flexiones inclinadas (3x10)", "Elevación de talones (4x20)", "Abdominales crunch (3x15)"],
                ["Zancadas caminando (3x12)", "Press Arnold liviano (3x12)", "Curl martillo (3x12)", "Plancha lateral (3x 30 seg)"]
            ]
        },
        resistencia: {
            descanso: "30 - 45 segundos",
            dias: [
                ["Circuito: Sentadillas + Jumping Jacks + Skipping (4 rondas de 45s c/u)", "Flexiones continuas (3x máx)", "Abdominales dinámicos (3x 1 min)"],
                ["Circuito: Zancadas + Mountain Climbers + Burpees (4 rondas de 45s c/u)", "Plancha frontal con movimiento (3x 45s)"],
                ["Circuito: Sentadillas con salto + Press militar liviano + Cuerda (4 rondas)"],
                ["Circuito: Zancadas búlgaras + Flexiones abiertas + Escaladores (4 rondas)"],
                ["Circuito aeróbico completo de cuerpo entero (5 rondas de alta intensidad)"]
            ]
        },
        movilidad: {
            descanso: "30 segundos",
            dias: [
                ["Movilidad articular de hombros y cuello (3 series)", "Rotaciones torácicas en suelo (3x10)", "Sentadilla profunda asistida (3x 45s)", "Estiramiento de cadena posterior (3x 45s)"],
                ["Apertura de caderas en posición de lagartija (3x10)", "Gato-Vaca para columna (3x15)", "Movilidad de muñecas y tobillos (3 series)"],
                ["Estiramiento de psoas y flexores de cadera (3x 45s)", "Rotaciones de tronco sentados (3x12)", "Postura del niño y cobra (3 series)"],
                ["Movilidad escapular en pared (3x12)", "Apertura de pecho y hombros (3x 45s)", "Sentadilla cosaca dinámica (3x10)"],
                ["Rutina completa de estiramientos globales y respiración diafragmática (15 mins)"]
            ]
        },
        calistenia: {
            descanso: "90 segundos",
            dias: [
                ["Dominadas estrictas (4x max)", "Flexiones diamante (4x12)", "Australian pull-ups (4x12)", "Plancha abdominal (3x 1 min)"],
                ["Fondos en paralelas (4x8-10)", "Flexiones declinadas (4x12)", "Elevaciones de piernas colgado (3x10)", "Sentadillas pistol asistidas (3x8)"],
                ["Dominadas supinas (chin-ups) (4x8)", "Flexiones en pica para hombro (4x10)", "Remo invertido en barra (4x12)", "L-sit en suelo o paralelas (3x 20s)"],
                ["Sentadillas libres a una pierna (3x8)", "Flexiones arquero (3x8 por lado)", "Puente de glúteos a una pierna (3x12)", "Abdominales windshield wipers (3x12)"],
                ["Muscle-up o progresión de tirón (4x5)", "Fondos rusos (3x8)", "Flexiones explosivas con palmada (3x8)", "Plancha hollow body (3x 45s)"]
            ]
        }
    };

    // --- GENERADOR DE RUTINAS, NUTRICIÓN Y CRONÓMETRO ---
    if (formRutina) {
        formRutina.addEventListener('submit', (e) => {
            e.preventDefault();

            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const edad = parseInt(document.getElementById('edad').value);
            const objetivo = document.getElementById('objetivo').value;
            const diasSeleccionados = parseInt(document.getElementById('dias').value);

            rutinaActualData = { peso, altura, edad, objetivo, dias: diasSeleccionados };

            formRutina.style.display = 'none';
            if (seccionFavorito) seccionFavorito.style.display = 'none';
            resultadoContainer.classList.remove('oculto');

            const objetivoSelect = document.getElementById('objetivo');
            const textoObjetivo = objetivoSelect.options[objetivoSelect.selectedIndex].text;

            tituloPlan.textContent = `Plan: ${textoObjetivo}`;
            subPlan.textContent = `Perfil: ${peso}kg | ${altura}cm | ${edad} años`;

            // CÁLCULO DE CALORÍAS Y MACRONUTRIENTES
            let tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5; 
            let factorActividad = 1.375;
            if (diasSeleccionados >= 3 && diasSeleccionados <= 4) factorActividad = 1.55;
            if (diasSeleccionados >= 5) factorActividad = 1.725;

            let caloriasMantenimiento = tmb * factorActividad;
            let caloriasObjetivo = caloriasMantenimiento;
            let gramosProteina = Math.round(peso * 2.0);

            if (objetivo === 'grasa') {
                caloriasObjetivo -= 400;
            } else if (objetivo === 'musculo' || objetivo === 'fuerza') {
                caloriasObjetivo += 300;
            }

            caloriasObjetivo = Math.round(caloriasObjetivo);
            let gramosGrasa = Math.round((caloriasObjetivo * 0.25) / 9);
            let gramosCarbos = Math.round((caloriasObjetivo - (gramosProteina * 4) - (gramosGrasa * 9)) / 4);

            const datosPlan = baseEjercicios[objetivo] || baseEjercicios['musculo'];
            
            listaRutinas.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 10px;">Calculando plan y nutrición...</p>`;
            
            setTimeout(() => {
                let htmlEjercicios = `
                    <!-- TARJETA DE NUTRICIÓN Y MACROS (Usando clases idénticas a las tarjetas de ejercicios) -->
                    <div class="dia-card" style="border: 2px solid var(--primary); margin-bottom: 16px;">
                        <h4 style="color: var(--primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                            🥗 Tu Meta Nutricional Diaria
                        </h4>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                            <div class="ejercicio-item" style="margin: 0; justify-content: flex-start;">🔥 <strong>Calorías:</strong> ~${caloriasObjetivo} kcal</div>
                            <div class="ejercicio-item" style="margin: 0; justify-content: flex-start;">🥩 <strong>Proteínas:</strong> ~${gramosProteina} g</div>
                            <div class="ejercicio-item" style="margin: 0; justify-content: flex-start;">🥑 <strong>Grasas:</strong> ~${gramosGrasa} g</div>
                            <div class="ejercicio-item" style="margin: 0; justify-content: flex-start;">🥔 <strong>Carbohidratos:</strong> ~${gramosCarbos} g</div>
                        </div>
                    </div>
                `;

                for(let i = 0; i < diasSeleccionados; i++) {
                    const ejerciciosDelDia = datosPlan.dias[i % datosPlan.dias.length];
                    
                    htmlEjercicios += `
                        <div class="dia-card">
                            <h4>Día ${i + 1}: Sesión de Entrenamiento</h4>
                            <div style="display: flex; flex-direction: column; gap: 6px;">
                    `;

                    ejerciciosDelDia.forEach(ejercicio => {
                        htmlEjercicios += `
                            <div class="ejercicio-item" style="display: flex; justify-content: space-between; align-items: center;">
                                <span>• ${ejercicio}</span>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <button class="btn-timer" style="background: var(--primary); color: #000; border: none; padding: 4px 10px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">⏱️ ${datosPlan.descanso.split(" ")[0]}s</button>
                                    <input type="checkbox" style="width: 18px; height: 18px; cursor: pointer;">
                                </div>
                            </div>
                        `;
                    });

                    htmlEjercicios += `
                            </div>
                        </div>
                    `;
                }

                listaRutinas.innerHTML = htmlEjercicios;

                // LÓGICA DE LOS BOTONES DE CRONÓMETRO EN CADA EJERCICIO
                const botonesTimer = listaRutinas.querySelectorAll('.btn-timer');
                botonesTimer.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        let tiempo = parseInt(datosPlan.descanso) || 90;
                        let textoOriginal = btn.textContent;
                        btn.disabled = true;

                        let intervalo = setInterval(() => {
                            let min = Math.floor(tiempo / 60);
                            let seg = tiempo % 60;
                            btn.textContent = `${min}:${seg < 10 ? '0' : ''}${seg}`;

                            if (tiempo <= 0) {
                                clearInterval(intervalo);
                                btn.textContent = textoOriginal;
                                btn.disabled = false;
                            }
                            tiempo--;
                        }, 1000);
                    });
                });

            }, 250);
        });
    }

    if (btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            resultadoContainer.classList.add('oculto');
            formRutina.style.display = 'block';
            verificarFavoritoGuardado();
            formRutina.reset();
        });
    }
});