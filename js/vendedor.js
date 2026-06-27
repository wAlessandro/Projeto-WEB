const perfis =
JSON.parse(
localStorage.getItem(
"perfis"
)
)
||
[];

const usuarios =
JSON.parse(
localStorage.getItem(
"usuarios"
)
)
||
[];

const pecas =
JSON.parse(
localStorage.getItem(
"pecas"
)
)
||
[];

const usuarioLogado =
JSON.parse(
localStorage.getItem(
"usuarioLogado"
)
);

function salvarPerfil(){

    const contato =
    document.getElementById(
    "contato"
    ).value;

    const local =
    document.getElementById(
    "local"
    ).value;

    const descricao =
    document.getElementById(
    "descricao"
    ).value;

    const arquivo =
    document.getElementById(
    "foto"
    ).files[0];

    if(
        !contato ||
        !local ||
        !descricao
    ){

        alert(
        "Preencha todos os campos."
        );

        return;
    }

    if(!arquivo){

        alert(
        "Escolha uma foto."
        );

        return;
    }

    const leitor =
    new FileReader();

    leitor.onload =
    function(e){

        const perfil = {

            usuarioId:
            usuarioLogado.id,

            foto:
            e.target.result,

            contato,

            local,

            descricao

        };

        const outros =
        perfis.filter(

        p =>

        p.usuarioId !==
        usuarioLogado.id

        );

        outros.push(
        perfil
        );

        localStorage.setItem(

        "perfis",

        JSON.stringify(
        outros
        )

        );

        alert(
        "Perfil salvo."
        );

        window.location =
        "home-vendedor.html";

    }

    leitor.readAsDataURL(
    arquivo
    );

}

function carregarPeca(){

    const id =
    Number(
    localStorage.getItem(
    "pecaAtual"
    )
    );

    const peca =
    pecas.find(
    p => p.id === id
    );

    if(
    !peca
    ) return;

    const div =
    document.getElementById(
    "conteudoPeca"
    );

    if(!div) return;

    div.innerHTML = `

    <div class="card">

        <img
        src="${peca.imagem}"

        class="card-img-top">

        <div class="card-body">

            <h2>
            ${peca.titulo}
            </h2>

            <h4>
            R$ ${peca.preco}
            </h4>

            <p>
            ${peca.descricao}
            </p>

            <p>

            <strong>
            Contato:
            </strong>

            ${peca.contato}

            </p>

            <p>

            <strong>
            Local:
            </strong>

            ${peca.local}

            </p>

            <button

            class="
            btn btn-primary"

            onclick="
            abrirPerfil(
            ${peca.vendedorId}
            )">

            Ver vendedor

            </button>

        </div>

    </div>

    `;

}

function abrirPerfil(id){

    localStorage.setItem(
    "perfilAtual",
    id
    );

    window.location =
    "perfil-vendedor.html";

}

function carregarPerfil(){

    const vendedorId =
    Number(
    localStorage.getItem(
    "perfilAtual"
    )
    );

    const usuario =
    usuarios.find(

    u =>

    u.id ===
    vendedorId

    );

    const perfil =
    perfis.find(

    p =>

    p.usuarioId ===
    vendedorId

    );

    const div =
    document.getElementById(
    "perfilVendedor"
    );

    if(!div) return;

    div.innerHTML = `

    <div class="text-center">

        <img

        src="${
        perfil?.foto
        ||
        'https://via.placeholder.com/200'
        }"

        class="perfil-foto">

        <h2>
        ${usuario.usuario}
        </h2>

        <p>

        <strong>
        Contato:
        </strong>

        ${
        perfil?.contato
        || ''
        }

        </p>

        <p>

        <strong>
        Local:
        </strong>

        ${
        perfil?.local
        || ''
        }

        </p>

        <p>

        ${
        perfil?.descricao
        || ''
        }

        </p>

    </div>

    `;

    carregarPecasVendedor(
    vendedorId
    );

}

function carregarPecasVendedor(id){

    const lista =

    pecas.filter(

    p =>

    p.vendedorId === id

    );

    const div =
    document.getElementById(
    "pecasVendedor"
    );

    if(!div) return;

    div.innerHTML = "";

    lista.forEach(peca => {

    div.innerHTML += `

    <div
    class="col-md-4 mb-3">

        <div

        class="card"

        onclick="
        abrirPeca(
        ${peca.id}
        )
        ">

            <img
            src="${peca.imagem}"
            class="card-img-top">

            <div
            class="card-body">

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

}

function abrirPeca(id){

    localStorage.setItem(
    "pecaAtual",
    id
    );

    window.location =
    "peca.html";

}

carregarPeca();
carregarPerfil();