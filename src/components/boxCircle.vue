<template>
  <div
    id="circle-container"
    :class="{ circle__rotate: isRotating }"
    :style="circlePosition"
  >
    <block
      v-for="i in activeBlocks"
      :key="i"
      :ind="i"
      ref="BLOCK"
      :level="1"
      :blockRef="blockRefs[i]"
      :center="ind"
      :offset="circleOffset"
      :blockType="blocks[i]"
      @ShowCircle="showCircle()"
      @StopCircle="stopCircle()"
      @RotateCircle="rotateCircle()"
    />
  </div>
</template>
<script lang="ts">
import {
  BlocksEnum,
  PositionType,
  RotationsEnum,
  RotationBlocks,
  RotationCircleOffsets,
} from '../config'
import { Component, Prop, Vue } from 'vue-property-decorator'
import block from './block.vue'

@Component({
  components: {
    block,
  },
})
export default class boxCircle extends Vue {
  private activeBlocks: Array<number> = []
  private circleOffset!: PositionType
  private isRotating = false

  @Prop() private ind!: RotationsEnum
  @Prop() private blocks!: Array<BlocksEnum>
  @Prop() private blockRefs!: Array<number>

  mounted(): void {
    console.log('boxCircle mounted = ', this.ind)
    const num: number = +this.ind
    this.activeBlocks = [num, ...RotationBlocks[this.ind]]
    console.log('activeBlocks,', this.activeBlocks)
    this.circleOffset = RotationCircleOffsets[this.ind]
  }

  get circlePosition(): string {
    const position: PositionType = RotationCircleOffsets[this.ind]
    return 'top:' + position[0] + 'rem;left:' + position[1] + 'rem;'
  }

  showCircle(): void {
    console.log('Circle Show Emitted')
  }

  stopCircle(): void {
    console.log('Circle Stop emitted', this.ind)
    this.$emit('Destroy', false)
  }

  rotateCircle(): void {
    if (this.isRotating) return
    console.log('Circle Rotation Emitted')

    const blocksRef = this.$refs.BLOCK as Array<any>

    /* eslint-disable */
    let note = new Audio(require('../assets/sounds/box-rotate.mp3'))

    note.addEventListener("canplaythrough", () => { 
        this.isRotating = true
        note.play();
      });

    setTimeout(() => {
      this.isRotating = false
      const list: Array<number> = RotationBlocks[this.ind]
      const val_list: Array<BlocksEnum> = list.map(
        (i) => this.blocks[i],
      )
      const last: BlocksEnum | undefined = val_list.pop()
      if (last) val_list.unshift(last)

      for (var i = 0; i < 6; i++) {
        blocksRef[i + 1].setBlockType(val_list[i])
        this.blocks[list[i]] = val_list[i]
      }
      this.checkWinCondition()
    }, 500)
  }

  checkWinCondition(): void {
    if (
      this.blocks[1] === BlocksEnum.red &&
      this.blocks[7] === BlocksEnum.green &&
      this.blocks[9] === BlocksEnum.blue
    )
      this.$nextTick(() => {
        this.$emit('Destroy', true)
      })
  }
}
</script>
<style scoped>
#circle-container {
  position: absolute;
  border-radius: 50%;
  width: 26rem;
  height: 26rem;
  opacity: 1;
  transform: rotate(0);
  will-change: transform, opacity;
  background: url(~@/assets/img/rotation-circle.svg) center/contain;
  background-repeat: no-repeat;
}
.circle__rotate {
  animation: mymove ease-in-out 0.5s;
  opacity: 1;
}
@keyframes mymove {
  100% {
    transform: rotate(60deg);
  }
}
</style>
