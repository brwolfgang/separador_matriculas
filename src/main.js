import Vue from 'vue'
import App from './App.vue'
import InputListaRegistros from './InputListaRegistros.vue'
import ListaMatriculasUnicas from './ListaMatriculasUnicas.vue'
import SeletorTipoMatricula from './SeletorTipoMatricula.vue'
import DownloadArquivos from './DownloadArquivos.vue'
import RelatorioMatricula from './RelatorioMatricula.vue'

Vue.component('input-lista-registros', InputListaRegistros);
Vue.component('lista-matriculas-unicas', ListaMatriculasUnicas);
Vue.component('seletor-tipo-matricula', SeletorTipoMatricula);
Vue.component('download-arquivos', DownloadArquivos);
Vue.component('relatorio-matricula', RelatorioMatricula);

new Vue({
    el: '#app',
    render: h => h(App)
})
