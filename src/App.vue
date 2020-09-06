<template>
  <div id="app">
    
    <Qube settings="width:200;height: 300;length:150;" show="back" >
      <div slot="front" style="position:absolute;width:100%;height;100%;border:1px solid red;">Front</div>
      <div slot="right" style="padding-top:30px;">Right</div>
      <div slot="left" style="padding-top:30px;">Left</div>
      <div slot="back" style="padding-top:30px;">Back</div>
      <div slot="top" style="padding-top:30px;">Top</div>
      <div slot="bottom" style="padding-top:30px;">Bottom</div>

    </Qube>


    <Box settings="width:400px;height: 200px;length:150px;bg-front:red;" style="position:absolute;left:250px;top:10px;" >
      <div slot="front" style="padding-top:30px;" >Front</div>
      <div slot="right" style="padding-top:30px;">Right</div>
      <div slot="left" style="padding-top:30px;">Left</div>
      <div slot="back" style="padding-top:30px;">Back</div>
      <div slot="top" style="padding-top:30px;">Top</div>
      <div slot="bottom" style="padding-top:30px;">Bottom</div>

    </Box>

    <img alt="Vue logo" src="./assets/logo.png">
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Box from './components/Box.vue';
import Qube from './components/Qube.vue';


@Component({
  components: {
    Qube,
    Box
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
