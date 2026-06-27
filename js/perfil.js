const usuarioLogado =
JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuarioLogado) {

    window.location.href =
    "login.html";
}

const usuarios =
JSON.parse(
    localStorage.getItem("usuarios")
) || [];

const perfis =
JSON.parse(
    localStorage.getItem("perfis")
) || [];

const pecas =
JSON.parse(
    localStorage.getItem("pecas")
) || [];

const parametros =
new URLSearchParams(window.location.search);

const idPerfil =
Number(parametros.get("id"))
||
usuarioLogado.id;

const usuarioPerfil =
usuarios.find(
    u => u.id === idPerfil
);

if (!usuarioPerfil) {

    alert("Perfil não encontrado.");

    window.location.href =
    "home.html";
}

let perfil =
perfis.find(
    p => p.usuarioId === idPerfil
);

if (!perfil) {

    perfil = {

        usuarioId: idPerfil,

        contato: "",

        cidade: "",

        descricao: "",

        foto: ""
    };
}

document.getElementById("nomePerfil").innerText =
usuarioPerfil.usuario;

document.getElementById("contatoPerfil").innerText =
perfil.contato || "Não informado";

document.getElementById("cidadePerfil").innerText =
perfil.cidade || "Não informada";

document.getElementById("descricaoPerfil").innerText =
perfil.descricao || "Sem descrição.";

if (perfil.foto) {

    document.getElementById("fotoPerfil").src =
    perfil.foto;
}

if (usuarioLogado.id === idPerfil &&
    usuarioLogado.tipo === "vendedor") {

    document.getElementById("areaEdicao").innerHTML = `

        <hr>

        <h4>Editar Perfil</h4>

        <input
            type="file"
            id="novaFoto"
            class="form-control mb-2">

        <input
            type="text"
            id="novoContato"
            class="form-control mb-2"
            placeholder="Contato"
            value="${perfil.contato}">

        <input
            type="text"
            id="novaCidade"
            class="form-control mb-2"
            placeholder="Cidade"
            value="${perfil.cidade}">

        <textarea
            id="novaDescricao"
            class="form-control mb-2"
            placeholder="Descrição">${perfil.descricao}</textarea>

        <button
            class="btn btn-success"
            onclick="salvarPerfil()">

            Salvar Alterações
        </button>

    `;
}

function salvarPerfil() {

    const contato =
    document.getElementById("novoContato").value.trim();

    const cidade =
    document.getElementById("novaCidade").value.trim();

    const descricao =
    document.getElementById("novaDescricao").value.trim();

    const arquivo =
    document.getElementById("novaFoto").files[0];

    function finalizar(fotoBase64) {

        const perfisAtualizados =
        perfis.filter(
            p => p.usuarioId !== usuarioLogado.id
        );

        perfisAtualizados.push({

            usuarioId: usuarioLogado.id,

            contato,

            cidade,

            descricao,

            foto: fotoBase64
        });

        localStorage.setItem(
            "perfis",
            JSON.stringify(perfisAtualizados)
        );

        alert("Perfil atualizado.");

        location.reload();
    }

    if (arquivo) {

        const leitor =
        new FileReader();

        leitor.onload =
        function(e) {

            finalizar(
                e.target.result
            );
        };

        leitor.readAsDataURL(arquivo);

    } else {

        finalizar(perfil.foto);
    }
}

const pecasVendedor =
pecas.filter(
    p => p.vendedorId === idPerfil
);

const div =
document.getElementById("pecasPerfil");

pecasVendedor.forEach(peca => {

    div.innerHTML += `

    <div class="col-md-4 mb-3">

        <div class="card shadow">

            <img
                src="${peca.imagem}"
                class="card-img-top img-card">

            <div class="card-body">

                <h5>
                    ${peca.titulo}
                </h5>

                <p>
                    R$ ${peca.preco}
                </p>

            </div>

        </div>

    </div>

    `;
});

if (pecasVendedor.length === 0) {

    div.innerHTML = `
        <p>Este vendedor ainda não possui anúncios.</p>
    `;
}