<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>

        <!-- SUCCES MESSAGE -->
        <div class="alert alert-success" v-if="showSuccess">
            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>

        <!-- NAV -->
        <div class="tabs is-large">
            <ul>
                <li v-bind:class="{'is-active': showSection === 'list'}"><a v-on:click="changeSection('list')" v-bind:disable="showSection === 'list'">List Users</a></li>
                <!-- <li v-bind:class="{'is-active': showSection === 'create'}"><a v-on:click="changeSection('create')">CreateUser</a></li>
                <li v-bind:class="'is-active'" v-show="showSection === 'edit'"><a>Edit User</a></li>
                <li v-bind:class="'is-active'" v-show="showSection === 'show'"><a>Show User</a></li> -->
            </ul>
        </div>
        <!-- LIST OF USERS -->
        <div v-show="showSection === 'list'">
            <user-list :users="users" @message="childMessage" ref="usersListRef" ></user-list>
        </div>
    </div>
</template>

<script type="text/javascript">

    import UserList from './userList.vue';
    export default {
        data: function(){
            return {
                title: 'List Users',
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: [],
                showSection: 'list'
            }
        },
        methods: {
            getUsers: function(){
                // axios.get('api/users', {params: { page : 5 }})
                axios.get('api/users')
                    .then(response=>{this.users = response.data.data; });
            },
            childMessage: function(message){
                this.showSuccess = true;
                this.successMessage = message;
            },
            changeSection (section) {
                if (section === 'list') {
                    this.cancelEdit();
                    this.cancelCreate();
                }
                this.showSection = section;
            }
        },
        components: {
            'user-list': UserList,
        },
        mounted() {
            this.getUsers();
        }

    }
</script>

<style scoped>
p {
    font-size: 2em;
    text-align: center;
}
</style>
