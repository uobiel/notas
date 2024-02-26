const botaoVoltar = document.querySelector('#voltar');
const formulario = document.querySelector("#formulario");
const adicionar = document.querySelector("#adicionar");
const adicionarNota = document.querySelector("#adicionar-nota");
const sessao2 = document.querySelector(".section2");
const alertaSemNotas = document.querySelector('#alerta-sem-notas');
const alertaCriandoNota = document.querySelector('#alerta-criando-nota');
const modal = document.querySelector("#fade");
const excluir = document.querySelector("#excluir");
const notas = [];
let notaId = 1; // Inicializando o ID da nota

if (notas.length === 0) {
    displaySemNotas();
} else {
    displayComNotas();
}

adicionarNota.addEventListener('click', function() {
    const obs = document.querySelector("#obs");
    const nome = document.querySelector("#nome");
    const nota = document.querySelector("#nota");
    alertaCriandoNota.style.display = 'block';
    alertaSemNotas.style.display = 'none';
    obs.value = '';
    nome.value = '';
    nota.value = '';
    if(notas.length > 0){
        alertaCriandoNota.style.display = 'none';
    }
    displaysTelaForm();
});

adicionar.addEventListener('click', function() {
    const obs = document.querySelector("#obs").value;
    const nome = document.querySelector("#nome").value;
    const notaTexto = document.querySelector("#nota").value;

    if (nome === '' || notaTexto === '') {
        alert('Preencha os campos corretamente.');
    } else {
        const nota = {
            id: notaId++,
            nomeNota: nome,
            obsNota: obs,
            notaD: notaTexto,
        };
        notas.push(nota);
        console.log(notas);
        displayComNotas();
        renderizarNota(nota);
        alertaCriandoNota.style.display = 'none';
    }
});

botaoVoltar.addEventListener('click', function() {
    if (notas.length === 0) {
        displaySemNotas();
    } else {
        displayComNotas();
    }
});

excluir.addEventListener('click', function() {
    const id = parseInt(modal.dataset.notaId);
    const index = notas.findIndex(nota => nota.id === id);
    if (index !== -1) {
        notas.splice(index, 1);
        renderizarNotas();
        $('#fade').modal('hide');
    }
});

function displaySemNotas() {
    adicionarNota.style.display = 'block';
    adicionar.style.display = 'none';
    botaoVoltar.style.display = 'none';
    formulario.style.display = 'none';
    sessao2.style.display = 'none';
    alertaSemNotas.style.display = 'block';
    alertaCriandoNota.style.display = 'none';
}

function displayComNotas() {
    adicionarNota.style.display = 'block';
    adicionar.style.display = 'none';
    botaoVoltar.style.display = 'none';
    formulario.style.display = 'none';
    sessao2.style.display = 'block';
    alertaSemNotas.style.display = 'none';
    alertaCriandoNota.style.display = 'none';
}

function displaysTelaForm() {
    adicionarNota.style.display = 'none';
    adicionar.style.display = 'block';
    botaoVoltar.style.display = 'block';
    formulario.style.display = 'block';
    sessao2.style.display = 'none';
}

function renderizarNota(nota) {
    const notaDiv = document.createElement('div');
    notaDiv.className = "accordion mt-3";
    notaDiv.id = `accordionExample${nota.id}`;
    notaDiv.innerHTML = `
        <div class="card">
            <div class="card-header" id="heading${nota.id}">
                <h5 class="mb-0 d-flex justify-content-between">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${nota.id}" aria-expanded="true" aria-controls="collapse${nota.id}">
                        ${nota.nomeNota}
                    </button>
                    <button class="btn btn-danger btn-remover-nota" data-toggle="modal" data-target="#fade" data-nota-id="${nota.id}"><i class="bi bi-trash"></i></button>
                </h5>
            </div>
            <div id="collapse${nota.id}" class="collapse" aria-labelledby="heading${nota.id}" data-parent="#accordionExample${nota.id}">

                <div class="card-obs text-center">
                    ${nota.obsNota}
                </div>
                <div class="card-body">
                    ${nota.notaD}
                </div>
            </div>
        </div>
    `;
    sessao2.appendChild(notaDiv);

    // Adicionando evento de clique ao botão de remover nota
    const btnRemoverNota = notaDiv.querySelector('.btn-remover-nota');
    btnRemoverNota.addEventListener('click', function() {
        const id = parseInt(btnRemoverNota.dataset.notaId);
        modal.dataset.notaId = id;
        $('#fade').modal('show');
    });
}

function renderizarNotas() {
    sessao2.innerHTML = '';
    notas.forEach(nota => renderizarNota(nota));

    if(notas.length === 0){
        displaySemNotas();
    } 
}

sessao2.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-remover-nota')) {
        const id = parseInt(event.target.dataset.notaId);
        modal.dataset.notaId = id;
        $('#fade').modal('show');
    }
});