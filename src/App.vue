<template>
  <Box>
    <template #front>
      <p >Teto</p> 
    </template>
    <template #right>
      <p>Hello.....</p> 
    </template>
  </Box>
  <div style="width:100%; display: flex; justify-content: center;left:150px;position: relative;">
    <Qube settings="width:80;left:100px;" show="right" :open-link="false">
    <template #front>
      <p class="text-2xl text-blue-950 font-extralight py-14">Teto</p> 
    </template>
    <template #right>
      <p class="text-2xl text-white font-extralight py-14 border-2">I am Right ></p> 
    </template>
    <template #left>
      <p class="text-2xl text-white font-extralight py-14">Left Here ></p> 
    </template>

  </Qube>
  <Carousel :images="images" :items="['one','two','three','four','five']">
    <template #one>
      <div onclick="console.log('Item one clicked')">1</div>
      
    </template>
    <template #two>2</template>
    <template #three>3</template>
    <template #four>4</template>
    <template #five>5</template>
    

  </Carousel>
  </div>
  
</template>

<script setup>
import Box from './components/Box.vue'
import Qube from './components/Qube.vue'
import Carousel from './components/Carousel.vue'
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

