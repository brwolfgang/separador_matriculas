<template>
  <div id="separadorApp">
    <div class="w3-container w3-blue-gray w3-margin-bottom w3-card-4">
      <header><h2>Separador de registros de ponto</h2></header>
    </div>
    <div class="w3-row" style="margin-left: 3%; margin-right: 3%">
      <input-lista-registros
              @input="updateTxtListaRegistrosPonto"
              class="w3-margin-right">
      </input-lista-registros>
      <lista-matriculas-unicas
              :array-registros-ponto="arrayRegistrosPonto"
              @registro-atualizado="updateArrayMatriculasDivergentes"
              @exibir-relatorio-funcionario="exibirRelatorioFuncionario"
              class="w3-margin-right">
      </lista-matriculas-unicas>
      <download-arquivos
              :array-matriculas-unicas="arrayMatriculasDivergentes"
              :array-registros-ponto="arrayRegistrosPonto">
      </download-arquivos>
    </div>
    <relatorio-matricula
            :funcionario="funcionarioRelatorio"
            :registros-ponto="arrayRegistrosPonto"
            @ocultar-relatorio="exibirRelatorioFuncionario">
    </relatorio-matricula>
  </div>
</template>

<script>
    export default {
        data: function() {
            return {
                txtListaRegistrosPonto: '',
                arrayMatriculasDivergentes: [],
                funcionarioRelatorio: null
            }
        },
        methods: {
            updateTxtListaRegistrosPonto: function(value) {
                this.txtListaRegistrosPonto = value;
            },
            updateArrayMatriculasDivergentes: function (value) {
                this.arrayMatriculasDivergentes = value;
            },
            exibirRelatorioFuncionario: function (funcionario) {
                this.funcionarioRelatorio = funcionario;
            }
        },
        computed: {
            arrayRegistrosPonto: function(){
                return this.txtListaRegistrosPonto.split("\n").filter(function (registro) {
                    return registro.length === 33;
                });
            }
        }
    }
</script>