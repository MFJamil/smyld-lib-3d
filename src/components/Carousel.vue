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
    <div class="scene" @touchstart="touchStart" @touchmove="touchMove">
        <div class="carousel" ref="mainComp">
            <!--
            <div class="carousel__cell" v-for="img in images" :key="img.name" @click="showImages=true">
                <img class="carousel_img" :src="img.pic" >
            </div>
            -->
            <div class="carousel__cell" v-for="(item,i) in items" :key="i" @click="showImages=true">
                <slot v-if="item!==undefined" :name="item"></slot>
                <div v-else>{{ i+1 }}</div>
            </div>

        </div>

        <!-- Below Part can be activated via a slot, but currently it make no sense to do so, unless we give the developer the option to control the carousel functions-->
        <div class="controlPanel" 
            :style="`transform: rotateZ(${isHorizontal?'90':'0'}deg);`">
            
            <button type="button"  @click="move(language=='ar')" >
                <i :class="`pi pi-arrow-circle-${language=='ar'?'down':'up'}`"></i>    
            </button>
            <button type="button" @click="onOrientationChange(!isHorizontal)">
                <i :class="`pi pi-arrows-${isHorizontal?'v':'h'}`"></i>
            </button>
            <button type="button"   @click="move(language!=='ar')" >
                <i :class="`pi pi-arrow-circle-${language!=='ar'?'down':'up'}`"></i>    
            </button>
        </div>
    </div>
</template>
 <script lang="ts">
    export default {
        name: 'Carousel'
    }

    export interface CarouselObject{
        name:string;
        pic:string;
    }
 </script>
 
 <script setup lang="ts">
   import {onMounted, ref,type PropType} from 'vue';
   
   const xDown:any=ref(null);
   const yDown:any=ref(null);
   let isHorizontal = ref(true);
   let selectedIndex = 0;
   let theta = 0;
   let radius = 0;
   let cellCount = 8; // Should be either the total count of the faces or via properties 
   let cellWidth = 0;
   let cellHeight = 0;
   let rotateFn = isHorizontal.value ? 'rotateY' : 'rotateX';

   let cells!:NodeListOf<HTMLElement>;
   let comp!:HTMLElement;
   const mainComp = ref<HTMLElement>();
   const horizontalIcon = ref('mdi-swap-vertical-bold');
   const showImages = ref(false);
   
   const props = defineProps({
      language:{
        type:String,
        default: 'de'
      },
      images:{
        type: Array as PropType<CarouselObject[]>,
        default: []
      },
      items:{
        type:Array as PropType<Object[]>,
        default:0
      }    

   });
   const emits = defineEmits(['selected'])
   const touchStart=(e:any)=>{
       //console.log("Touch Start detected ....");
        const firstTouch = e.touches[0];                                      
        xDown.value = firstTouch.clientX;                                      
        yDown.value = firstTouch.clientY;          
   }
    const touchMove=(e:any)=>{
       //console.log("Touch Move detected ....");
       if (yDown.value==null||xDown.value==null) return;
        let xUp = e.touches[0].clientX;                                    
        let yUp = e.touches[0].clientY;

        let xDiff = xDown.value - xUp;
        let yDiff = yDown.value - yUp;
         if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                if (isHorizontal.value)
                    next();
            } else {
                if (isHorizontal.value)
                    previous();
            }                       
        } else {
            if ( yDiff > 0 ) {
                if (!isHorizontal.value) next();
                
            } else { 
                /* up swipe */
                if (!isHorizontal.value) previous();
            }                                                                 
        }
        /* reset values */
        xDown.value = null;
        yDown.value = null;  
        e.preventDefault();                                          
   }
   const next=():any=>{
       selectedIndex++;
       changeCarousel();
   }
    const previous=():any=>{
        selectedIndex--;
        changeCarousel();
    }
   const changeCarousel=()=>{
    //Below count should be updated via component params
    //this.cellCount = cellsRange.value;
    cellCount = props.items.length>0?props.items.length:props.images.length>0?props.images.length:3;
    theta = 360 / cellCount;
    var cellSize = isHorizontal.value ? cellWidth : cellHeight;
    radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );

    for ( var i=0; i < cells.length; i++ ) {
        let cell:HTMLElement = cells[i];
        if ( i < cellCount ) {
            // visible cell
            cell.style.opacity = '1';
            var cellAngle = theta * i;
            console.log(`Angle is ${cellAngle} for Item ${props.items[i]}`)
            cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;
        } else {
            // hidden cell
            cell.style.opacity = '0';
            cell.style.transform = 'none';
        }
    }
    rotateCarousel();
   }

    const rotateCarousel= ()=>{
        var angle = theta * selectedIndex * -1;
        comp.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angle}deg)`;
        console.log(`Angle is ${angle} Rotate Function ${rotateFn}`)
        setTimeout(() => {
            let activeItemIndex = selectedIndex%cellCount===0?1:selectedIndex<0?1+cellCount-Math.abs(selectedIndex)%cellCount:selectedIndex%cellCount+1;
            console.log(`Selected Index ${selectedIndex} division over count from ${cellCount} :: ${activeItemIndex}`);
            console.log(`Visible Item Slot is ${props.items[activeItemIndex-1]}`);
            if (props.items[activeItemIndex-1]!==undefined)
                emits("selected",props.items[activeItemIndex-1]);
            //cells.forEach((curCell) => console.dir(curCell.offsetLeft));
        }, 1000);
    }

    onMounted(()=>{
        if (mainComp.value!==undefined)
            comp = mainComp.value;
        doInit();
        onOrientationChange();
    });

    const doInit=()=>{
      cells = comp.querySelectorAll('.carousel__cell');
      cellWidth = comp.offsetWidth;
      cellHeight = comp.offsetHeight;
    }
    const onOrientationChange=(horizontalDirection=true) => {
    //Code below to be updated via a special control
        horizontalIcon.value = horizontalDirection?'mdi-swap-vertical-bold':'mdi-swap-horizontal-bold';
        isHorizontal.value = horizontalDirection;
        rotateFn = isHorizontal.value ? 'rotateY' : 'rotateX';
        changeCarousel();
    }

    const move=(forward:boolean)=>{
      selectedIndex = selectedIndex + (forward?1:-1);       
      changeCarousel();
   }


 </script>
 
 <style scoped>
 
.scene {
  /*border: 1px solid #CCC;*/
  margin: 40px 0;
  position: relative;
  width: 210px;
  height: 140px;
  margin: 80px auto;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateZ(-288px);
  transform-style: preserve-3d;
  transition: transform 1s;
}

.carousel__cell {
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  border: 2px solid black;
  line-height: 116px;
  font-size: 80px;
  font-weight: bold;
  color: white;
  text-align: center;
  transition: transform 1s, opacity 1s;
}
.carousel_img{
  width: 190px;
  height: 120px;

}

.carousel__cell:nth-child(9n+1) { background: hsla(  0, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+2) { background: hsla( 40, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+3) { background: hsla( 80, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+4) { background: hsla(120, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+5) { background: hsla(160, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+6) { background: hsla(200, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+7) { background: hsla(240, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+8) { background: hsla(280, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+0) { background: hsla(320, 100%, 50%, 0.8); }

.carousel__cell:nth-child(1) { transform: rotateY(  0deg) translateZ(288px); }
.carousel__cell:nth-child(2) { transform: rotateY( 40deg) translateZ(288px); }
.carousel__cell:nth-child(3) { transform: rotateY( 80deg) translateZ(288px); }
.carousel__cell:nth-child(4) { transform: rotateY(120deg) translateZ(288px); }
.carousel__cell:nth-child(5) { transform: rotateY(160deg) translateZ(288px); }
.carousel__cell:nth-child(6) { transform: rotateY(200deg) translateZ(288px); }
.carousel__cell:nth-child(7) { transform: rotateY(240deg) translateZ(288px); }
.carousel__cell:nth-child(8) { transform: rotateY(280deg) translateZ(288px); }
.carousel__cell:nth-child(9) { transform: rotateY(320deg) translateZ(288px); }



.carousel-options {
  text-align: center;
  position: relative;
  z-index: 2;
  background: hsla(0, 0%, 100%, 0.8);
}
.controlPanel{
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: -50px;
    right: -50px;
    transition: all 1s ease-out;
    
}   
</style>