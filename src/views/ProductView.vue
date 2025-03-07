<script setup lang="ts">
import { ref, computed } from 'vue';

interface Product {
    id: number;
    name: string;
    price: number;
}

const checked = ref(false);
const products = ref<Product[]>([{
    id: 1,
    name: 'Product 1',
    price: 100,
},
{
    id: 2,
    name: 'Product 2',
    price: 200,
},
{
    id: 3,
    name: 'Product 3',
    price: 300,
},
]);

const discountProduct = computed(() => {
    return products.value.map((product) => {
        if(checked.value) {
            product.price = product.price - (product.price * 10/100);
        }
        return product;
    });
});

</script>

<template>
  <div>
    <h1>Produits</h1>
    <ul>
      <li
        v-for="product in discountProduct"
        :key="product.id"
      >
        {{ product.name }} : {{ product.price }} $
      </li>
    </ul>
    <input
      v-model="checked"
      type="checkbox"
    >Appliquer un discount de 10%</input>
  </div>
</template>