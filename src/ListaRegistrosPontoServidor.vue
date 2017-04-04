<template>
    <div>
        <table class="w3-table">
            <tr><th>Entrada</th><th>Saída</th></tr>
            <tr><td v-for="hora in horarios">{{ hora }} </td></tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            horarios: Array
        },
        computed: {
        }
    }
</script>