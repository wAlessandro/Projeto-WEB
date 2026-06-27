const usuario =
JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuario) {
    window.location.href = "login.html";
}

let pecas =
JSON.parse(
    localStorage.getItem("pecas")
) || [];

function salvarLocal() {

    localStorage.setItem(
        "pecas",
        JSON.stringify(pecas)
    );
}

function salvarPeca() {

    const titulo =
    document.getElementById("titulo").value.trim();

    const descricao =
    document.getElementById("descricao").value.trim();

    const preco =
    document.getElementById("preco").value;

    const imagem =
    document.getElementById("imagem").files[0];

    if (!titulo || !descricao || !preco || !imagem) {

        alert("Preencha todos os campos.");

        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (e) {

        pecas.push({

            id: Date.now(),

            vendedorId: usuario.id,

            titulo,

            descricao,

            preco,

            imagem: e.target.result

        });

        salvarLocal();

        alert("Peça cadastrada.");

        window.location.href =
        "minhas-pecas.html";
    };

    leitor.readAsDataURL(imagem);
}

function carregarMinhasPecas() {

    const div =
    document.getElementById("listaPecas");

    if (!div) return;

    div.innerHTML = "";

    const minhasPecas =
    pecas.filter(

        p => p.vendedorId === usuario.id

    );

    minhasPecas.forEach(peca => {

        div.innerHTML += `

        <div class="col-md-4 mb-3">

            <div class="card shadow">

                <img src="${peca.imagem}"
                     class="card-img-top img-card">

                <div class="card-body">

                    <h5>${peca.titulo}</h5>

                    <p>R$ ${peca.preco}</p>

                    <a href="editar-peca.html?id=${peca.id}"
                       class="btn btn-primary btn-sm">

                        Editar
                    </a>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="excluirPeca(${peca.id})">

                        Excluir
                    </button>

                </div>

            </div>

        </div>

        `;
    });
}

function excluirPeca(id) {

    if (!confirm("Deseja excluir esta peça?")) {
        return;
    }

    pecas =
    pecas.filter(p => p.id !== id);

    salvarLocal();

    carregarMinhasPecas();
}

function carregarEdicao() {

    const formularioTitulo =
    document.getElementById("titulo");

    if (!formularioTitulo) return;

    const parametros =
    new URLSearchParams(window.location.search);

    const id =
    parametros.get("id");

    if (!id) return;

    const peca =
    pecas.find(

        p => p.id === Number(id)

    );

    if (!peca) {

        alert("Peça não encontrada.");

        window.location.href =
        "minhas-pecas.html";

        return;
    }

    document.getElementById("titulo").value =
    peca.titulo;

    document.getElementById("descricao").value =
    peca.descricao;

    document.getElementById("preco").value =
    peca.preco;
}

function atualizarPeca() {

    const parametros =
    new URLSearchParams(window.location.search);

    const id =
    Number(parametros.get("id"));

    const peca =
    pecas.find(p => p.id === id);

    if (!peca) return;

    peca.titulo =
    document.getElementById("titulo").value.trim();

    peca.descricao =
    document.getElementById("descricao").value.trim();

    peca.preco =
    document.getElementById("preco").value;

    salvarLocal();

    alert("Peça atualizada.");

    window.location.href =
    "minhas-pecas.html";
}

carregarMinhasPecas();

carregarEdicao();