const usuarioLogado =
JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuarioLogado) {

    window.location.href =
    "login.html";
}

let usuarioSelecionado = null;

function pesquisarVendedoresAdmin() {

    const busca =
    document.getElementById("pesquisaAdmin")
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
    document.getElementById("listaUsuarios");

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

                    <button
                        class="btn btn-danger"
                        onclick="abrirModal(${vendedor.id})">

                        Excluir
                    </button>

                </div>

            </div>

        </div>

        `;
    });
}

function abrirModal(id) {

    usuarioSelecionado = id;

    const modal =
    new bootstrap.Modal(

        document.getElementById(
            "modalExcluir"
        )

    );

    modal.show();
}

function confirmarExclusao() {

    let usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    let perfis =
    JSON.parse(
        localStorage.getItem("perfis")
    ) || [];

    let pecas =
    JSON.parse(
        localStorage.getItem("pecas")
    ) || [];

    usuarios =
    usuarios.filter(

        u => u.id !== usuarioSelecionado

    );

    perfis =
    perfis.filter(

        p => p.usuarioId !== usuarioSelecionado

    );

    pecas =
    pecas.filter(

        p => p.vendedorId !== usuarioSelecionado

    );

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.setItem(
        "perfis",
        JSON.stringify(perfis)
    );

    localStorage.setItem(
        "pecas",
        JSON.stringify(pecas)
    );

    alert("Vendedor excluído.");

    location.reload();
}