document.addEventListener('DOMContentLoaded', () => {
    const formRutina = document.getElementById('form-rutina');
    const resultadoContainer = document.getElementById('resultado-container');
    const btnRegresar = document.getElementById('btn-regresar');
    const listaRutinas = document.getElementById('lista-rutinas');
    const tituloPlan = document.getElementById('titulo-plan');
    const subPlan = document.getElementById('sub-plan');

    // --- CALENDARIO DE RACHAS ---
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

    // --- FAVORITOS ---
    let rutinaActualData = null;
    let esRutinaFavoritaCargada = false;
    const seccionFavorito = document.getElementById('seccion-favorito-guardado');
    const btnGuardarFavorito = document.getElementById('btn-guardar-favorito');
    const btnCargarFavorito = document.getElementById('btn-cargar-favorito');

    function verificarFavoritoGuardado() {
        const guardada = localStorage.getItem('rutina_favorita');
        if (guardada && seccionFavorito) {
            seccionFavorito.classList.remove('oculto');
            seccionFavorito.style.display = 'block';
        } else if (seccionFavorito) {
            seccionFavorito.classList.add('oculto');
            seccionFavorito.style.display = 'none';
        }
    }
    verificarFavoritoGuardado();

    function actualizarBotonFavoritoUI() {
        if (!btnGuardarFavorito) return;
        
        if (esRutinaFavoritaCargada) {
            btnGuardarFavorito.textContent = '🗑️ Eliminar favorita';
            btnGuardarFavorito.classList.add('btn-modo-eliminar');
            btnGuardarFavorito.classList.remove('oculto');
            btnGuardarFavorito.style.display = 'inline-block';
        } else {
            btnGuardarFavorito.textContent = '⭐ Guardar en favoritos';
            btnGuardarFavorito.classList.remove('btn-modo-eliminar');
            btnGuardarFavorito.classList.remove('oculto');
            btnGuardarFavorito.style.display = 'inline-block';
        }
    }

    if (btnGuardarFavorito) {
        btnGuardarFavorito.addEventListener('click', () => {
            if (esRutinaFavoritaCargada) {
                localStorage.removeItem('rutina_favorita');
                esRutinaFavoritaCargada = false;
                alert('Rutina eliminada de favoritos.');
                resultadoContainer.classList.add('oculto');
                formRutina.style.display = 'block';
                verificarFavoritoGuardado();
            } else {
                if (rutinaActualData) {
                    localStorage.setItem('rutina_favorita', JSON.stringify(rutinaActualData));
                    esRutinaFavoritaCargada = true;
                    actualizarBotonFavoritoUI();
                    alert('¡Rutina guardada en favoritos con éxito! ⭐');
                    verificarFavoritoGuardado();
                }
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
                if(guardada.nivel && document.getElementById('nivel')) {
                    document.getElementById('nivel').value = guardada.nivel;
                }
                
                esRutinaFavoritaCargada = true;
                formRutina.dispatchEvent(new Event('submit'));
            }
        });
    }

    // --- BASE DE DATOS DE EJERCICIOS (Tiempos actualizados) ---
    const baseEjercicios = {
        musculo: {
            descanso: "180s", // 3 minutos para ganancia muscular
            dias: [
                ["Press de Banca plano (4x8-10)", "Aperturas con mancuernas (3x12)", "Press militar con barra (4x8)", "Elevaciones laterales (4x12)", "Extensiones de tríceps (3x12)"],
                ["Dominadas o Jalón al pecho (4x8-10)", "Remo con barra (4x8)", "Remo en polea baja (3x12)", "Curl de bíceps con barra (3x10)", "Curl martillo (3x12)"],
                ["Sentadilla libre (4x8)", "Prensa de pierna (4x10)", "Extensiones de cuádriceps (3x12)", "Curl femoral tumbado (3x12)", "Elevación de talones (4x15)"],
                ["Press inclinado con mancuernas (4x10)", "Cruce de poleas (3x12)", "Press Arnold (3x10)", "Fondos en paralelas (3xMAX)"],
                ["Peso muerto rumano (4x8)", "Hip thrust (4x10)", "Curl femoral sentado (3x12)", "Abdominales en polea (3x15)"]
            ]
        },
        grasa: {
            descanso: "90s", // 1 minuto y 30 segundos para pérdida de grasa
            dias: [
                ["Sentadillas con salto (4x15)", "Flexiones de pecho (4x12)", "Zancadas dinámicas (3x12 por pierna)", "Plancha abdominal (3x 45 seg)"],
                ["Burpees (4x10)", "Remo con mancuernas (4x12)", "Mountain Climbers (3x 45 seg)", "Elevaciones de piernas (3x15)"],
                ["Peso muerto con mancuernas (4x12)", "Press de hombros (4x12)", "Jumping Jacks (3x 1 min)", "Abdominales bicicleta (3x20)"],
                ["Thrusters con mancuernas (4x10)", "Dominadas asistidas (3x8)", "Sombra de boxeo o cuerda (4x 1 min)", "Plancha lateral (3x 30 seg c/u)"],
                ["Zancadas búlgaras (3x10)", "Flexiones diamante (3x10)", "Sprint estático (5x 30 seg)", "Crunches abdominales (3x20)"]
            ]
        },
        fuerza: {
            descanso: "180s", // 3 minutos para fuerza pura
            dias: [
                ["Sentadilla trasera pesada (5x5)", "Press de banca pesado (5x5)", "Dominadas lastradas (4x6)", "Face pulls (3x12)"],
                ["Peso muerto convencional (4x3-5)", "Press militar estricto (4x5)", "Remo pendlay (4x6)", "Encogimientos con barra (3x8)"],
                ["Press de banca con parada (4x5)", "Fondos con peso (4x6)", "Curl con barra olímpica (3x6)", "Extensiones de tríceps pesado (3x6)"],
                ["Sentadilla frontal (4x5)", "Prensa pesada (4x6)", "Hip thrust pesado (4x6)", "Elevación de talones pesado (4x10)"],
                ["Peso muerto rumano pesado (4x5)", "Press inclinado con barra (4x5)", "Dominadas neutras (4x6)", "Abdominales con peso (3x10)"]
            ]
        },
        tonificacion: {
            descanso: "60s",
            dias: [
                ["Sentadillas libres (4x12)", "Puente de glúteos (4x15)", "Press de hombros con mancuernas (3x12)", "Plancha abdominal (3x 45 seg)"],
                ["Zancadas estáticas (3x12)", "Curl de bíceps (3x12)", "Patada de tríceps (3x12)", "Elevaciones laterales (3x15)"],
                ["Peso muerto rumano con mancuernas (4x12)", "Aperturas de pecho (3x12)", "Remo inclinado con mancuernas (3x12)", "Abdominales en V (3x12)"],
                ["Sentadillas sumo (4x12)", "Flexiones inclinadas (3x10)", "Elevación de talones (4x20)", "Abdominales crunch (3x15)"],
                ["Zancadas caminando (3x12)", "Press Arnold liviano (3x12)", "Curl martillo (3x12)", "Plancha lateral (3x 30 seg)"]
            ]
        },
        resistencia: {
            descanso: "30s",
            dias: [
                ["Circuito: Sentadillas + Jumping Jacks + Skipping (4 rondas de 45s c/u)", "Flexiones continuas (3x máx)", "Abdominales dinámicos (3x 1 min)"],
                ["Circuito: Zancadas + Mountain Climbers + Burpees (4 rondas de 45s c/u)", "Plancha frontal con movimiento (3x 45s)"],
                ["Circuito: Sentadillas con salto + Press militar liviano + Cuerda (4 rondas)"],
                ["Circuito: Zancadas búlgaras + Flexiones abiertas + Escaladores (4 rondas)"],
                ["Circuito aeróbico completo de cuerpo entero (5 rondas de alta intensidad)"]
            ]
        },
        movilidad: {
            descanso: "30s",
            dias: [
                ["Movilidad articular de hombros y cuello (3 series)", "Rotaciones torácicas en suelo (3x10)", "Sentadilla profunda asistida (3x 45s)", "Estiramiento de cadena posterior (3x 45s)"],
                ["Apertura de caderas en posición de lagartija (3x10)", "Gato-Vaca para columna (3x15)", "Movilidad de muñecas y tobillos (3 series)"],
                ["Estiramiento de psoas y flexores de cadera (3x 45s)", "Rotaciones de tronco sentados (3x12)", "Postura del niño y cobra (3 series)"],
                ["Movilidad escapular en pared (3x12)", "Apertura de pecho y hombros (3x 45s)", "Sentadilla cosaca dinámica (3x10)"],
                ["Rutina completa de estiramientos globales y respiración diafragmática (15 mins)"]
            ]
        },
        calistenia: {
            descanso: "90s",
            dias: [
                ["Dominadas estrictas (4x max)", "Flexiones diamante (4x12)", "Australian pull-ups (4x12)", "Plancha abdominal (3x 1 min)"],
                ["Fondos en paralelas (4x8-10)", "Flexiones declinadas (4x12)", "Elevaciones de piernas colgado (3x10)", "Sentadillas pistol asistidas (3x8)"],
                ["Dominadas supinas (chin-ups) (4x8)", "Flexiones en pica para hombro (4x10)", "Remo invertido en barra (4x12)", "L-sit en suelo o paralelas (3x 20s)"],
                ["Sentadillas libres a una pierna (3x8)", "Flexiones arquero (3x8 por lado)", "Puente de glúteos a una pierna (3x12)", "Abdominales windshield wipers (3x12)"],
                ["Muscle-up o progresión de tirón (4x5)", "Fondos rusos (3x8)", "Flexiones explosivas con palmada (3x8)", "Plancha hollow body (3x 45s)"]
            ]
        }
    };

    // --- DICCIONARIO DE SUSTITUTOS ---
    const sustitutosEjercicios = {
        "Press de Banca plano (4x8-10)": ["Press con mancuernas plano (4x8-10)", "Flexiones con peso (4xMAX)", "Press en máquina (4x10)"],
        "Aperturas con mancuernas (3x12)": ["Cruce de poleas (3x12)", "Aperturas en máquina contractor (3x12)", "Flexiones abiertas (3xMAX)"],
        "Press inclinado con mancuernas (4x10)": ["Press inclinado con barra (4x8-10)", "Press en máquina inclinada (4x10)", "Flexiones declinadas (4x12)"],
        "Cruce de poleas (3x12)": ["Aperturas con mancuernas (3x12)", "Contractor de pecho (3x12)", "Flexiones en paralelas (3xMAX)"],
        "Flexiones de pecho (4x12)": ["Press declinado con mancuernas (4x10)", "Aperturas en polea (3x12)", "Fondos en máquina (3x12)"],
        "Dominadas o Jalón al pecho (4x8-10)": ["Remo en polea baja (4x10)", "Dominadas asistidas (4x8)", "Remo con mancuerna (3x10)"],
        "Remo con barra (4x8)": ["Remo con mancuerna a una mano (4x10)", "Remo en polea baja (4x10)", "Remo en punta con barra (4x8)"],
        "Remo en polea baja (3x12)": ["Remo al pecho en máquina (3x12)", "Jalón al pecho agarre neutro (3x12)", "Remo con mancuernas (3x12)"],
        "Dominadas estrictas (4x max)": ["Jalón al pecho pesado (4x10)", "Remo invertido en barra (4x12)", "Dominadas asistidas (4x8)"],
        "Sentadilla libre (4x8)": ["Prensa de pierna (4x10)", "Sentadilla Goblet con mancuerna (4x12)", "Zancadas con barra (3x10)"],
        "Prensa de pierna (4x10)": ["Sentadilla libre (4x8)", "Sentadilla Búlgara (3x10)", "Zancadas estáticas (3x12)"],
        "Extensiones de cuádriceps (3x12)": ["Zancadas caminando (3x12)", "Sentadilla Sissy (3x10)", "Prensa de piernas pies bajos (3x12)"],
        "Curl femoral tumbado (3x12)": ["Curl femoral sentado (3x12)", "Peso muerto rumano (4x10)", "Curl femoral con mancuerna (3x12)"],
        "Elevación de talones (4x15)": ["Elevación de talones sentado (4x15)", "Elevación en prensa (4x15)", "Elevación de pantorrilla a una pierna (3x20)"],
        "Peso muerto rumano (4x8)": ["Hip thrust (4x10)", "Curl femoral tumbado (3x12)", "Buenos días con barra (3x10)"],
        "Hip thrust (4x10)": ["Peso muerto rumano (4x8)", "Puente de glúteos en suelo (4x15)", "Prensa de pierna pies altos (4x10)"],
        "Press militar con barra (4x8)": ["Press con mancuernas sentado (4x8-10)", "Press Arnold (3x10)", "Press en máquina para hombros (4x10)"],
        "Elevaciones laterales (4x12)": ["Elevaciones laterales en polea (3x12)", "Elevaciones laterales con bandas (3x15)", "Remo al mentón (3x10)"],
        "Extensiones de tríceps (3x12)": ["Press francés con barra Z (3x10)", "Fondos en paralelas (3x10)", "Extensiones en polea alta con cuerda (3x12)"],
        "Curl de bíceps con barra (3x10)": ["Curl con mancuernas alterno (3x12)", "Curl en banco Scott (3x10)", "Curl martillo con mancuernas (3x12)"],
        "Curl martillo (3x12)": ["Curl con barra Z (3x10)", "Curl concentrado (3x12)", "Curl en polea baja (3x12)"],
        "Sentadillas con salto (4x15)": ["Zancadas con salto (3x12)", "Burpees (3x10)", "Sentadillas libres rápidas (4x20)"],
        "Burpees (4x10)": ["Jumping Jacks (4x 1 min)", "Mountain Climbers (4x 45 seg)", "Thrusters con peso liviano (4x10)"],
        "Plancha abdominal (3x 45 seg)": ["Plancha lateral (3x 30 seg c/u)", "Abdominales crunch (3x20)", "Elevación de piernas colgado (3x12)"]
    };

    // Función global para intercambiar ejercicio
    window.cambiarEjercicio = function(btnElemento) {
        const itemEjercicio = btnElemento.closest('.ejercicio-item');
        const spanNombre = itemEjercicio.querySelector('.nombre-ejercicio');
        if (!spanNombre) return;

        let textoActualCompleto = spanNombre.textContent.replace('•', '').trim();
        let alternativas = sustitutosEjercicios[textoActualCompleto];

        if (!alternativas || alternativas.length === 0) {
            alert("No hay alternativas directas configuradas para este ejercicio.");
            return;
        }

        let nuevaAlternativa = alternativas[0];
        
        sustitutosEjercicios[textoActualCompleto] = alternativas.slice(1);
        sustitutosEjercicios[textoActualCompleto].push(textoActualCompleto);

        spanNombre.textContent = `• ${nuevaAlternativa}`;
    };

    // --- GENERADOR ---
    if (formRutina) {
        formRutina.addEventListener('submit', (e) => {
            e.preventDefault();

            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            const edad = parseInt(document.getElementById('edad').value);
            const objetivo = document.getElementById('objetivo').value;
            const diasSeleccionados = parseInt(document.getElementById('dias').value);
            const nivelExperiencia = document.getElementById('nivel') ? document.getElementById('nivel').value : 'intermedio';

            rutinaActualData = { peso, altura, edad, objetivo, dias: diasSeleccionados, nivel: nivelExperiencia };
            
            if (!esRutinaFavoritaCargada) {
                const guardadaCheck = JSON.parse(localStorage.getItem('rutina_favorita'));
                if (guardadaCheck && guardadaCheck.objetivo === objetivo && guardadaCheck.dias === diasSeleccionados && guardadaCheck.peso === peso) {
                    esRutinaFavoritaCargada = true;
                } else {
                    esRutinaFavoritaCargada = false;
                }
            }

            actualizarBotonFavoritoUI();

            formRutina.style.display = 'none';
            if (seccionFavorito) {
                seccionFavorito.classList.add('oculto');
                seccionFavorito.style.display = 'none';
            }
            resultadoContainer.classList.remove('oculto');

            const objetivoSelect = document.getElementById('objetivo');
            const textoObjetivo = objetivoSelect.options[objetivoSelect.selectedIndex].text;

            const nivelSelect = document.getElementById('nivel');
            const textoNivel = nivelSelect ? nivelSelect.options[nivelSelect.selectedIndex].text : 'Intermedio';

            const alturaMetros = altura / 100;
            const imc = (peso / (alturaMetros * alturaMetros)).toFixed(1);
            let clasificacionImc = "Peso normal";
            if (imc < 18.5) clasificacionImc = "Bajo peso";
            else if (imc >= 25 && imc < 30) clasificacionImc = "Sobrepeso";
            else if (imc >= 30) clasificacionImc = "Obesidad";

            tituloPlan.textContent = `Plan: ${textoObjetivo}`;
            // MEJORA APLICADA: Se añadió explícitamente la altura junto al peso, edad, nivel, IMC y días.
            subPlan.textContent = `Edad: ${edad} años | Peso: ${peso}kg | Altura: ${altura}cm | Nivel: ${textoNivel} | IMC: ${imc} (${clasificacionImc}) | ${diasSeleccionados} Días/sem`;

            let tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5; 
            let factorActividad = diasSeleccionados >= 5 ? 1.725 : (diasSeleccionados >= 3 ? 1.55 : 1.375);
            let caloriasObjetivo = Math.round(tmb * factorActividad);
            
            if (objetivo === 'grasa') caloriasObjetivo -= 400;
            if (objetivo === 'musculo' || objetivo === 'fuerza') caloriasObjetivo += 300;

            let gramosProteina = Math.round(peso * 2.0);
            let gramosGrasa = Math.round((caloriasObjetivo * 0.25) / 9);
            let gramosCarbos = Math.round((caloriasObjetivo - (gramosProteina * 4) - (gramosGrasa * 9)) / 4);

            const datosPlan = baseEjercicios[objetivo] || baseEjercicios['musculo'];
            
            let tiempoDescansoFinal = datosPlan.descanso;
            
            listaRutinas.innerHTML = `<p style="text-align: center; padding: 10px;">Generando tu plan personalizado...</p>`;
            
            setTimeout(() => {
                let htmlContenido = `
                    <div class="dia-card tarjeta-nutricion">
                        <h4 style="color: var(--primary, #38bdf8); margin-bottom: 12px;">🥗 Tu Meta Nutricional Diaria</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px;">
                            <div class="ejercicio-item" style="margin:0;">🔥 <strong>Calorías:</strong> ~${caloriasObjetivo} kcal</div>
                            <div class="ejercicio-item" style="margin:0;">🥩 <strong>Proteínas:</strong> ~${gramosProteina} g</div>
                            <div class="ejercicio-item" style="margin:0;">🥑 <strong>Grasas:</strong> ~${gramosGrasa} g</div>
                            <div class="ejercicio-item" style="margin:0;">🥔 <strong>Carbohidratos:</strong> ~${gramosCarbos} g</div>
                        </div>
                    </div>
                `;

                for(let i = 0; i < diasSeleccionados; i++) {
                    const ejerciciosDelDia = datosPlan.dias[i % datosPlan.dias.length];
                    
                    htmlContenido += `
                        <div class="dia-card">
                            <h4>Día ${i + 1}: Fuerza y Rendimiento - Bloque ${i + 1}</h4>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                    `;

                    ejerciciosDelDia.forEach(ejercicio => {
                        htmlContenido += `
                            <div class="ejercicio-item" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                                <span class="nombre-ejercicio" style="flex: 1; min-width: 180px;">• ${ejercicio}</span>
                                <div style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
                                    <button onclick="cambiarEjercicio(this)" class="btn-secundario" style="padding: 4px 8px; font-size: 0.75rem; cursor: pointer;" title="Cambiar ejercicio">🔄 Cambiar</button>
                                    <button class="btn-timer" style="background: var(--primary, #38bdf8); color: #0b131e; border: none; padding: 4px 10px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">⏱️ ${tiempoDescansoFinal}</button>
                                    <input type="checkbox" class="check-ejercicio" style="width: 18px; height: 18px; cursor: pointer;">
                                </div>
                            </div>
                        `;
                    });

                    htmlContenido += `
                            </div>
                        </div>
                    `;
                }

                listaRutinas.innerHTML = htmlContenido;

                const barraGlobal = document.getElementById('barra-cronometro-global');
                const textoGlobal = document.getElementById('tiempo-global-texto');
                let intervaloGlobal = null;

                const botonesTimer = listaRutinas.querySelectorAll('.btn-timer');
                botonesTimer.forEach(btn => {
                    btn.addEventListener('click', () => {
                        let segundosTotales = parseInt(tiempoDescansoFinal) || 90;
                        let textoOriginal = btn.textContent;
                        btn.disabled = true;

                        const ejercicioItem = btn.closest('.ejercicio-item');
                        
                        const checkbox = ejercicioItem.querySelector('.check-ejercicio');
                        if (checkbox) checkbox.checked = true;

                        let alertaExistente = ejercicioItem.querySelector('.alerta-descanso-terminado');
                        if (alertaExistente) alertaExistente.remove();

                        if (barraGlobal) {
                            barraGlobal.style.background = 'linear-gradient(135deg, #0ea5e9, #2563eb)';
                            barraGlobal.classList.add('activo');
                        }

                        if (intervaloGlobal) clearInterval(intervaloGlobal);

                        intervaloGlobal = setInterval(() => {
                            let min = Math.floor(segundosTotales / 60);
                            let seg = segundosTotales % 60;
                            let tiempoFormateado = `${min}:${seg < 10 ? '0' : ''}${seg}`;
                            
                            btn.textContent = tiempoFormateado;
                            if (textoGlobal) textoGlobal.textContent = tiempoFormateado;

                            if (segundosTotales <= 0) {
                                clearInterval(intervaloGlobal);
                                btn.textContent = textoOriginal;
                                btn.disabled = false;

                                if (barraGlobal) {
                                    barraGlobal.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                                    if (textoGlobal) textoGlobal.textContent = '¡TIEMPO TERMINADO! 💪';
                                }

                                const aviso = document.createElement('div');
                                aviso.className = 'alerta-descanso-terminado';
                                aviso.style.width = '100%';
                                aviso.innerHTML = '🔥 ¡TIEMPO TERMINADO! ¡A darle con todo a la siguiente serie! 💪';
                                ejercicioItem.appendChild(aviso);

                                setTimeout(() => {
                                    if (barraGlobal) barraGlobal.classList.remove('activo');
                                    if (aviso) {
                                        aviso.style.transition = 'opacity 0.5s ease';
                                        aviso.style.opacity = '0';
                                        setTimeout(() => aviso.remove(), 500);
                                    }
                                }, 5000);
                            }
                            segundosTotales--;
                        }, 1000);
                    });
                });

            }, 200);
        });
    }

    if (btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            esRutinaFavoritaCargada = false;
            actualizarBotonFavoritoUI();
            resultadoContainer.classList.add('oculto');
            formRutina.style.display = 'block';
            verificarFavoritoGuardado();
            formRutina.reset();
        });
    }
});