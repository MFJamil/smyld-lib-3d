<template>
  <Box>
    <template #front>
      <p >Teto</p> 
    </template>
    <template #right>
      <p>Hello.....</p> 
    </template>
  </Box>
  <Qube>
    <template #front>
      <p class="text-2xl text-blue-950 font-extralight py-14">Teto</p> 
    </template>
    <template #right>
      <p class="text-2xl text-white font-extralight py-14">Go Here ></p> 
    </template>

  </Qube>
</template>

<script setup>
import Box from './components/Box.vue'
import Qube from './components/Qube.vue'

</script>
