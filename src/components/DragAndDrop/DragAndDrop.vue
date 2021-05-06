<template>
  <section
    class="drag-n-drop"
    :class="{ 'is-dragging': isFilesDragging, 'no-border': disableBorder }"
    :style="sizeStyle"
    @dragover.prevent
    @drop.prevent="dropped"
    @dragenter="dragOn"
    @dragleave="dragOff"
    @click="onClick"
  >
    <slot>
      <span class="drag-n-drop__text">{{ displayingText }}</span>
    </slot>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DragAndDrop extends Vue {
  isFilesDragging = false;

  @Prop({ default: 'Drag files here', type: String })
  text!: string;

  @Prop({ default: 'Files are dragging...', type: String })
  draggingText!: string;

  @Prop({ default: '*/*', type: String })
  mimetype!: string;

  @Prop({ default: true, type: Boolean })
  multiple!: boolean;

  @Prop({ default: '300px', type: String })
  width!: string;

  @Prop({ default: '300px', type: String })
  height!: string;

  @Prop({ default: false, type: Boolean })
  disableBorder!: boolean;

  get sizeStyle(): { width: string; height: string } {
    return {
      width: this.width,
      height: this.height
    };
  }

  get displayingText(): string {
    return this.isFilesDragging ? this.draggingText : this.text;
  }

  dragOn(): void {
    this.isFilesDragging = true;
  }

  dragOff(): void {
    this.isFilesDragging = false;
  }

  dropped(event: DragEvent): void {
    const files = event.dataTransfer?.files;
    this.emit(files);
  }

  onClick(): void {
    const fileUploader = document.createElement('input');
    fileUploader.type = 'file';
    fileUploader.accept = this.mimetype;
    fileUploader.multiple = this.multiple;

    fileUploader.onchange = async () => {
      const files = fileUploader.files;

      this.emit(files);
      fileUploader.remove();
    };

    fileUploader.click();
  }

  emit(files: FileList | null | undefined): void {
    if (!files) {
      return;
    }

    this.$emit('dropped', this.multiple ? [...files] : files[0]);
  }
}
</script>

<style lang="less" scoped>
.drag-n-drop {
  background: rgba(#6b7db3, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  border: 3px dashed #6b7db3;
  cursor: pointer;
  position: relative;

  &__text {
    text-align: center;
  }

  &.is-dragging {
    border-style: dotted;
  }

  &.no-border {
    border: none;
  }
}
</style>
