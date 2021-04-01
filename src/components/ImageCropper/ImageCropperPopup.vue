<template>
  <div class="image-cropper-modal">
    <q-dialog v-model="syncedValue">
      <q-card class="cropper-popup">
        <q-card-section class="text-h5">{{ $t('cropper.crop-your-image') }}</q-card-section>

        <q-card-section>
          <image-cropper :src="image" :aspect-ratio="aspectRatio" @cropped="onImageCropped" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('close')" color="primary" @click="close" />
          <q-btn :label="$t('cropper.crop')" color="primary" @click="crop" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, PropSync, Watch } from 'vue-property-decorator';
import ImageCropper from '@/components/ImageCropper/ImageCropper.vue';
import eventBus from '@/common/event-bus';

@Component({ components: { ImageCropper } })
export default class ImageCropperPopup extends Vue {
  showPopup = false;

  @PropSync('value', { type: Boolean, default: false })
  syncedValue!: boolean;

  @Prop({ default: 1, type: Number })
  aspectRatio!: number;

  @Prop({ type: [File, Object] })
  image!: File;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Watch('value', { immediate: true })
  onValueChanged(value: boolean): void {
    this.showPopup = value;
  }

  close(): void {
    this.$emit('input', false);
  }

  crop(): void {
    eventBus.$emit('crop');
  }

  onImageCropped(image: Blob): void {
    this.$emit('cropped', image);
  }
}
</script>
