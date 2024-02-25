const botaoVoltar = document.querySelector('#voltar');
const formulario = document.querySelector("#formulario");
const adicionar = document.querySelector("#adicionar");
const adicionarNota = document.querySelector("#adicionar-nota");
const sessao1 = document.querySelector(".section1");
const sessao2 = document.querySelector(".section2");
const alertaSemNotas = document.querySelector('#alerta-sem-notas');

const notas = [];

if (notas.length === 0) {
    displaySemNotas();
} else {
    displayComNotas();
}

adicionarNota.addEventListener('click', function() {
    const obs = document.querySelector("#obs");
    const nome = document.querySelector("#nome");
    const nota = document.querySelector("#nota");
    obs.value = '';
    nome.value = '';
    nota.value = '';
    displaysTelaForm();
});

adicionar.addEventListener('click', function() {
    const obs = document.querySelector("#obs").value;
    const nome = document.querySelector("#nome").value;
    const nota = document.querySelector("#nota").value;

    if (nome === '' || nota === '') {
        alert('Preencha os campos corretamente.');
    } else {
        const notaDb = {
            nomeNota: nome,
            obsNota: obs,
            notaD: nota,
        };
        notas.push(notaDb);
        console.log(notas);
        displayComNotas();
        renderizarNota(notaDb, notas.length - 1);
    }
});

botaoVoltar.addEventListener('click', function() {
    if(notas.length === 0){
        displaySemNotas();
    }else {
        displayComNotas();
    }
});

function displaySemNotas() {
    adicionarNota.style.display = 'block';
    adicionar.style.display = 'none';
    botaoVoltar.style.display = 'none';
    formulario.style.display = 'none';
    sessao2.style.display = 'none';
    alertaSemNotas.style.display = 'block';
}

function displayComNotas() {
    adicionarNota.style.display = 'block';
    adicionar.style.display = 'none';
    botaoVoltar.style.display = 'none';
    formulario.style.display = 'none';
    sessao2.style.display = 'block';
    alertaSemNotas.style.display = 'none';
}

function displaysTelaInicial() {
    adicionarNota.style.display = 'block';
    adicionar.style.display = 'none';
    botaoVoltar.style.display = 'none';
    formulario.style.display = 'none';
}

function displaysTelaForm() {
    adicionarNota.style.display = 'none';
    adicionar.style.display = 'block';
    botaoVoltar.style.display = 'block';
    formulario.style.display = 'block';
    sessao2.style.display = 'none';
}

function renderizarNota(nota, index) {
    sessao2.innerHTML += `
        <div class="accordion mt-3" id="accordionExample${index}">
            <div class="card">
                <div class="card-header" id="heading${index}">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            ${nota.nomeNota}
                        </button>
                    </h5>
                </div>
                <div id="collapse${index}" class="collapse show" aria-labelledby="heading${index}" data-parent="#accordionExample${index}">
                    <div class="card-obs text-center">
                        ${nota.obsNota}
                    </div>
                    <div class="card-body">
                        ${nota.notaD}
                    </div>
                </div>
            </div>
        </div>
    `;
}