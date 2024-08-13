<template>
  <Box>
    <template #front>
      <p >Teto</p> 
    </template>
    <template #right>
      <p>Hello.....</p> 
    </template>
  </Box>
  <div style="width:100%; display: flex; justify-content: center;">
    <Qube settings="width:80;" show="top" open-link="false">
    <template #front>
      <p class="text-2xl text-blue-950 font-extralight py-14">Teto</p> 
    </template>
    <template #right>
      <p class="text-2xl text-white font-extralight py-14">I am Right ></p> 
    </template>
    <template #left>
      <p class="text-2xl text-white font-extralight py-14">Left Here ></p> 
    </template>

  </Qube>
  </div>
  
</template>

<script setup>
import Box from './components/Box.vue'
import Qube from './components/Qube.vue'

</script>
