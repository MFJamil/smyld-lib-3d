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

import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class Box extends Vue {
    @Prop({default: 'target'})
    target!: string;

    @Prop()
    settings!: string;

    private curFace="show-front";

    doMove(){
        //console.log("Do move");
        this.updateBoxClass("right");
                        
    }

    mounted(){
      console.log("Settings value is : " + this.settings);

    }


    public openLink(): void{
        console.log(this.target);
        
        const leftFace: HTMLElement = (this.$refs.linkFace) as HTMLElement;
        leftFace.classList.add( "selectedLink" );
        window.location.href = this.target;
        
    }

    getback(){
        //console.log("Do move");
        this.updateBoxClass("front");
                        
    }

    updateBoxClass(newFace: string){
        const mainEl: HTMLElement = this.$refs.mainBox as HTMLElement;

        //console.log(target);
        if ( this.curFace ) {
            mainEl.classList.remove( "show-" + this.curFace );
        }
        mainEl.classList.add( "show-" + newFace );
        this.curFace = newFace;
        
    }


}
</script>

<style>

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