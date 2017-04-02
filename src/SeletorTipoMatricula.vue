<template>
    <div>
        <input type="radio"
               @click="updateTipoMatricula($event.target)"
               :name="funcionario.matricula"
               value="servidor"
               :checked="isTipoServidor"
               class='w3-radio'>
        <label class='w3-margin-right'>Servidor</label>
        <input type="radio"
               @click="updateTipoMatricula($event.target)"
               :name="funcionario.matricula"
               value="terceirizado"
               :checked="isTipoTerceirizado"
               class='w3-radio'>
        <label>Terceirizado</label>
    </div>
</template>

<script>
    export default {
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
    }
</script>