<template>
    <div class="w3-modal w3-show" v-if="exibirRelatorio">
        <div class="w3-modal-content">
            <header class="w3-container w3-blue-gray">
              <span class="w3-button w3-display-topright"
                    @click="ocultarRelatorioFuncionario">&times;</span>
                <h2>Registros de ponto</h2>
            </header>
            <div class="w3-container">
                <div class="w3-panel w3-pale-blue w3-center">
                    <p>Matrícula: {{ funcionario.matricula }} - Tipo: {{ funcionario.tipo }}<br>Período: {{ dataPrimeiroRegistro }} à {{ dataUltimoRegistro }}</p>
                </div>
                <table class="w3-table w3-striped w3-margin-bottom w3-bordered">
                    <tr><th style="width: 10%; text-align: center">Data</th><th style="width: 20%; text-align: center" >Dia da Semana</th><th style="text-align: center">Registros</th></tr>
                    <tr v-for="registro in registrosPontoMatricula">
                        <td class="w3-center" style="vertical-align: middle">{{ registro.data }}</td>
                        <td class="w3-center" style="vertical-align: middle">{{ registro.diaSemana }}</td>
                        <td>
                            <component :is="tipoListagemRegistros" :horarios="registro.horarios"></component>
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
            funcionario: Object,
            registrosPonto: Array
        },
        data: function () {
            return {

            }
        },
        methods: {
            ocultarRelatorioFuncionario() {
                this.$emit('ocultar-relatorio', null);
            },
            determinarDiaSemana(numeroDiaSemana) {
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
            },
            extrairDataRegistro(registro){
                let dataBruta = registro.substr(15, 8);
                return new Date(
                    dataBruta.substr(4, 4),
                    Number(dataBruta.substr(2, 2)) - 1,
                    dataBruta.substr(0, 2)
                );
            },
            extrairHoraRegistro(registro){
                return this.getHoraFormatada(registro.substr(23, 4));
            }
        },
        computed: {
            exibirRelatorio: function () {
                return this.funcionario !== null;
            },
            registrosPontoMatricula: function () {
                let registrosMatricula = [];
                let diaAtual = '';
                let horarios = [];
                for (let i in this.registrosPonto) {
                    if (this.registrosPonto[i].substr(9, 6).includes(this.funcionario.matricula)) {
                        let dataRegistro = this.extrairDataRegistro(this.registrosPonto[i]);
                        let dataRegistroFormatada = this.getDataFormatada(dataRegistro);
                        let horaRegistro = this.extrairHoraRegistro(this.registrosPonto[i]);
                        if (diaAtual === '') {
                            diaAtual = dataRegistroFormatada;
                        }
                        if (dataRegistroFormatada === diaAtual) {
                            horarios.push(horaRegistro);
                        } else {
                            diaAtual = dataRegistroFormatada;
                            registrosMatricula.push({
                                data: this.getDataFormatada(dataRegistro),
                                diaSemana: this.determinarDiaSemana(dataRegistro.getDay()),
                                horarios: horarios
                            });
                            horarios = [];
                            horarios.push(horaRegistro)
                        }
                    }
                }
                return registrosMatricula;
            },
            dataPrimeiroRegistro: function() {
                return this.registrosPontoMatricula[0].data;
            },
            dataUltimoRegistro: function () {
                return this.registrosPontoMatricula[this.registrosPontoMatricula.length - 1].data;
            },
            tipoListagemRegistros: function () {
                if (this.funcionario.tipo === 'servidor') {
                    return 'lista-registros-servidor';
                }
                if (this.funcionario.tipo === 'terceirizado') {
                    return 'lista-registros-terceirizado';
                }
            }
        }
    }
</script>