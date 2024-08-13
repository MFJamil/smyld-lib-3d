<template>
    <div class="scene" v-bind="$attrs"  @mousedown="doOpenLink()" >
        <div ref="mainqube" class="qube" @mouseover="doMove" @mouseout="getback"  @touchstart="doMove" @touchend="getback">
            <div class="qube__face qube__face--front"><slot name="front"></slot></div>
            <div class="qube__face qube__face--back"><slot name="back"></slot></div>
            <div  ref="linkFace" class="qube__face qube__face--right"><slot name="right"></slot></div>
            <div class="qube__face qube__face--left"><slot name="left"></slot></div>
            <div class="qube__face qube__face--top"><slot name="top"></slot></div>
            <div class="qube__face qube__face--bottom"><slot name="bottom"></slot></div>
        </div>
    </div>
</template>
<script lang="ts">
   export default {
    name: 'Qube'
   }
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';



  const props = defineProps({
    target:{
      type: String,
      default: 'target'
    },
    settings:String,
    show:{
      type: String,
      default: 'right'
    },
    openLink:{
      type: Boolean,
      default: true
    }
  })

  const curFace = ref("show-front");
  const mainqube = ref<HTMLElement>();
  const linkFace = ref<HTMLElement>();

  const sets: string[] = ['width','height','length'];
  const doMove = () =>{
    updatequbeClass(props.show);
  }

  onMounted(()=>{
      console.log("Settings value is : " + props.settings);
      if (props.settings!=undefined) processSettings();
  })

  const parseSettings = ()=>{
      const tokens: string[]|undefined = props.settings?.split(';');
      if (tokens==undefined) return;
      console.log(tokens);
      for (const fld in tokens){
        const fields = tokens[fld].split(':');
        if ((fields!=undefined)&&(fields.length>1)){
          if (sets.includes(fields[0])){
            if (isNaN(Number(fields[1]))){
              console.error("Attribute " + fields[0] + " does not contain a number found the value " + fields[1] );
            }else
              console.log(fields[0] + ' = ' + fields[1] );
              const c1 = fields[0].charAt(0);
              mainqube.value?.style.setProperty('--f-' + c1, fields[1] + 'px');
              mainqube.value?.style.setProperty('--tr-' + c1,(Number(fields[1])/2) + 'px');

            }
        }
          
      }
    }

    const processSettings = () =>{

      parseSettings();
      /*
      this.mainEl.style.setProperty('--f-w','300px');
      this.mainEl.style.setProperty('--tr-w','150px');
      this.mainEl.style.setProperty('--f-h','200px');
      this.mainEl.style.setProperty('--tr-h','100px');
      this.mainEl.style.setProperty('--f-l','100px');
      this.mainEl.style.setProperty('--tr-l','50px');
*/
    }


    const doOpenLink = (): void =>{
      if ( (!props.openLink)||(props.target===undefined) ||(props.target!=="")) return;
      console.log(props.target);
      linkFace.value?.classList.add( "selectedLink" );
      window.location.href = props.target;
    }

    const getback=()=>{
        updatequbeClass("front");
    }

    const updatequbeClass= (newFace: string) =>{
        //console.log(target);
        if ( curFace.value ) {
            mainqube.value?.classList.remove( "show-" + curFace.value );
        }
        mainqube.value?.classList.add( "show-" + newFace );
        curFace.value = newFace;
        
    }



</script>

<style>

:root{
   --f-w:200px;
   --f-h:200px;
   --f-l:200px;
   --tr-w: calc(var(--f-w)/2);
   --tr-h: calc(var(--f-h)/2);
   --tr-l: calc(var(--f-l)/2);
}


.qube {
  cursor: pointer;
  width: var(--f-w);
  height: var(--f-h);
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(calc(-1*var(--tr-l)));
  transition: transform 1s;
}

.qube__face {
  position: absolute;
  border: 1px solid black;
  border-radius: 6px;
  color:black;
  text-align: center;
  overflow: hidden;
  box-shadow: 2px 4px 8px silver;
  
}


.qube__face--front  { transform: rotateY(  0deg) translateZ( var(--tr-l)); }
.qube__face--back   { transform: rotateY(180deg) translateZ( var(--tr-l)); }
.qube__face--right  { transform: rotateY( 90deg) translateZ(var(--tr-w)); }
.qube__face--left   { transform: rotateY(-90deg) translateZ(var(--tr-w)); }
.qube__face--top    { transform: rotateX( 90deg) translateZ(var(--tr-h)); }
.qube__face--bottom { transform: rotateX(-90deg) translateZ(var(--tr-h)); }

.qube__face--front,
.qube__face--back {
  width: var(--f-w);
  height: var(--f-h);
  color: yellowgreen;
}

.qube__face--right,
.qube__face--left {
  width: var(--f-l);
  height: var(--f-h);
  color: white;
  left: calc(var(--f-w) - var(--tr-w) - var(--tr-l));

}

.qube__face--top,
.qube__face--bottom
 {
  width: var(--f-w);
  height: var(--f-l);
  top: calc(var(--f-h) - var(--tr-h) - var(--tr-l));
}



.qube.show-front  { transform: translateZ(calc(-1*var(--tr-l))) rotateY(   0deg); }
.qube.show-back   { transform: translateZ(calc(-1*var(--tr-l))) rotateY(-180deg); }
.qube.show-right  { transform: translateZ(calc(-1*var(--tr-w))) rotateY( -90deg); }
.qube.show-left   { transform: translateZ(calc(-1*var(--tr-w))) rotateY(  90deg); }
.qube.show-top    { transform: translateZ(calc(-1*var(--tr-h))) rotateX( -90deg); }
.qube.show-bottom { transform: translateZ(calc(-1*var(--tr-h))) rotateX(  90deg); }






.qube__face--front  { background: rgb(256, 256, 256); }
.qube__face--right  { background: rgba(13, 52, 182, 0.9); }
.qube__face--back   { background: hsla(234, 87%, 43%, 0.7); }
.qube__face--left   { background: rgba(13, 52, 182, 0.9); }
.qube__face--top    { background: hsla(240, 100%, 50%, 0.7); }
.qube__face--bottom { background: hsla(231, 76%, 50%, 0.7); }


label { margin-right: 10px; }
.scene {
  width: 300px;
  height: 200px;
  /*border: 1px solid #CCC; margin: 80px;*/
  
  perspective: 400px;
  
}

.selectedLink{
  background: hsla(234, 87%, 43%, 0.4); 
}

</style>