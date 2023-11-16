<template>
  <div class="carousel-container">
    <div class="carousel">
      <div
        class="slide"
        v-for="(item, index) in items"
        :key="index"
        :style="{ transform: `translateX(${-currentIndex * 100}%)` }"
      >
        <img :src="item.image" alt="Slide Image" />
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="prevSlide" class="control-button">❮</button>
      <button @click="nextSlide" class="control-button">❯</button>
    </div>

    <div class="pagination">
      <span
        v-for="(item, index) in items"
        :key="index"
        @click="goToSlide(index)"
        :class="{ active: index === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: '', image: 'https://m.media-amazon.com/images/I/71NBRDtB9QL._SY425_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/41XpSZb6R7L._SY445_SX342_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/51uQBsbokvL._SX342_SY445_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/51Qfo8EmSjL._SY445_SX342_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/61BkuQJZ-gL._SY425_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/51ehWeUL3QL._SY445_SX342_.jpg' },
        { title: '', image: 'https://m.media-amazon.com/images/I/4124iKXav2L._SY445_SX342_.jpg' },
        // Agrega más elementos según sea necesario
      ],
      currentIndex: 0,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
  },
};
</script>


<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
  border-radius: 8px;
  overflow: hidden;
}

.slide {
  min-width: 100%;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h3 {
  margin: 10px 0;
  font-size: 24px;
}

p {
  color: #eee;
}

.controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.control-button {
  font-size: 20px;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.control-button:hover {
  background-color: #555;
}

.pagination {
  margin-top: 190px;
  display: flex;
  justify-content: center;
}

.pagination span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination span.active {
  background-color: #555;
}
</style>
