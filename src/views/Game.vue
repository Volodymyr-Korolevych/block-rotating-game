<template>
  <div id="game">
    <div id="controls">
      <button @click="newGame()" v-if="wonCondition">
        Розпочати нову гру
      </button>
    </div>
    <div id="block-container" :key="toReRender">
      <block
        v-for="i in 12"
        :key="i"
        :ind="i - 1"
        :level="0"
        :center="100"
        :offset="[0, 0]"
        :blockType="blocks[i - 1]"
        @InitCircle="showCircle"
        @RegisterBlock="registerBlock"
      />
      <box-circle
        v-if="circleVisible"
        :ind="rotationCenter"
        :blocks="blocks"
        :blockRefs="blockRefs"
        @Destroy="destroyCircle"
      />
    </div>
  </div>
</template>

<script lang="ts">
// import { RotationsEnum, BlocksEnum, blockPositions, blockImages, PositionType } from "./config";
import { BlocksEnum } from '../config'
import { Component, Vue } from 'vue-property-decorator'

import block from '../components/block.vue'
import boxCircle from '../components/boxCircle.vue'

@Component({
  components: {
    block,
    boxCircle,
  },
})
export default class Game extends Vue {
  private blocks: Array<number> = []
  private blockRefs: Array<unknown> = []
  private rotationCenter = 0
  private circleVisible = false
  private toReRender = 1
  public wonCondition = false

  created() {
    this.shuffle()
  }

  shuffle(): void {
    this.blocks = [
      ...new Array(9).fill(BlocksEnum.regular),
      BlocksEnum.red,
      BlocksEnum.blue,
      BlocksEnum.green,
    ].sort(() => Math.random() - 0.1)
    console.log('Game Shuffle', this.blocks)

    /* eslint-disable */
    let note = new Audio(require('../assets/sounds/box-opened.mp3'))

    note.addEventListener("canplaythrough", () => { 
        note.play();
      });


  }

  registerBlock(ref: unknown, ind: number): void {
    this.blockRefs[ind] = ref
  }

  showCircle(ind: number): void {
    console.log('App Start Circle', ind)
    if (this.wonCondition) return
    this.rotationCenter = ind
    this.circleVisible = true
  }

  destroyCircle(won: boolean): void {
    console.log('App Destroy Circle')
    this.circleVisible = false
    this.toReRender += 1 // re-render the list of blocks
    if (won) {
      this.wonCondition = true
      console.log('Game Over')
      alert('You won! Congratulations')
    }
  }

  newGame(): void {
    this.shuffle()
    this.wonCondition = false
    this.toReRender += 1
  }
}
</script>
<style>
#app {
  position: absolute;
  background-image: url(../assets/img/box.jpg);
  width: 100%;
  height: 115%;
  margin-top: -100px;
  background-size: 87%;
}
#controls {
  position: fixed;
  top: 10px;
  left: 10px;
  cursor: pointer;
}
#block-container {
  position: absolute;
  margin-top: 122px;
}
</style>
