<template>
  <div class="home">
    <h1>Hospedaria</h1>
    <p>Escolha uma opção no menu lateral.</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.home h1 {
  font-size: 30px;
  margin-bottom: 8px;
}
.home p {
  color: #555;
}
</style>
