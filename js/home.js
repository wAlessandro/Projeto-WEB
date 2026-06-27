const usuarioLogado =
JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuarioLogado) {
    window.location.href = "login.html";
}

document.getElementById("nomeUsuario").innerText =
    usuarioLogado.usuario;

if (usuarioLogado.tipo === "vendedor") {

    document.getElementById("menuVendedor").innerHTML = `

        <a
            href="minhas-pecas.html"
            class="btn btn-success btn-sm me-2">

            Minhas Peças
        </a>

        <a
            href="perfil.html"
            class="btn btn-warning btn-sm me-2">

            Meu Perfil
        </a>

    `;
}

function pesquisarPecas() {

    const busca =
    document.getElementById("buscaPeca")
    .value
    .trim()
    .toLowerCase();

    const pecas =
    JSON.parse(
        localStorage.getItem("pecas")
    ) || [];

    const div =
    document.getElementById("resultadoPecas");

    div.innerHTML = "";

    if (busca === "") {

        div.innerHTML =
        "<p>Digite algo para pesquisar.</p>";

        return;
    }

    const resultado =
    pecas.filter(peca =>

        peca.titulo &&
        peca.titulo.toLowerCase().includes(busca)

    );

    if (resultado.length === 0) {

        div.innerHTML =
        "<p>Nenhuma peça encontrada.</p>";

        return;
    }

    resultado.forEach(peca => {

        div.innerHTML += `

        <div class="col-md-4 mb-3">

            <div class="card shadow">

                <img
                    src="${peca.imagem}"
                    class="card-img-top img-card">

                <div class="card-body">

                    <h5>${peca.titulo}</h5>

                    <p>${peca.descricao}</p>

                    <p><strong>R$ ${peca.preco}</strong></p>

                    <a
                        href="perfil.html?id=${peca.vendedorId}"
                        class="btn btn-primary">

                        Visualizar Vendedor
                    </a>

                </div>

            </div>

        </div>

        `;
    });
}

function pesquisarVendedores() {

    const busca =
    document.getElementById("buscaVendedor")
    .value
    .trim()
    .toLowerCase();

    const usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const vendedores =
    usuarios.filter(usuario =>

        usuario.tipo === "vendedor"

        &&

        usuario.usuario
        .toLowerCase()
        .includes(busca)

    );

    const div =
    document.getElementById("resultadoVendedores");

    div.innerHTML = "";

    if (vendedores.length === 0) {

        div.innerHTML = `
            <p>Nenhum vendedor encontrado.</p>
        `;

        return;
    }

    vendedores.forEach(vendedor => {

        div.innerHTML += `

        <div class="col-md-4 mb-3">

            <div class="card shadow">

                <div class="card-body">

                    <h5>
                        ${vendedor.usuario}
                    </h5>

                    <a
                        href="perfil.html?id=${vendedor.id}"
                        class="btn btn-primary">

                        Ver Perfil
                    </a>

                </div>

            </div>

        </div>

        `;
    });
}