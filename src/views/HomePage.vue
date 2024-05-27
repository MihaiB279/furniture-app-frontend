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
          caption="Welcome to our site"
          text="We will look together to find the best furniture to match your desire"
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

        <b-carousel-slide
          caption="AI powered"
          text="To improve the method of finding the best furniture for you, we use Artificial Intelligence.
          You add your preferences from our options and your budget and our AI will do its best to look
          for furniture through the companies we are working with."
        >
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture2.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <b-carousel-slide
          caption="How to do it?"
          text="Click on Generate panel and there you will have what you need to select your options."
        >
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture3.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <b-carousel-slide
          caption="Favourites"
          text="You can add to favourite a combination of furniture that you like to check later if
          you do not want to buy it at that moment."
        >
          <template #img>
            <img
              class="d-block img-fluid w-100 slide-image"
              width=100%
              src="../assets/furniture4.jpg"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

        <b-carousel-slide
          caption="Buying"
          text="You can buy the furniture you like directly from generating page or from favourite.
          Our site accepts card payment via paypal or cash at delivery."
        >
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
