<template>
    <div class="jumbotron">
        <h2>Create User</h2>

        <form method="POST" action="api/users/"  @keydown="form.errors.clear($event.target.name)">
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
                <p class="content help is-danger is-large" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                <label for="password_confirmation">Password Confirmation</label>
                <input
                    type="password" class="form-control" v-model="form.password_confirmation"
                    name="password_confirmation" id="password_confirmation"
                    placeholder="Password Confirmation"/>
                <p class="content help is-danger is-large" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
            </div>
            <div class="control">
                <a class="btn btn-default" v-on:click.prevent="createUser()">Create</a>
                <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
            </div>
        </form>
    </div>
</template>


<script type="text/javascript">
    import {Form} from '../../classes/Form';
    export default {
        data: function(){
            return {
                form: new Form({
                    name: '',
                    email: '',
                    nickname: '',
                    password: '',
                    password_confirmation: '',
                })
            }
        },
        methods: {
            createUser(){
                this.form.post('api/users/')
                   // .then(response => console.log("Success"))
                   .then(response => {
                        this.$emit('user-created');
                   })
                   .catch(error => console.log('Whoops'));
            },
            cancelEdit () {
                this.$emit('user-canceled');
            }
        }
    }

</script>

<style scoped>

</style>