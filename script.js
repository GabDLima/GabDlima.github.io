// Contador
function updateContador() {
    const startDate = new Date('2022-06-16');
    const now = new Date();
    const diff = now - startDate;

    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('contador').textContent = 
        `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}

setInterval(updateContador, 1000);

// Galeria de fotos automática
let currentFoto = 0;
const fotos = document.querySelectorAll('.foto');
const totalFotos = fotos.length;

function showNextFoto() {
    fotos[currentFoto].style.display = 'none';
    currentFoto = (currentFoto + 1) % totalFotos;
    fotos[currentFoto].style.display = 'block';
}

setInterval(showNextFoto, 10000); // Troca a cada 3 segundos

// Controles de volume da música
const volumeControl = document.getElementById('volume');
const backgroundMusic = document.getElementById('background-music');

// Ajustar volume inicial
backgroundMusic.volume = volumeControl.value;

// Atualizar volume com o controle
volumeControl.addEventListener('input', function() {
    backgroundMusic.volume = volumeControl.value;
});

// Função para tocar música
document.getElementById('play-music').addEventListener('click', function() {
    backgroundMusic.play();
});
