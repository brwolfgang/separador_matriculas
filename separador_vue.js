Vue.component('linha-tabela-matriculas-unicas', {
    props: ['matricula', 'tipo'],
    //language=HTML
    template: '<td>{{ matricula }}</td><td>{{ tipo }}</td></tr>'
});

var compRegistrosPonto = new Vue({
    el: '#divListaRegistros',
    data: {
        txtListaRegistrosPonto: '',
        title: 'Hello darkness my old friend'
    },
    computed: {
        arrayRegistrosPonto: function () {
            let registros = this.txtListaRegistrosPonto.split("\n");
            return registros.filter(function (registroPonto) {
                return registroPonto.length === 33;
            })
        },
        totalRegistrosPonto: function () {
            return this.arrayRegistrosPonto.length;
        },
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

            console.log(arrayMatriculasUnicas);
            return arrayMatriculasUnicas;
        }
    }
});