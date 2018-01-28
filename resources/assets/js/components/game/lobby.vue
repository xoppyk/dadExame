<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>ID</th>
	            <th>Player 1</th>
	            <th>Player 2</th>
	            <th>Player 3</th>
	            <th>Player 4</th>
	            <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="game in games" :key="game.gameID">
	            <td>{{ game.gameID }}</td>
				<td v-for="(n, index) in 4">
					<label v-if="game.playersFull[index] != 'undefined'">{{ game.playersFull[index] }}</label>
					<label v-else></label>
				</td>
	            <!--<td v-if="game.playersFull[0] != 'undefined'">{{ game.playersFull[0] }}</td>
	            <td v-if="game.playersFull[1] != 'undefined'">{{ game.playersFull[1] }}</td>
	            <td v-if="game.playersFull[2] != 'undefined'">{{ game.playersFull[2] }}</td>
	            <td v-if="game.playersFull[3] != 'undefined'">{{ game.playersFull[3] }}</td>-->
	            <td>
	                <a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['games'],
        methods: {
            join(game) {
            	this.$emit('join-click', game);
            },
        },	
	}
</script>

<style scoped>

</style>