camposForm = {
    txtRegistrosPonto: document.getElementById("registrosPonto"),
    txtMatriculasServidores: document.getElementById("matServidores"),
    txtMatriculasTerceirizados: document.getElementById("matTerceirizados")
};

var arrayRegistrosPonto;
var arrayMatriculasUnicas;
var containerListaMatriculasUnicas = document.getElementById("containerListaMatriculasUnicas");

function obterDadosTextArea() {
    arrayRegistrosPonto = camposForm.txtRegistrosPonto.value.split("\n");
    arrayRegistrosPonto = arrayRegistrosPonto.filter(function(registro) {
        return registro.trim().length === 33;
    })
}

function separarMatriculas() {
    if (arrayRegistrosPonto.length === 0) {
        alert("Nenhum registro a separar.");
        return;
    }

    if (arrayMatriculasUnicas.length === 0) {
        alert("Nenhuma matrícula a ser utilizada na separação.");
        return;
    }

    var qtdeServidores = 0;
    var qtdeTerceirizados = 0;
    for (var i = 0; i < arrayMatriculasUnicas.length; i++) {
        if (arrayMatriculasUnicas[i].tipo === "servidor") {
            qtdeServidores++;
            continue;
        }
        if (arrayMatriculasUnicas[i].tipo === "terceirizado") {
            qtdeTerceirizados++;
        }
    }

    if (qtdeServidores === 0) {
        alert("Todas as matrículas são do tipo TERCEIRIZADO, nada a separar.");
        return;
    }
    if (qtdeTerceirizados === 0) {
        alert("Todas as matrículas são do tipo SERVIDOR, nada a separar.");
        return;
    }

    var arrayRegistroPontoServidor = arrayRegistrosPonto.filter(function(registroPonto) {
        var isRegistroServidor = false;
        var matriculaRegistro = registroPonto.substr(9, 6);
        for (var i = 0; i < arrayMatriculasUnicas.length; i++) {
            if (arrayMatriculasUnicas[i].tipo === "servidor") {
                if (matriculaRegistro.includes(arrayMatriculasUnicas[i].matricula)) {
                    isRegistroServidor = true;
                    break;
                }
            }
        }
        return isRegistroServidor;
    });

    var arrayRegistroPontoTerceirizado = arrayRegistrosPonto.filter(function(registroPonto) {
        var isRegistroTerceirizado = false;
        var matriculaRegistro = registroPonto.substr(9, 6);
        for (var i = 0; i < arrayMatriculasUnicas.length; i++) {
            if (arrayMatriculasUnicas[i].tipo === "terceirizado") {
                if (matriculaRegistro.includes(arrayMatriculasUnicas[i].matricula)) {
                    isRegistroTerceirizado = true;
                    break;
                }
            }
        }
        return isRegistroTerceirizado;
    });

    var btnDownloadServidores = document.getElementById("downloadServidores");
    btnDownloadServidores.setAttribute('href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(gerarTextoDownload(arrayRegistroPontoServidor)));
    btnDownloadServidores.setAttribute('download', 'registros_servidor_' + Date.now());

    var btnDownloadTerceirizados = document.getElementById("downloadTerceirizados");
    btnDownloadTerceirizados.setAttribute('href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(gerarTextoDownload(arrayRegistroPontoTerceirizado)));
    btnDownloadTerceirizados.setAttribute('download', 'registros_terceirizado_' + Date.now());

    document.getElementById("modalDownload").style.display = 'block';
}

function gerarTextoDownload(arrayRegistros) {
    var texto = "";
    for (var i = 0; i < arrayRegistros.length; i++) {
        texto += arrayRegistros[i] + "\n"
    }
    return texto;
}

function consertarMatricula(arrayMatricula) {
    for (var i = 0; i < arrayMatricula.length; i++) {
        arrayMatricula[i] = "000000" + arrayMatricula[i];
        arrayMatricula[i] = arrayMatricula[i].slice(-6);
    }
}

function identificarRegistrosDesconhecidos(arrayRegistrosPonto, arrayRegistrosServidores, arrayRegistrosTerceirizados) {
    var arrayRegistrosDesconhecidos = arrayRegistrosPonto.filter(function (registroPonto) {
        var isRegistroDesconhecido = true;
        for (var i = 0; i < arrayRegistrosServidores.length; i++) {
            if (registroPonto === arrayRegistrosServidores[i]) {
                isRegistroDesconhecido = false;
                break;
            }
        }

        if (isRegistroDesconhecido) {
            for (i = 0; i < arrayRegistrosTerceirizados.length; i++) {
                if (registroPonto === arrayRegistrosTerceirizados[i]) {
                    isRegistroDesconhecido = false;
                    break;
                }
            }
        }
        return isRegistroDesconhecido;
    });

    return arrayRegistrosDesconhecidos;
}

function gerarConteudoArquivoSaida(arrayRegistrosSeparados) {
    var conteudo;

    for (var i = 0; i < arrayRegistrosSeparados.length; i++) {
        conteudo += arrayRegistrosSeparados[i] + "\n";
    }

    return conteudo;
}

function atualizarDadosMatriculas() {
    var alertaQuantidadeMatriculas = document.getElementById("quantidadeMatriculas");

    var promiseQuantidadeMatriculasUnicas = new Promise((resolve, reject) => {
        if (arrayRegistrosPonto.length === 1 && arrayRegistrosPonto[0].length === 0) {
            resolve(0);
        }

        arrayMatriculasUnicas = [];
        for (var i = 0; i < arrayRegistrosPonto.length; i++) {
            var matriculaAtual = arrayRegistrosPonto[i].substr(9, 6);
            var isInedita = true;
            for (var j = 0; j < arrayMatriculasUnicas.length; j++) {
                if (arrayMatriculasUnicas[j] === matriculaAtual) {
                    isInedita = false
                }
            }

            if (isInedita) {
                arrayMatriculasUnicas.push(matriculaAtual);
            }
        }
        arrayMatriculasUnicas.sort();

        for (i = 0; i < arrayMatriculasUnicas.length; i++) {
            arrayMatriculasUnicas[i] = {
                matricula: arrayMatriculasUnicas[i],
                tipo: "servidor"
            }
        }

        resolve(arrayMatriculasUnicas.length);
    });

    promiseQuantidadeMatriculasUnicas.then(
        function (result) {
            alertaQuantidadeMatriculas.textContent = "Matrículas (" + result + ")";
        }, null
    );
}

function atualizarQuantidadeRegistros() {
    var alertaQuantidadeRegistros = document.getElementById("quantidadeRegistros");

    var promiseQuantidadeMatriculasUnicas = new Promise((resolve, reject) => {
            resolve(arrayRegistrosPonto.length);
    });

    promiseQuantidadeMatriculasUnicas.then(
        function (result) {
            alertaQuantidadeRegistros.textContent = "Registros do ponto (" + result + ")";
        }
    );
}

function alterarTipoMatricula(matricula, tipo) {
    for (var i = 0; i < arrayMatriculasUnicas.length; i++) {
        if (arrayMatriculasUnicas[i].matricula === matricula) {
            arrayMatriculasUnicas[i].tipo = tipo;
        }
    }
}

function atualizarExibicaoMatriculasEncontradas() {
    var html = "";
    if (arrayMatriculasUnicas.length > 0) {
        //language=HTML
        html += "<table class='w3-table w3-striped w3-margin-bottom'>";
        //language=HTML
        html += "<tr><th>Matrícula</th><th>Tipo</th></tr>";

        for (var i = 0; i < arrayMatriculasUnicas.length; i++) {
            var matricula = arrayMatriculasUnicas[i].matricula;
            //language=HTML
            html += "<tr><td>" + matricula + "</td><td>" +
                "<input type='radio' name='tipo_" + matricula + "' value='servidor'     class='w3-radio' onchange='alterarTipoMatricula(\"" + matricula + "\", this.value)' checked><label class='w3-margin-right'>Servidor</label>" +
                "<input type='radio' name='tipo_" + matricula + "' value='terceirizado' class='w3-radio' onchange='alterarTipoMatricula(\"" + matricula + "\", this.value)'><label>Terceirizado</label></td></tr>"
        }
        html += "</table>";
    } else {
    //language=HTML
    html += "<div class='w3-panel w3-pale-blue w3-center'><p>Nenhuma matrícula identificada!</p></div>";
}


    containerListaMatriculasUnicas.innerHTML = html;
}

function carregarDadosTela() {
    obterDadosTextArea();
    atualizarQuantidadeRegistros();
    atualizarDadosMatriculas();
    atualizarExibicaoMatriculasEncontradas();
}

carregarDadosTela();