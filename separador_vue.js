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
            for (let i = 0; i < this.arrayRegistrosPonto.length; i++) {
                let matriculaAtual = this.arrayRegistrosPonto[i].substr(9, 6);
                let isInedita = true;
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

            return arrayMatriculasUnicas;
        }
    },
    methods: {
        updateTipoMatricula: function (elemento, index) {
            this.arrayMatriculasUnicas[index].tipo = elemento.value;
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
            nomeArquivoTerceirizados: ''
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
                for (j in this.matriculasTerceirizados) {
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
            if (this.matriculasServidores.length === 0 || this.matriculasTerceirizados.length === 0) {
                return false;
            }

            return true;
        },
        registrosServidores: function () {
            var registrosServidores = this.filtrarRegistrosPorMatriculas(this.matriculasTerceirizados);
            this.nomeArquivoServidores = 'registros_servidor_' + Date.now() + '.txt';
            return this.gerarHrefDownload(registrosServidores);
        },
        registrosTerceirizados: function () {
            var registrosTerceirizados = this.filtrarRegistrosPorMatriculas(this.matriculasTerceirizados);
            this.nomeArquivoTerceirizados = 'registros_terceirizados_' + Date.now() + '.txt';
            return this.gerarHrefDownload(registrosTerceirizados);
        }
    }
});

new Vue({
    el: '#separadorApp',
    data: {
        txtListaRegistrosPonto: '',
        arrayMatriculasDivergentes: []
    },
    methods: {
        updateTxtListaRegistrosPonto: function(value) {
            this.txtListaRegistrosPonto = value;
        },
        updateArrayMatriculasDivergentes: function (value) {
            this.arrayMatriculasDivergentes = value;
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