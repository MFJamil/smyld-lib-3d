<!--

Copyright © 2024 David DeSandro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->
<template>
    <div class="scene" v-bind="$attrs"  @mousedown="openLink()" >
        <div ref="mainBox" class="box" @mouseover="doMove" @mouseout="getback">
            <div class="box__face box__face--front"><slot v-bind="$attrs" name="front"></slot></div>
            <div class="box__face box__face--back"><slot name="back"></slot></div>
            <div  ref="linkFace" class="box__face box__face--right"><slot name="right"></slot></div>
            <div class="box__face box__face--left"><slot name="left"></slot></div>
            <div class="box__face box__face--top"><slot name="top"></slot></div>
            <div class="box__face box__face--bottom"><slot name="bottom"></slot></div>
        </div>
    </div>
</template>

<script lang="ts">
   export default {
    name: 'Box'
   }
</script>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    target:{
      type: String,
      default: 'target'
    },
    settings:String
  })

    const curFace = ref("show-front");
    const mainBox = ref<HTMLElement>();
    const linkFace = ref<HTMLElement>();

    const doMove=()=>{
        //console.log("Do move");
        updateBoxClass("right");
                        
    }

    onMounted(()=>{
      console.log("Settings value is : " + props.settings);

    })


    const openLink = (): void=>{
        console.log(props.target);
        const leftFace: HTMLElement = (linkFace.value) as HTMLElement;
        leftFace.classList.add( "selectedLink" );
        window.location.href = props.target;
        
    }

    const getback= ()=>{
        //console.log("Do move");
        updateBoxClass("front");
                        
    }

    const updateBoxClass = (newFace: string) =>{
        const mainEl: HTMLElement = mainBox.value as HTMLElement;

        //console.log(target);
        if ( curFace.value ) {
            mainEl.classList.remove( "show-" + curFace.value );
        }
        mainEl.classList.add( "show-" + newFace );
        curFace.value = newFace;
        
    }



</script>

<style scoped>

.scene {
  width: 300px;
  height: 200px;
  /*border: 1px solid #CCC;*/
  margin: 80px;
  perspective: 400px;
  
}

.box {
  cursor: pointer;
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-50px);
  transition: transform 1s;
  

}

.box.show-front  { transform: translateZ( -50px) rotateY(   0deg); }
.box.show-back   { transform: translateZ( -50px) rotateY(-180deg); }
.box.show-right  { transform: translateZ(-100px) rotateY( -90deg); }
.box.show-left   { transform: translateZ(-100px) rotateY(  90deg); }
.box.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
.box.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }


.box__face {
  position: absolute;
  border: 1px solid black;
  border-radius: 6px;
  color:black;
  text-align: center;
  overflow: hidden;
  box-shadow: 2px 4px 8px silver;
  
}

.selectedLink{
  background: hsla(234, 87%, 43%, 0.4); 
}

.box__face--front,
.box__face--back {
  width: 200px;
  height: 200px;
  
}

.box__face--right,
.box__face--left {
  width: 200px;
  height: 200px;
  left: 0px;
  color: white;
  
}

.box__face--top,
.box__face--bottom {
  width: 200px;
  height: 200px;
  top: 0px;
}

.box__face--front  { background: rgb(256, 256, 256); }
.box__face--right  { background: rgba(13, 52, 182, 0.9); }
.box__face--back   { background: hsla(234, 87%, 43%, 0.7); }
.box__face--left   { background: rgba(13, 52, 182, 0.9); }
.box__face--top    { background: hsla(240, 100%, 50%, 0.7); }
.box__face--bottom { background: hsla(231, 76%, 50%, 0.7); }

.box__face--front  { transform: rotateY(  0deg) translateZ(100px); }
.box__face--back   { transform: rotateY(180deg) translateZ(100px); }

.box__face--right  { transform: rotateY( 90deg) translateZ(100px); }
.box__face--left   { transform: rotateY(-90deg) translateZ(100px); }

.box__face--top    { transform: rotateX( 90deg) translateZ(100px); }
.box__face--bottom { transform: rotateX(-90deg) translateZ(100px); }

label { margin-right: 10px; }
</style>