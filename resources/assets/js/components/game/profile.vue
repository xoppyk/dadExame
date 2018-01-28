<template>
    <div class="jumbotron">
            <h2>Edit User</h2>

            <form method="PUT" action="api/users/">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text" class="form-control" v-model="form.name"
                        name="name" id="name"
                        placeholder="Fullname"/>
                    <p class="content help is-danger is-large" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></p>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email" class="form-control" v-model="form.email"
                        name="email" id="email"
                        placeholder="Email address"/>
                    <p class="content help is-danger is-large" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></p>
                </div>

                <div class="form-group">
                    <label for="nickname">NickName</label>
                    <input
                        type="text" class="form-control" v-model="form.nickname"
                        name="nickname" id="nickname"
                        placeholder="Nick Name"/>
                    <p class="content help is-danger is-large" v-if="form.errors.has('nickname')" v-text="form.errors.get('nickname')"></p>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password" class="form-control" v-model="form.password"
                        name="password" id="password"
                        placeholder="Password"/>
                    <p class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                </div>
                <div class="form-group">
                    <label for="passwordConfirmation">Confirmation Password</label>
                    <input
                        type="password" class="form-control" v-model="form.password_confirmation"
                        name="password_confirmation" id="password_confirmation"
                        placeholder="Password Confirmation"/>
                    <p class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                </div>
                <div class="control">
                    <a class="btn btn-default" v-on:click.prevent="saveUser">Save</a>
                    <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
                </div>
            </form>
        </div>
</template>

<script type="text/javascript">
    import {Form} from '../../classes/Form';
    export default {
        // props: ['user'],
        data: function(){
            return {
                form: new Form({
                    name: this.user.name,
                    email: this.user.email,
                    nickname: this.user.nickName,
                    password: '',
                    password_confirmation: '',
                })
            }
        },
        methods: {
            saveUser: function(){
                this.form.put('api/users/' + this.user.id)
                    .then(response => {
                        this.$emit('user-saved');
                    })
                    .catch(error => console.log('Whoops'));
            },
            cancelEdit: function(){
                axios.get('api/users/'+this.user.id)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-canceled', this.user);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
