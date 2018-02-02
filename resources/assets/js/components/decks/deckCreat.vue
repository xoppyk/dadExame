<template>
  <div class="row">
    <div class="col-sm-12 col-lg-12">
      Name deck: <input v-model="newNameDeck" placeholder="Name Deck">
      Active: <input type="checkbox" v-model="newActiveDeck">
      Complete: <input type="checkbox" v-model="newCompleteDeck"><br>
      Hidden Face:<input type="file" v-on:change="onFileChangeHidden" name="image">
    </div>

    <div v-for="(index, key) in cardsByDeck" class="col-sm-2 col-lg-2">
      <a class="small-button red" v-on:click.prevent="removeCard(key)" href=""><span class="glyphicon glyphicon-remove" style="float:right"></span></a>
      <label for="card.id"><img v-bind:src="cardImageURL(cardsByDeck[key])" width="70px"></label>
    </div>

    <div class="col-sm-12 col-lg-12">
      {{ message }}
      <br>
      <a class="btn btn-xs btn-success" v-show="validactionSave" v-on:click.prevent="saveDeck">Save Deck</a>
      <a class="btn btn-xs btn-success" v-show="validactionAdd" v-on:click.prevent="addCard">Add Card</a>
      <a class="btn btn-xs btn-danger" v-on:click.prevent="cancelCreate">Cancel Edit</a>
      <input v-if="add" type="file" v-on:change="onFileChange" name="image">
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cardsByDeck: new Array(),
      message: '',
      validactionSave: true,
      validactionAdd: true,
      add: false,
      newNameDeck: '',
      newCompleteDeck: 0,
      newActiveDeck: 0,
      hidden_face_image_path: '',
    }
  },
  methods: {
    cardImageURL: function(card) {
        if(card != 'undefined' && card != null){
            return 'img/' + card;
        }
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
          console.log(this.cardsByDeck);
          if(this.cardsByDeck.length < 52){
            this.message = 'Need at least 52 cards!!';
          }else if(this.cardsByDeck.length == 52){
            this.validactionAdd = false;
            this.validactionSave = true;
            this.message = 'Add new Card!!';
          }
        });
    },

    onFileChangeHidden(e) {
      const config = {headers: { 'content-type': 'multipart/form-data' }}
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
          return;
      this.hidden_face_image_path = files[0].name;

      let data = new FormData();
      data.append('image', files[0], files[0].name);

      axios.post('api/cards/uploadCard', data, config);
    },

    saveDeck: function(){
      axios.post('api/decks',
        {name: this.newNameDeck, active: this.newActiveDeck, hidden_face_image_path: this.hidden_face_image_path, complete: this.newCompleteDeck, cards: this.cardsByDeck})
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

    cancelCreate: function(){
      this.$emit('deck-canceled');
    },

  },
  mounted() {
  }
}
</script>

<style lang="css">
</style>
