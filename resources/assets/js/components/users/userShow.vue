<template>
    <div class="jumbotron">
            <h2 v-text="user.blocked === 1 ? 'Blocked' : 'Active'"></h2>

            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <p class="content help is-large" v-text="form.name"></p>
                </div>
                <div class="form-group">
                    <label for="name">Email</label>
                    <p class="content help is-large" v-text="form.email"></p>
                </div>
                <div class="form-group">
                    <label for="name">Nick Name</label>
                    <p class="content help is-large" v-text="form.nickname"></p>
                </div>
                <div class="form-group" v-if="user.reason_blocked">
                    <label for="name">Reason Blocked</label>
                    <p class="content help is-large" v-text="user.reason_blocked"></p>
                </div>

                <div class="form-group" v-if="user.reason_reactivated">
                    <label for="name">Reason Reactivated</label>
                    <p class="content help is-large" v-text="user.reason_reactivated"></p>
                </div>

                <div class="control">
                    <button type="button" class="btn btn-warning" v-if="!user.blocked" data-toggle="modal" data-target="#blockUser" data-whatever="@mdo">Block</button>
                    <button type="button" class="btn btn-success" v-else data-toggle="modal" data-target="#blockUser" data-whatever="@mdo">Active</button>
                    <a class="btn btn-default" v-on:click.prevent="editUser">Edit</a>
                    <a class="btn btn-default" v-on:click.prevent="cancelShow()">Cancel</a>
                </div>

            </form>

            <!-- MESSAGE -->
            <div class="modal fade" id="blockUser" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="ModalLabel" v-text="user.blocked === 1 ? 'Reactive User' : 'Block User'"></h3>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="message-text" class="form-control-label" v-text="user.blocked === 1 ? 'Reason to Reactive' : 'Reason to Block'"></label>
                        <textarea class="form-control"v-model="messageBlock"></textarea>
                      </div>
                    </form>
                    <div class="checkbox" v-if="!user.blocked">
                      <label><input v-model="sendMail" type="checkbox" value="">Send Mail</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" v-if="user.blocked" v-text="'Active'" v-on:click.prevent="activeUser(user)" data-dismiss="modal"></button>
                    <button type="button" class="btn btn-warning" v-else v-text="'Block'" v-on:click.prevent="blockUser(user)" data-dismiss="modal"></button>
                  </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script type="text/javascript">
    import {Form} from '../../classes/Form';
    export default {
        props: ['user'],
        data: function(){
            return {
                form: new Form({
                    name: this.user.name,
                    email: this.user.email,
                    nickname: this.user.nickName,
                }),
                messageBlock: '',
                sendMail: false
            }
        },
        methods: {
            editUser: function(){
                this.$emit('want-edit', this.user);
            },
            blockUser: function(){
              axios.post('api/users/block/'+this.user.id, {
                reason : this.messageBlock,
                sendMail : this.sendMail
              })
                  .then(response=>{
                      Object.assign(this.user, response.data.data);
                  });
            },
            activeUser: function(){
              axios.post('api/users/active/'+this.user.id, {reason : this.messageBlock})
                  .then(response=>{
                      Object.assign(this.user, response.data.data);
                  });
            },
            cancelShow: function(){
                this.$emit('user-canceled');
            }
        }
    }
</script>

<style scoped>

</style>
