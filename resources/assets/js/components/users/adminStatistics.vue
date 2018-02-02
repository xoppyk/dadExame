<template lang="html">
  <div>
    <vue-good-table
      title="Statistica de Utilizadores"
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :lineNumbers="true"/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueGoodTable from 'vue-good-table';

Vue.use(VueGoodTable);

export default {
  name: 'test',
  data: function(){
    return {
      columns: [
        {
          label: 'Name',
          field: 'name_user',
          filterable: true,
        },
        {
          label: 'Vitories',
          field: 'vitories',
          type: 'number',
          filterable: true,
        },
        {
          label: 'Ties',
          field: 'ties',
          type: 'number',
          filterable: true,
        },
        {
          label: 'Defeats',
          field: 'defeats',
          type: 'number',
          filterable: true,
        },
        {
          label: 'Total',
          field: 'total',
          type: 'number',
          filterable: true,
        },
      ],
      rows: [],
    };
  },
  methods: {
    inicialiseRows: function(){
        axios.get('api/statistics/forAdmin/')
            .then(response => {
                console.log(response);
                this.rows = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
  },
  mounted(){
    this.inicialiseRows();
  }
};
</script>
