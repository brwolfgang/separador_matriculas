camposForm = {
    txtRegistrosPonto: document.getElementById("registrosPonto"),
    txtMatriculasServidores: document.getElementById("matServidores"),
    txtMatriculasTerceirizados: document.getElementById("matTerceirizados")
};

function separarMatriculas() {
    var arrayRegistrosPonto             = camposForm.txtRegistrosPonto.value.split("\n");
    var arrayMatriculasServidores       = camposForm.txtMatriculasServidores.value.split("\n");
    var arrayMatriculasTerceirizados    = camposForm.txtMatriculasTerceirizados.value.split("\n");

    consertarMatricula(arrayMatriculasServidores);
    consertarMatricula(arrayMatriculasTerceirizados);

    var arrayRegistroPontoServidor = arrayRegistrosPonto.filter(function(registroPonto) {
        var isRegistroServidor = false;
        var matriculaRegistro = registroPonto.substr(9, 6);
        for (var i = 0; i < arrayMatriculasServidores.length; i++) {
            if (matriculaRegistro.includes(arrayMatriculasServidores[i])) {
                isRegistroServidor = true;
                break;
            }
        }
        return isRegistroServidor;
    });
    console.log(arrayRegistroPontoServidor);

    var arrayRegistroPontoTerceirizado = arrayRegistrosPonto.filter(function(registroPonto) {
        var isRegistroTerceirizado = false;
        var matriculaRegistro = registroPonto.substr(9, 6);
        for (var i = 0; i < arrayMatriculasTerceirizados.length; i++) {
            if (matriculaRegistro.includes(arrayMatriculasTerceirizados[i])) {
                isRegistroTerceirizado = true;
                break;
            }
        }
        return isRegistroTerceirizado;
    });
    console.log(arrayRegistroPontoTerceirizado);

    identificarRegistrosDesconhecidos(arrayRegistrosPonto, arrayRegistroPontoServidor, arrayRegistroPontoTerceirizado);
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