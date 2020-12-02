<template>
  <div>
    <h1>{{ msg }}</h1>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Contas</th>
          <th>Valor Saida</th>
          <th>Valor Entrada</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th>Total</th>
          <th>R${{ totalSaida }},00</th>
          <th>R${{ totalEntrada }},00</th>
        </tr>
        <tr>
          <th></th>
          <th>Total a Pagar</th>
          <th></th>
          <th>R${{ totalEntrada - totalSaida }},00</th>
        </tr>
      </tfoot>
      <tbody v-for="(item, index) in itens" :key="item.id">
        <tr>
          <th>{{ index }}</th>
          <td>{{ item.conta }}</td>
          <td>R${{ item.valorSaida }},00</td>
          <td>R${{ item.valorEntrada }},00</td>
          <td>
            <button
              class="button is-success is-small"
              @click="habilitarEditar(item.id, item)"
            >
              Editar
            </button>
            <button
              id="bt"
              class="button is-danger is-small"
              @click="apagar(index, item.id)"
            >
              Apagar
            </button>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th>
            <button
              v-if="!botoes"
              class="button is-success is-small"
              @click="habilitarCriar()"
            >
              +
            </button>
            <button
              v-if="botoes"
              class="button is-danger is-small"
              @click="desabilitarCriar"
            >
              -
            </button>
          </th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <br />
    <br />
    <!-- Botão criar -->
    <div v-if="botoes">
      <div class="field">
        <label class="label">Inserir Valores </label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Contas"
            v-model="nomeConta"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope fa-xs"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check fa-xs"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="email"
            placeholder="Valor Saida"
            v-model="saida"
          />
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-primary"
            type="email"
            placeholder="Valor Entrada"
            v-model="entrada"
          />
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>
      <button class="button is-success is-small" @click="criar">Inserir</button>
    </div>

    <!-- Botão editar-->
    <div v-if="botoes2">
      <div class="field">
        <label class="label">Editar Valores</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Contas"
            v-model="nomeConta"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope fa-xs"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check fa-xs"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="email"
            placeholder="Valor Saida"
            v-model="saida"
          />
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-primary"
            type="email"
            placeholder="Valor Entrada"
            v-model="entrada"
          />
          <span class="icon is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>
      <button class="button is-success is-small" @click="editar()">
        Salvar
      </button>
      <button
        id="bt"
        class="button is-danger is-small"
        @click="desabilitarEditar()"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import fire from "../fire";

export default {
  totalSaida: null,
  data: function () {
    return {
      itens: [],
      nomeConta: "",
      entrada: null,
      saida: null,
      botoes: false,
      botoes2: false,
      totalSaida: 0,
      totalEntrada: 0,
      aux: null,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    habilitarCriar: function () {
      this.botoes = true;
      console.log(this.itens);
    },
    desabilitarCriar: function () {
      this.botoes = false;
    },
    habilitarEditar: function (id, item) {
      this.botoes2 = true;
      this.aux = id;
      this.nomeConta = item.conta;
      this.entrada = item.valorEntrada;
      this.saida = item.valorSaida;
    },
    desabilitarEditar: function () {
      this.botoes2 = false;
    },
    criar: function () {
      /* this.itens.push({
        id: Date.now(),
        conta: this.nomeConta,
        valorEntrada: this.entrada,
        valorSaida: this.saida,
      }),
      */
      this.salvarBanco(),
        (this.nomeConta = ""),
        (this.entrada = null),
        (this.saida = null),
        //atualizar a soma
        this.somar(this.totalSaida, this.totalEntrada, this.itens);

      //desabilitar o painel criar
      this.desabilitarCriar();
    },
    apagar: function (index, id) {
      this.itens.splice(index, 1);
      console.log(id);
      fire
        .database()
        .ref("yago/" + id)
        .remove();
      //atualizar a soma
      this.somar(this.totalSaida, this.totalEntrada, this.itens);
    },
    editar: function() {
      // this.itens[this.aux].conta = this.nomeConta;
      // this.itens[this.aux].valorEntrada = this.entrada;
      // this.itens[this.aux].valorSaida = this.saida;
      const salvando = {
        conta: this.nomeConta,
        valorEntrada: this.entrada,
        valorSaida: this.saida,
      };

      fire.database().ref("yago/" + this.aux).update(salvando);

      //atualizar a soma
      this.somar(this.totalSaida, this.totalEntrada, this.itens);
      this.desabilitarEditar();
    },
    somar: function (v1, v2, itens) {
      v1 = 0;
      v2 = 0;
      itens.forEach(function (item) {
        v1 += parseInt(item.valorSaida);
        v2 += parseInt(item.valorEntrada);
      });
      this.totalSaida = v1;
      this.totalEntrada = v2;
    },

    salvarBanco() {
      const salvando = {
        conta: this.nomeConta,
        valorEntrada: this.entrada,
        valorSaida: this.saida,
      };
      fire
        .database()
        .ref("yago/" + Date.now())
        .set(salvando);
    },
  },
  created: function () {
    //atualizar a soma
    this.somar(this.totalSaida, this.totalEntrada, this.itens);
  },
  mounted() {
    const itemsRef = fire.database().ref("yago");
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      let messages = [];

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          conta: data[key].conta,
          valorEntrada: data[key].valorEntrada,
          valorSaida: data[key].valorSaida,
        });
      });
      this.itens = messages;
      this.somar(this.totalSaida, this.totalEntrada, this.itens);
    });

    //atualizar a soma
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bt {
  margin-left: 2px;
}
</style>
