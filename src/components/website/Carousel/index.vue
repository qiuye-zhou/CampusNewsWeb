<script setup lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui';
</script>
<template>
    <n-carousel
        trigger="hover"
        autoplay
        dot-type="line"
        style="height: 360px"
    >
        <n-carousel-item>
            <img
                class="carousel-img"
                src="/carousel/okumono_moku1.png"
            >
        </n-carousel-item>
        <n-carousel-item>
            <img
                class="carousel-img"
                src="/carousel/okumono_moku2.png"
            >
        </n-carousel-item>
        <n-carousel-item>
            <img
                class="carousel-img"
                src="/carousel/okumono_moku3.png"
            >
        </n-carousel-item>
    </n-carousel>
</template>
  
  <style scoped>
  .carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>