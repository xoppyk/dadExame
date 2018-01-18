<template>
    <div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Nick Name</th>
                <th>Blocked</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users"  :key="user.id" :class="{activerow: editingUser === user}">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.nickName }}</td>
                <td v-text=" user.blocked === 1 ? 'Blocked' : ' '"></td>
                <td>
                    <a class="btn btn-xs btn-info" v-on:click.prevent="showUser(user)">Show</a>
                    <a class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>
                    <a :class="(user.blocked === 1) ?  'btn btn-xs btn-success' : 'btn btn-xs btn-warning'" v-on:click.prevent="toggleBlockUser(user)" v-text="(user.blocked === 1) ?  'UnBlock' : 'Block'"></a>
                    <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script type="text/javascript">
    // Component code (not registered)
    export default{
        props: ['users'],
        data: function(){
            return {
                editingUser: null,
                message : '',
            }
        },
        methods: {
            editUser: function(user){
                this.editingUser = user;
                this.$emit('edit-click', user);
            },
            showUser: function(user){
                this.$emit('show-user', user);
            },
            toggleBlockUser: function(user){
                if (user.blocked === 1) {
                    this.message = 'User Unbloked';
                } else {
                    this.message = 'User Bloked';
                }
                axios.post('api/users/block/'+user.id)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(user, response.data.data);
                        this.$emit('message', this.message)
                    });
            },
            deleteUser: function(user){
                this.editingUser = null;
                this.$emit('delete-click', user);
            },
        },
    }
</script>

<style scoped>
    tr.activerow {
        background: #123456  !important;
        color: #fff          !important;
},
.pagination {
}
.page-item {
}
</style>
