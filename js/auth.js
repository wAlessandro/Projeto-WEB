function obterUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function cadastrar() {

    const usuario = document.getElementById("usuario").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const tipo = document.getElementById("tipo").value;

    if (!usuario || !senha || !tipo) {
        alert("Preencha todos os campos.");
        return;
    }

    const usuarios = obterUsuarios();

    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        alert("Usuário já cadastrado.");
        return;
    }

    const novoUsuario = {
        id: Date.now(),
        usuario,
        senha,
        tipo
    };

    usuarios.push(novoUsuario);

    salvarUsuarios(usuarios);

    alert("Cadastro realizado com sucesso.");

    window.location.href = "login.html";
}

function login() {

    const usuario = document.getElementById("usuario").value.trim();

    const senha = document.getElementById("senha").value.trim();

    const usuarios = obterUsuarios();

    const encontrado = usuarios.find(u =>
        u.usuario === usuario &&
        u.senha === senha
    );

    if (!encontrado) {
        alert("Usuário ou senha inválidos.");
        return;
    }

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(encontrado)
    );

    window.location.href = "home.html";
}

function sair() {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "login.html";
}