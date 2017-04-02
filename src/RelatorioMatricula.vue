<template>
    <div class="w3-modal w3-show" v-if="exibirRelatorio">
        <div class="w3-modal-content">
            <header class="w3-container w3-blue-gray">
              <span class="w3-button w3-display-topright"
                    @click="ocultarRelatorioFuncionario">&times;</span>
                <h2>Registros de ponto</h2>
            </header>
            <div class="w3-container">
                <p>Matrícula: {{ funcionario.matricula }} - Tipo: {{ funcionario.tipo }}</p>
                <table class="w3-table w3-striped w3-margin-bottom w3-bordered">
                    <tr><th>Data</th><th>Dia da Semana</th><th>Hora</th></tr>
                    <tr v-for="registro in registrosPontoMatricula">
                        <td>{{ registro.data }}</td>
                        <td>{{ registro.diaSemana }}</td>
                        <td>{{ registro.hora }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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
                let registrosMatricula = [];
                for (let i in this.registrosPonto) {
                    if (this.registrosPonto[i].substr(9, 6).includes(this.funcionario.matricula)) {
                        let dataBruta = this.registrosPonto[i].substr(15, 8);
                        let dataObject = new Date(
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
    }
</script>