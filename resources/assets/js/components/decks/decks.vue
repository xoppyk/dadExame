<template lang="html">
  <div class="container">
      <h3>Decks</h3>
      <br>

      <button class="btn btn-success" v-on:click.prevent="creatDeck">Creat Deck</button>

      <div>
        <a class="small-button" v-on:click.prevent="start" v-if="indexDeckAtual > 0"><span class="glyphicon glyphicon-step-backward" style="float:left"></span></a>
        <a class="small-button" v-on:click.prevent="previous" v-if="indexDeckAtual > 0"><span class="glyphicon glyphicon-backward" style="float:left"></span></a>
        <a class="small-button" v-on:click.prevent="end" v-if="indexDeckAtual < (decks.length-1)"><span class="glyphicon glyphicon-step-forward" style="float:right"></span></a>
        <a class="small-button" v-on:click.prevent="next" v-if="indexDeckAtual < (decks.length-1)"><span class="glyphicon glyphicon-forward" style="float:right"></span></a>
      </div>

      <div style="margin: auto;width: 50%;text-align: center;">{{ indexDeckAtual+1 }}/{{ decks.length }}</div>

      <br><br>

      <div class="row" v-show="indexDeckAtual >= 0">
        <div class="col-sm-12 col-lg-12">
          <h4 v-if="decks[indexDeckAtual] != undefined">#{{ decks[indexDeckAtual].id }} - "{{ decks[indexDeckAtual].name }}"</h4>
        </div>

        <br><br>

        <button class="btn btn-info" v-on:click.prevent="editCardsByDeck(indexDeckAtual)">Edit Deck</button>

        <div class="row" v-if="deckActive">
          <div v-for="card in cardsByDeck" class="col-sm-2 col-lg-2">
            <img v-bind:src="cardImageURL(card)" width="72px">
          </div>
          <div class="col-sm-2 col-lg-2">
            <img v-bind:src="cardImageURL(decks[indexDeckAtual].hidden_face_image_path)" width="72px">
          </div>
        </div>
      </div>

      <div class="row" v-if="deckEdit">
        <div class="col-sm-12 col-lg-12">
          Name deck: <input v-model="decks[indexDeckAtual].name" placeholder="Name Deck">
          Active: <input type="checkbox" v-model="decks[indexDeckAtual].active">
          Complete: <input type="checkbox" v-model="decks[indexDeckAtual].complete">
          Hidden Face:<input type="file" v-on:change="onFileChangeHidden" name="image">
        </div>

        <div v-for="(index, key) in cardsByDeck" class="col-sm-2 col-lg-2">
          <a class="small-button" v-on:click.prevent="removeCard(key)" href=""><span class="glyphicon glyphicon-remove" style="float:right"></span></a>
          <label for="card.id"><img v-bind:src="cardImageURL(cardsByDeck[key])" width="72px"></label>
        </div>

        <div class="col-sm-12 col-lg-12">
          {{ message }}
          <br>
          <a class="btn btn-xs btn-success" v-show="validactionAdd" v-on:click.prevent="addCard">Add Card</a>
          <a class="btn btn-xs btn-danger" v-on:click.prevent="cancelEdit(indexDeckAtual)">Cancel Edit</a>
          <a class="btn btn-xs btn-success" v-show="validactionSave" v-on:click.prevent="saveDeck">Save Deck</a>
          <input type="file" v-if="add" v-on:change="onFileChange" name="image">
        </div>
      </div>

      <div v-if="deckCreat">
        <deck-create @deck-canceled="cancelEdit(0)"></deck-create>
      </div>

    </div>
</template>

<script>
import DeckCreate from './deckCreat.vue';

export default {
  data: function() {
    return {
      deckActive: false,
      deckEdit: false,
      deckCreat: false,
      decks: {},
      indexDeckAtual: -1,
      cardsByDeck: new Array(),
      message: '',
      validactionSave: true,
      validactionAdd: true,
      add: false,
    }
  },
  methods: {
    getDecks: function() {
      axios.get('api/decks')
          .then((response) => {
            this.decks = response.data.data;
            if(this.decks.length >= 0){
              this.getCardsByDeck(0);
            }
          })
    },

    getCardsByDeck: function(indexDeck) {
      this.deckActive = true;
      this.deckEdit = false;
      this.indexDeckAtual = indexDeck;
      this.cardsByDeck = new Array();
      axios.get('api/cards/deck/' + this.decks[indexDeck].id)
          .then((response) => {
            //console.log(response.data);
            for(var i = 0; i < response.data.length; i++){
              this.cardsByDeck.push(response.data[i].path);
              //console.log(this.cardsByDec[i]);
            }
          });
    },

    end: function(){
      this.getCardsByDeck(this.decks.length-1);
    },

    start: function(){
      this.getCardsByDeck(0);
    },

    previous: function(){
      if(this.indexDeckAtual > 0){
        this.getCardsByDeck(--this.indexDeckAtual);
        this.deckEdit = false;
        this.deckActive = true;
      }
    },

    next: function(){
      if(this.indexDeckAtual < (this.decks.length-1)){
        this.getCardsByDeck(++this.indexDeckAtual);
        this.deckEdit = false;
        this.deckActive = true;
      }
    },

    cardImageURL: function(card) {
        if(card != 'undefined' && card != null){
            return 'img/' + card;
        }
    },

    onFileChangeHidden(e) {
      const config = {headers: { 'content-type': 'multipart/form-data' }}
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
          return;
      this.decks[this.indexDeckAtual].hidden_face_image_path = files[0].name;

      let data = new FormData();
      data.append('image', files[0], files[0].name);

      axios.post('api/cards/uploadCard', data, config);
    },

    onFileChange(e) {
      const config = {headers: { 'content-type': 'multipart/form-data' }}
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
          return;
      var currentCard = files[0].name;
      //console.log("new card" + currentCard);
      let data = new FormData();
      data.append('image', files[0], files[0].name);

      axios.post('api/cards/uploadCard', data, config)
        .then(response => {
          this.cardsByDeck.push(currentCard);
          //console.log(this.cardsByDeck);
          if(this.cardsByDeck.length < 52){
            this.message = 'Need at least 52 cards!!';
          }else if(this.cardsByDeck.length == 52){
            this.add = false;
            this.validactionAdd = false;
            this.validactionSave = true;
            this.message = 'Add new Card!!';
          }
        });
    },

    editCardsByDeck: function(indexDeck) {
      console.log('editCardsByDeck'+indexDeck);
      this.deckEdit = true;
      this.deckActive = false;
      this.validactionAdd = false;
      console.log(this.cardsByDeck.length);
      if(this.cardsByDeck.length < 52){
        this.validactionSave = false;
        this.message = 'Need at least 52 cards!!';
      }else{
        this.validactionSave = true;
        this.message = '';
      }
    },

    creatDeck: function(){
      this.deckActive = false;
      this.deckEdit = false;
      this.indexDeckAtual = -1;
      this.deckCreat = true;
    },

    saveDeck: function(){
      //console.log(this.cardsByDeck.length);
      if(this.cardsByDeck.length != 52){
        this.validactionSave = false;
        return;
      }
      axios.put('api/decks/' + this.decks[this.indexDeckAtual].id + '/update',
                {name: this.decks[this.indexDeckAtual].name, active: this.decks[this.indexDeckAtual].active,hidden_face_image_path: this.decks[this.indexDeckAtual].hidden_face_image_path, complete: this.decks[this.indexDeckAtual].complete, cards: this.cardsByDeck})
          .then(response =>{
            //console.log(response);
            this.getCardsByDeck(this.indexDeckAtual);
          });

    },

    removeCard: function(index){
      this.cardsByDeck.splice(index, 1);
      if(this.cardsByDeck.length < 52){
        this.validactionAdd = true;
        this.validactionSave = false;
        this.message = 'Need at least 52 cards!!';
      }
    },

    addCard: function(){
      this.add = true;
    },

    cancelEdit: function(indexDeck){
      console.log('aqui');
      this.indexDeckAtual = indexDeck;
      this.add = false;
      this.deckEdit = false;
      this.deckActive = true;
    },

  },
  components: {
      'deck-create': DeckCreate,
  },
  mounted() {
    this.deckEdit = false;
    this.getDecks();
  }
}
</script>

<style lang="css">
</style>
