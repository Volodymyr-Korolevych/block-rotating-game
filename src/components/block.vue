<template>
  <div
    class="img__container"
    :class="{ zInd: level > 0 }"
    :style="imgStyle"
    :ref="`block${ind}`"
    @mouseover="initCircle(ind)"
    @mouseleave="stopCircle()"
    @click="rotate()"
  >
    <div class="img__inner" :class="{ img__hover: isHovering }">
      <img :src="imgSrc" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  BlocksEnum,
  blockPositions,
  blockImages,
  PositionType,
} from '../config'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Block extends Vue {
  private isHovering = false
  private blType: BlocksEnum = BlocksEnum.regular

  @Prop() private blockType!: BlocksEnum
  @Prop() private ind!: number
  @Prop() private blockRef!: HTMLElement | null
  @Prop() private level!: number
  @Prop() private center!: number
  @Prop() private offset!: Array<number>

  mounted(): void {
    this.blType = this.blockType
    this.$nextTick(() => {
      this.registerBlock()
    })
  }

  get imgStyle(): string {
    const position: PositionType = blockPositions[this.ind]
    return (
      'top:' +
      (-1.5 + +position[0] - this.offset[0]).toString() +
      'rem; left:' +
      (+position[1] - this.offset[1]).toString() +
      'rem;'
    )
  }

  get imgSrc(): string {
    return blockImages[this.blType]
  }

  registerBlock(): void {
    if (this.level === 1) {
      if (this.blockRef) this.blockRef.remove()
    }
    this.$emit(
      'RegisterBlock',
      this.$refs[`block${this.ind}`],
      this.ind,
    )
  }

  initCircle(index: number): void {
    if (!this.level) {
      if ([4, 5, 8].includes(index)) {
        this.$emit('InitCircle', index)
      }
    } else if (this.ind === this.center) this.isHovering = true
  }

  stopCircle(): void {
    if (this.level === 1) {
      if (this.isHovering) {
        this.isHovering = false
        this.$emit('StopCircle')
      }
    }
  }

  rotate(): void {
    if (!this.level) return
    if (!this.isHovering) return
    this.$emit('RotateCircle')
  }

  setBlockType(_blockType: BlocksEnum): void {
    this.blType = _blockType
  }
}
</script>
<style scoped>
.img__container {
  position: absolute;
  width: 7.2rem;
  height: 7.2rem;
}
.img__inner {
  position: absolute;
  width: 100%;
  height: 100%;
}
.img__container img {
  width: 7.2rem;
}
.img__hover:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  background: url(~@/assets/img/rotation-icon.svg) no-repeat center /
    contain;
  z-index: 0;
}
.zInd {
  z-index: 1;
}
</style>
