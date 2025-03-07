<script setup lang="ts">
import { ref, computed } from "vue";

interface Product {
  id: number;
  name: string;
  price: number;
}

const checked = ref(false);
const products = ref<Product[]>([
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
]);

const discountProduct = ref<Product[]>(
  products.value.map((product) => ({
    ...product,
    price: product.price - (product.price * 10) / 100,
  })),
);

const applyDiscount = computed(() => {
  if (checked.value) {
    return discountProduct.value;
  }
  return products.value;
});
</script>

<template>
  <div>
    <h1>Produits</h1>
    <ul>
      <li v-for="product in applyDiscount" :key="product.id">
        {{ product.name }} : {{ product.price }} $
      </li>
    </ul>
    <input v-model="checked" type="checkbox" />Appliquer un discount de 10%
  </div>
</template>
