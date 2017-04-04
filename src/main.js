import Vue from 'vue'
import App from './App.vue'
import InputListaRegistros from './InputListaRegistros.vue'
import ListaMatriculasUnicas from './ListaMatriculasUnicas.vue'
import SeletorTipoMatricula from './SeletorTipoMatricula.vue'
import DownloadArquivos from './DownloadArquivos.vue'
import RelatorioMatricula from './RelatorioMatricula.vue'
import ListaRegistrosPontoServidor from './ListaRegistrosPontoServidor.vue'
import ListaRegistrosPontoTerceirizado from './ListaRegistrosPontoTerceirizado.vue'

Vue.component('input-lista-registros', InputListaRegistros);
Vue.component('lista-matriculas-unicas', ListaMatriculasUnicas);
Vue.component('seletor-tipo-matricula', SeletorTipoMatricula);
Vue.component('download-arquivos', DownloadArquivos);
Vue.component('relatorio-matricula', RelatorioMatricula);
Vue.component('lista-registros-servidor', ListaRegistrosPontoServidor);
Vue.component('lista-registros-terceirizado', ListaRegistrosPontoTerceirizado);

new Vue({
    el: '#app',
    render: h => h(App)
})
