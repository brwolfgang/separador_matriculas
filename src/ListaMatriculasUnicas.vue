<template>
    <div class="w3-margin-bottom w3-col s4 w3-card-4" v-show="arrayFuncionarios.length > 0">
        <header class="w3-container w3-blue-grey">
            <h3 id="quantidadeMatriculas">Matrículas ({{ arrayFuncionarios.length }})</h3>
        </header>
        <div class="w3-container">
            <div class="w3-content">
                <table class="w3-table w3-striped w3-margin-bottom w3-bordered">
                    <tr><th>Matrícula</th><th>Tipo</th></tr>
                    <tr v-for="funcionario in arrayFuncionarios" :key="funcionario.matricula">
                        <td>{{ funcionario.matricula }}</td>
                        <td>
                            <seletor-tipo-matricula
                                    :funcionario="funcionario"
                            ></seletor-tipo-matricula>
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
            arrayRegistrosPonto: Array,
            arrayFuncionarios: Array
        },
        methods: {
            exibirRelatorioFuncionario: function (funcionario) {
                this.$emit('exibir-relatorio-funcionario', funcionario);
            },
        }
    }
</script>