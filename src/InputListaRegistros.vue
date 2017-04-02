<template>
    <div class="w3-margin-bottom w3-col s4 w3-card-4">
        <header class="w3-container w3-blue-grey">
            <h3 id="quantidadeRegistros">
                Registros do ponto ({{ totalRegistrosPonto }})
            </h3>
        </header>
        <div class="w3-container">
               <textarea
                       class="w3-input w3-margin-bottom"
                       cols="33" rows="10"
                       placeholder="Cole aqui todos os registros do ponto certificando-se de que há apenas um por linha"
                       v-model="listaRegistrosPonto"
                       @input="updateListaRegistros($event.target.value)">
                </textarea>
        </div>
    </div>
</template>
<script>
    export default {
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
    }
</script>