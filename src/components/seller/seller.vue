<template>
	
	
</template>

<script>
export default{
	data(){
		return {
			seller: {}
		}
	},
	created(){
	  this.seller=JSON.parse(localStorage.getItem("seller"));
	}
};
</script>

<style>
	
</style>