<template>
    <div>
        <table class="w3-table w3-border-bottom">
            <tr>
                <td style="width: 25%; text-align: center">{{ horarioEntrada }}</td>
                <td style="width: 25%; text-align: center">{{ horarioSaida }}</td>
                <td style="width: 25%; text-align: center">{{ tempoPermanencia }}</td>
                <td style="width: 25%; text-align: center">{{ saldoDia }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            horarios: Array,
            jornada: String
        },
        methods: {
            criarDataHora(hora){
                let dataHora = hora.split(':');
                return new Date(0, 0, 0, dataHora[0], dataHora[1], 0);
            },
            obterDiferencaHoras(inicio, fim){
                if (!inicio || !fim) {
                    return "-";
                }

                inicio = this.criarDataHora(inicio);
                fim = this.criarDataHora(fim);

                let momentoInicial = inicio.getTime() < 0 ? inicio.getTime() * -1 : inicio.getTime();
                let momentoFinal = fim.getTime() < 0 ? fim.getTime() * -1 : fim.getTime();

                let diff = momentoInicial - momentoFinal;

                let horas = Math.floor(diff / 1000 / 60 / 60);
                diff -= horas * 1000 * 60 * 60;
                let minutos = Math.floor(diff / 1000 / 60);

                horas = horas > 0 && horas <= 9 ? '0' + horas : horas;
                minutos = minutos > 0 && minutos <= 9 ? '0' + minutos : minutos;

                return horas + ":" + minutos;
            },
        },
        computed: {
            tempoPermanencia(){
                return this.obterDiferencaHoras(this.horarios[0], this.horarios[1])
            },
            saldoDia(){
                if (this.tempoPermanencia !== '-') {
                    return this.obterDiferencaHoras(this.jornada, this.tempoPermanencia);
                } else {
                    return this.tempoPermanencia;
                }
            },
            horarioEntrada(){
                return this.horarios[0] ? this.horarios[0] : '-';
            },
            horarioSaida(){
                return this.horarios[1] ? this.horarios[1] : '-';
            }
        }
    };
</script>