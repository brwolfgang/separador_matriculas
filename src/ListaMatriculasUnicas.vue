<template>
    <div class="w3-margin-bottom w3-col s4 w3-card-4" v-show="arrayMatriculasUnicas.length > 0">
        <header class="w3-container w3-blue-grey">
            <h3 id="quantidadeMatriculas">Matrículas ({{ arrayMatriculasUnicas.length }})</h3>
        </header>
        <div class="w3-container">
            <div class="w3-content">
                <table class="w3-table w3-striped w3-margin-bottom w3-bordered">
                    <tr><th>Matrícula</th><th>Tipo</th></tr>
                    <tr v-for="funcionario in arrayMatriculasUnicas" :key="funcionario.matricula">
                        <td>{{ funcionario.matricula }}</td>
                        <td>
                            <seletor-tipo-matricula
                                    :funcionario="funcionario"
                                    @funcionario-atualizado="funcionarioAtualizado(funcionario)">
                            </seletor-tipo-matricula>
                        </td>
                        <td>
                            <a href="#" @click="exibirRelatorioFuncionario(funcionario)">
                                <i class="material-icons">assignment</i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            arrayRegistrosPonto: Array
        },
        computed: {
            arrayMatriculasUnicas: function () {
                let arrayMatriculasUnicas = [];
                for (let i in this.arrayRegistrosPonto) {
                    let matriculaAtual = this.arrayRegistrosPonto[i].substr(9, 6);
                    let isInedita = true;
                    for (let j in arrayMatriculasUnicas) {
                        if (arrayMatriculasUnicas[j] === matriculaAtual) {
                            isInedita = false
                        }
                    }

                    if (isInedita) {
                        arrayMatriculasUnicas.push(matriculaAtual);
                    }
                }

                arrayMatriculasUnicas.sort();

                for (let i in arrayMatriculasUnicas) {
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
    }
</script>