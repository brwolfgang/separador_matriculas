<template>
    <div class="w3-margin-bottom w3-col s3 w3-card-4" v-if="existeDivergenciaMatriculas">
        <header class="w3-container w3-blue-gray w3-margin-bottom">
            <h3>Registros separados</h3>
        </header>
        <div class="w3-container w3-center w3-margin-bottom">
            <a id="btnDownloadServidores"
               :href="registrosServidores"
               :download="nomeArquivoServidores"
               class="w3-button w3-block w3-margin-bottom">Registros do tipo <b>Servidor</b> ({{ totalRegistrosServidores }})</a>
            <a id="btnDownloadTerceirizados"
               :href="registrosTerceirizados"
               :download="nomeArquivoTerceirizados"
               class="w3-button w3-block ">Registros do tipo <b>Terceirizado</b> ({{ totalRegistrosTerceirizados }})</a>
        </div>
    </div>
</template>

<script>
    export default {
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
                let texto = '';
                for (let i in arrayRegistrosPonto) {
                    texto += arrayRegistrosPonto[i] + '\n'
                }
                return 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto);
            },
            filtrarRegistrosPorMatriculas: function (arrayMatriculas) {
                let registrosFiltrados = [];

                for (let i in this.arrayRegistrosPonto) {
                    let matriculaRegistro = this.arrayRegistrosPonto[i].substr(9, 6);
                    for (let j in arrayMatriculas) {
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
                let arrayRegistrosServidores = this.filtrarRegistrosPorMatriculas(this.matriculasServidores);
                this.nomeArquivoServidores = 'registros_servidor_' + Date.now() + '.txt';
                this.totalRegistrosServidores = arrayRegistrosServidores.length;
                return this.gerarHrefDownload(arrayRegistrosServidores);
            },
            registrosTerceirizados: function () {
                let arrayRegistrosTerceirizados = this.filtrarRegistrosPorMatriculas(this.matriculasTerceirizados);
                this.nomeArquivoTerceirizados = 'registros_terceirizados_' + Date.now() + '.txt';
                this.totalRegistrosTerceirizados = arrayRegistrosTerceirizados.length;
                return this.gerarHrefDownload(arrayRegistrosTerceirizados);
            }
        }
    }
</script>