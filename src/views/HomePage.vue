<template>
  <Layout>
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        >
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture1.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture2.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture3.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture4.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture5.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>
      </b-carousel>

    </div>
  </Layout>
</template>

<script>
import Layout from "@/views/Layout.vue";

export default {
  name: "HomePage",
  components: {Layout},
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }

}
</script>

<style scoped>
.slide-image {
  height: 650px;
}
</style>
