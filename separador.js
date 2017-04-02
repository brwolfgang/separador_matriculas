Vue.component('input-lista-registros', {
    template: '#inputListaRegistros',
    data: function () {
        return {
            listaRegistrosPonto: ''
        }
    },
    methods: {
        updateListaRegistros: function (valor) {
            this.$emit('input', valor);
        }
    },
    computed: {
        arrayRegistrosPonto: function () {
            let registros = this.listaRegistrosPonto.split("\n");
            return registros.filter(function (registroPonto) {
                return registroPonto.length === 33;
            })
        },
        totalRegistrosPonto: function () {
            return this.arrayRegistrosPonto.length;
        }
    }
});

Vue.component('lista-matriculas-unicas', {
    template: '#tabelaMatriculasUnicas',
    props: {
        arrayRegistrosPonto: Array
    },
    computed: {
        arrayMatriculasUnicas: function () {
            arrayMatriculasUnicas = [];
            for (i in this.arrayRegistrosPonto) {
                let matriculaAtual = this.arrayRegistrosPonto[i].substr(9, 6);
                let isInedita = true;
                for (j in arrayMatriculasUnicas) {
                    if (arrayMatriculasUnicas[j] === matriculaAtual) {
                        isInedita = false
                    }
                }

                if (isInedita) {
                    arrayMatriculasUnicas.push(matriculaAtual);
                }
            }

            arrayMatriculasUnicas.sort();

            for (i in arrayMatriculasUnicas) {
                arrayMatriculasUnicas[i] = {
                    matricula: arrayMatriculasUnicas[i],
                    tipo: "servidor"
                }
            }
            return arrayMatriculasUnicas;
        }
    },
    methods: {
        exibirRelatorioFuncionario: function (funcionario) {
            this.$emit('exibir-relatorio-funcionario', funcionario);
        },
        funcionarioAtualizado: function (funcionario) {
            this.$emit('registro-atualizado', this.arrayMatriculasUnicas);
        }
    }
});

Vue.component('download-arquivos', {
    template: '#downloadArquivos',
    props: {
        arrayMatriculasUnicas: Array,
        arrayRegistrosPonto: Array
    },
    data: function () {
        return {
            nomeArquivoServidores: '',
            nomeArquivoTerceirizados: '',
            totalRegistrosServidores: 0,
            totalRegistrosTerceirizados: 0
        };
    },
    methods: {
        gerarHrefDownload: function(arrayRegistrosPonto){
            var texto = '';
            for (i in arrayRegistrosPonto) {
                texto += arrayRegistrosPonto[i] + '\n'
            }
            return 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto);
        },
        filtrarRegistrosPorMatriculas: function (arrayMatriculas) {
            var registrosFiltrados = [];

            for (i in this.arrayRegistrosPonto) {
                var matriculaRegistro = this.arrayRegistrosPonto[i].substr(9, 6);
                for (j in arrayMatriculas) {
                    if (matriculaRegistro.includes(arrayMatriculas[j].matricula)) {
                        registrosFiltrados.push(this.arrayRegistrosPonto[i]);
                        break;
                    }
                }
            }
            return registrosFiltrados;
        }
    },
    computed: {
        matriculasServidores: function() {
            return this.arrayMatriculasUnicas.filter(function (elemento) {
                return elemento.tipo === 'servidor';
            });
        },
        matriculasTerceirizados: function () {
            return this.arrayMatriculasUnicas.filter(function (elemento) {
                return elemento.tipo === 'terceirizado';
            });
        },
        existeDivergenciaMatriculas: function() {
            if (this.arrayRegistrosPonto.length === 0) {
                return false;
            }
            if (this.matriculasServidores.length === 0 || this.matriculasTerceirizados.length === 0) {
                return false;
            }

            return true;
        },
        registrosServidores: function () {
            var arrayRegistrosServidores = this.filtrarRegistrosPorMatriculas(this.matriculasServidores);
            this.nomeArquivoServidores = 'registros_servidor_' + Date.now() + '.txt';
            this.totalRegistrosServidores = arrayRegistrosServidores.length;
            return this.gerarHrefDownload(arrayRegistrosServidores);
        },
        registrosTerceirizados: function () {
            var arrayRegistrosTerceirizados = this.filtrarRegistrosPorMatriculas(this.matriculasTerceirizados);
            this.nomeArquivoTerceirizados = 'registros_terceirizados_' + Date.now() + '.txt';
            this.totalRegistrosTerceirizados = arrayRegistrosTerceirizados.length;
            return this.gerarHrefDownload(arrayRegistrosTerceirizados);
        }
    }
});

Vue.component('seletor-tipo-matricula', {
    template: '#seletorTipoMatricula',
    props: {
        funcionario: Object
    },
    methods: {
        updateTipoMatricula: function (radioButton) {
            this.funcionario.tipo = radioButton.value;
            this.$emit('funcionario-atualizado');
        }
    },
    computed: {
        isTipoServidor: function () {
            return this.funcionario.tipo === 'servidor';
        },
        isTipoTerceirizado: function () {
            return this.funcionario.tipo === 'terceirizado';
        }
    }
});

Vue.component('relatorio-matricula', {
    template: '#relatorioMatricula',
    props: {
        funcionario: Object,
        registrosPonto: Array
    },
    data: function () {
        return {

        }
    },
    methods: {
        ocultarRelatorioFuncionario: function () {
            this.$emit('ocultar-relatorio', null);
        },
        determinarDiaSemana: function (numeroDiaSemana) {
            switch (numeroDiaSemana) {
                case 0 : return 'Domingo';
                case 1 : return 'Segunda-feira';
                case 2 : return 'Terça-feira';
                case 3 : return 'Quarta-feira';
                case 4 : return 'Quinta-feira';
                case 5 : return 'Sexta-feira';
                case 6 : return 'Sábado';
            }
        },
        getDataFormatada(data){
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        },
        getHoraFormatada(hora){
            return hora.substr(0, 2) + ':' + hora.substr(2, 2);
        }
    },
    computed: {
        exibirRelatorio: function () {
            return this.funcionario !== null;
        },
        registrosPontoMatricula: function () {
            var registrosMatricula = [];
            for (i in this.registrosPonto) {
                if (this.registrosPonto[i].substr(9, 6).includes(this.funcionario.matricula)) {
                    var dataBruta = this.registrosPonto[i].substr(15, 8);
                    var dataObject = new Date(
                        dataBruta.substr(4, 4),
                        Number(dataBruta.substr(2, 2)) - 1,
                        dataBruta.substr(0, 2)
                    );

                    registrosMatricula.push({
                        data: this.getDataFormatada(dataObject),
                        diaSemana: this.determinarDiaSemana(dataObject.getDay()),
                        hora: this.getHoraFormatada(this.registrosPonto[i].substr(23, 4))
                    });
                }
            }

            return registrosMatricula;
        }
    }
});

new Vue({
    el: '#separadorApp',
    data: {
        txtListaRegistrosPonto: '',
        arrayMatriculasDivergentes: [],
        funcionarioRelatorio: null
    },
    methods: {
        updateTxtListaRegistrosPonto: function(value) {
            this.txtListaRegistrosPonto = value;
        },
        updateArrayMatriculasDivergentes: function (value) {
            this.arrayMatriculasDivergentes = value;
        },
        exibirRelatorioFuncionario: function (funcionario) {
            this.funcionarioRelatorio = funcionario;
        }
    },
    computed: {
        arrayRegistrosPonto: function(){
            return this.txtListaRegistrosPonto.split("\n").filter(function (registro) {
                return registro.length === 33;
            });
        }
    }
});