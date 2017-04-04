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
              :array-funcionarios="arrayFuncionarios"
              @exibir-relatorio-funcionario="exibirRelatorioFuncionario"
              class="w3-margin-right">
      </lista-matriculas-unicas>
      <download-arquivos
              :array-registros-ponto="arrayRegistrosPonto"
              :array-matriculas-unicas="arrayFuncionarios">
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
                arrayFuncionarios: [],
                funcionarioRelatorio: null
            }
        },
        methods: {
            updateTxtListaRegistrosPonto: function(value) {
                this.txtListaRegistrosPonto = value;
                this.criarArrayMatriculas();
            },
            exibirRelatorioFuncionario: function (funcionario) {
                this.funcionarioRelatorio = funcionario;
            },
            criarArrayMatriculas: function () {
                let arrayMatriculasUnicas = [];
                for (let i in this.arrayRegistrosPonto) {
                    let matriculaAtual = this.arrayRegistrosPonto[i].substr(9, 6);
                    let isInedita = true;
                    for (let j in arrayMatriculasUnicas) {
                        if (arrayMatriculasUnicas[j] === matriculaAtual) {
                            isInedita = false
                        }
                    }

                    if (isInedita) {
                        arrayMatriculasUnicas.push(matriculaAtual);
                    }
                }

                arrayMatriculasUnicas.sort();

                for (let i in arrayMatriculasUnicas) {
                    arrayMatriculasUnicas[i] = {
                        matricula: arrayMatriculasUnicas[i],
                        tipo: arrayMatriculasUnicas[i].startsWith('9') ? "terceirizado" : "servidor"
                    }
                }
                this.arrayFuncionarios = arrayMatriculasUnicas;
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