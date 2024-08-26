// Função para calcular o tempo desde 16 de junho de 2022
function atualizarContador() {
    const dataInicio = new Date("June 16, 2022 00:00:00");
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();
    let horas = agora.getHours() - dataInicio.getHours();
    let minutos = agora.getMinutes() - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    // Ajustes para meses, dias e horas negativos
    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        const ultimoDiaDoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaDoMesAnterior;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    // Atualiza o HTML do contador
    document.getElementById('contador').innerHTML = 
        `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);

// Função para alterar as fotos automaticamente
let indexFotoAtual = 0;
const fotos = document.querySelectorAll('.foto');

function alterarFotos() {
    fotos[indexFotoAtual].style.opacity = 0; // Desaparece a foto atual

    indexFotoAtual = (indexFotoAtual + 1) % fotos.length; // Próxima foto

    fotos[indexFotoAtual].style.opacity = 1; // Aparece a próxima foto
}

setInterval(alterarFotos, 5000); // Altera a cada 5 segundos
