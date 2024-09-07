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
  <Carousel :images="images" :items="['one','two','three','Four']">
    <template #one>
      <span class="text-sm">This is me</span>
    </template>
    <template #two>2</template>
    <template #three>3</template>
    

  </Carousel>
  </div>
  
</template>

<script setup>
import Box from './components/Box.vue'
import Qube from './components/Qube.vue'
import Carousel from './labs/Carousel_3d.vue'
const images = [
        {
            name: 'pic1',
            pic: 'images/tour/cln_1.jpg',
        },
        {
            name: 'pic2',
            pic: 'images/tour/cln_2.jpg',
        },
        {
            name: 'pic3',
            pic: 'images/tour/cln_3.jpg',
        },
        {
            name: 'pic4',
            pic: 'images/tour/cln_4.jpg',
        },
        {
            name: 'pic5',
            pic: 'images/tour/cln_5.jpg',
        },
        {
            name: 'pic6',
            pic: 'images/tour/cln_6.jpg',
        },
        {
            name: 'pic7',
            pic: 'images/tour/cln_7.jpg',
        },
        {
            name: 'pic8',
            pic: 'images/tour/cln_8.jpg',
        },

       ];


</script>

