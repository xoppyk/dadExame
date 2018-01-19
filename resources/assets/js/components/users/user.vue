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
                <li v-bind:class="'is-active'" v-show="showSection === 'edit'"><a>Edit User</a></li>
                <li v-bind:class="'is-active'" v-show="showSection === 'show'"><a>Show User</a></li>
            </ul>
        </div>

        <!-- LIST OF USERS -->
        <div v-show="showSection === 'list'">
            <user-list :users="users" @show-user="showUser" @edit-click="editUser" @delete-click="deleteUser" @message="childMessage" ref="usersListRef" ></user-list>
        </div>

        <!-- EDIT USER -->
        <div v-show="showSection === 'edit'">
            <user-edit :user="currentUser" @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>
        </div>

        <!-- SHOW USER -->
        <div v-show="showSection === 'show'">
            <user-show :user="currentUser" @want-edit="editUser" @user-canceled="cancelEdit" v-if="currentUser"></user-show>
        </div>

    </div>
</template>

<script type="text/javascript">

    import UserList from './userList.vue';
    import UserCreate from './userCreate.vue';
    import UserEdit from './userEdit.vue';
    import UserShow from './userShow.vue';
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
            editUser: function(user){
                this.currentUser = user;
                this.showSuccess = false;
                this.showSection = 'edit';
            },
            showUser: function(user){
                this.currentUser = user;
                this.showSuccess = false;
                this.showSection = 'show';
            },
            deleteUser: function(user){
                axios.delete('api/users/'+user.id)
                    .then(response => {
                        this.childMessage('User Deleted');
                        this.getUsers();
                    });
            },
            savedUser: function(){
                this.currentUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.getUsers();
                this.changeSection('list');
                this.childMessage('User Saved');
            },
            cancelEdit: function(){
                this.currentUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.showSuccess = false;
                this.showSection = 'list';
            },
            cancelCreate: function(){
                this.showSuccess = false;
                this.showSection = 'list';
            },
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
            'user-create': UserCreate,
            'user-edit': UserEdit,
            'user-show': UserShow,
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
