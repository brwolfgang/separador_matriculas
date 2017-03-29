Vue.component('input-lista-registros', {
    template:
        `
            <div id="listaRegistros" class="w3-margin-bottom w3-col s4 w3-card-4 w3-margin-right">
                <header class="w3-container w3-blue-grey">
                    <h3 id="quantidadeRegistros">Registros do ponto ({{ totalRegistrosPonto }})</h3>
                </header>
                <div class="w3-container">
                            <textarea
                                    class="w3-input w3-margin-bottom"
                                    cols="33" rows="10"
                                    placeholder="Cole aqui todos os registros do ponto certificando-se de que há apenas um por linha"
                                    v-model="listaRegistrosPonto"
                                    v-on:input="updateListaRegistros($event.target.value)">
                            </textarea>
                </div>
            </div>
        `,
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
    props: {
        arrayRegistrosPonto: Array
    },
    template:
        `
            <div id="tabelaMatriculasUnicas" class="w3-margin-bottom w3-col s4 w3-card-4 w3-margin-right">
                <header class="w3-container w3-blue-grey">
                    <h3 id="quantidadeMatriculas">Matrículas ({{ arrayMatriculasUnicas.length }})</h3>
                </header>
                <div class="w3-container">
                    <div class="w3-content">
                        <table v-if="isArraymatriculasUnicasVazio" class='w3-table w3-striped w3-margin-bottom'>
                            <tr><th>Matrícula</th><th>Tipo</th></tr>
                            <tr v-for="funcionario in arrayMatriculasUnicas">
                                <td>{{ funcionario.matricula }}</td>
                                <td>
                                    <input type="radio" v-bind:name="funcionario.matricula" value="servidor" class='w3-radio' checked><label class='w3-margin-right'>Servidor</label>
                                    <input type="radio" v-bind:name="funcionario.matricula" value="terceirizado" class='w3-radio'><label>Terceirizado</label>
                                </td>
                            </tr>
                        </table>
                        <div v-else class='w3-panel w3-pale-blue w3-center'>
                            <p>Nenhuma matrícula identificada!</p>
                        </div>
                    </div>
                </div>
                <div class="w3-block w3-center w3-margin-bottom">
                    <button class="w3-button" id="btnSeparacao" onclick="separarMatriculas()">Separar registros</button>
                </div>
            </div>    
        `,
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

            for (i = 0; i < arrayMatriculasUnicas.length; i++) {
                arrayMatriculasUnicas[i] = {
                    matricula: arrayMatriculasUnicas[i],
                    tipo: "servidor"
                }
            }

            return arrayMatriculasUnicas;
        },
        isArraymatriculasUnicasVazio: function () {
            return this.arrayMatriculasUnicas.length > 0;
        }
    }
});
// var compRegistrosPonto = new Vue({
//     el: '#listaRegistros',
//     data: {
//         txtListaRegistrosPonto: '',
//     },
//     computed: {
//         arrayRegistrosPonto: function () {
//             let registros = this.txtListaRegistrosPonto.split("\n");
//             return registros.filter(function (registroPonto) {
//                 return registroPonto.length === 33;
//             })
//         },
//         totalRegistrosPonto: function () {
//             return this.arrayRegistrosPonto.length;
//         },
//         arrayMatriculasUnicas: function () {
//             arrayMatriculasUnicas = [];
//             for (let i = 0; i < this.arrayRegistrosPonto.length; i++) {
//                 let matriculaAtual = this.arrayRegistrosPonto[i].substr(9, 6);
//                 let isInedita = true;
//                 for (var j = 0; j < arrayMatriculasUnicas.length; j++) {
//                     if (arrayMatriculasUnicas[j] === matriculaAtual) {
//                         isInedita = false
//                     }
//                 }
//
//                 if (isInedita) {
//                     arrayMatriculasUnicas.push(matriculaAtual);
//                 }
//             }
//
//             for (i = 0; i < arrayMatriculasUnicas.length; i++) {
//                 arrayMatriculasUnicas[i] = {
//                     matricula: arrayMatriculasUnicas[i],
//                     tipo: "servidor"
//                 }
//             }
//
//             return arrayMatriculasUnicas;
//         }
//     }
// });

new Vue({
    el: '#separadorApp',
    data: {
        txtListaRegistrosPonto: ''
    },
    methods: {
        updateTxtListaRegistrosPonto: function(value) {
            this.txtListaRegistrosPonto = value;
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