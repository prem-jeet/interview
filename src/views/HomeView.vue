<template>
  <div>
    <button
      class="button is-primary"
      @click="createNew = true"
      v-if="!createNew"
    >
      create new product"createNew
    </button>
    <template v-if="!createNew">
      <section class="section" v-if="products.length">
        <div class="columns is-multiline">
          <div
            class="column is-3"
            v-for="product in products"
            :key="product.id"
          >
            <div><product-card :product="product" @update="update" /></div>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <section class="section">
        <div class="columns">
          <div class="column is-6 mx-auto">
            <form @submit.prevent="submitHandler">
              <div class="filed">
                <div class="control">
                  <div class="label">NAME :</div>
                  <input
                    type="text"
                    class="input"
                    v-model="createProductData.prod_name"
                  />
                </div>
              </div>
              <div class="filed">
                <div class="control">
                  <div class="label">DESCRIPTION :</div>
                  <input
                    type="text"
                    class="input"
                    v-model="createProductData.prod_desc"
                  />
                </div>
              </div>
              <div class="filed">
                <div class="control">
                  <div class="label">PRICE :</div>
                  <input
                    type="number"
                    step="any"
                    class="input"
                    v-model="createProductData.prod_price"
                  />
                </div>
              </div>
              <button class="button" type="submit">save</button>
            </form>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getProducts, createProduct, updateProduct } from "@/utils/api";
import productCard from "@/components/productCard.vue";
const createProductData = reactive({
  prod_name: "",
  prod_price: null,
  prod_desc: "",
  image: null,
});

const createNew = ref(false);

const products = ref([]);

const submitHandler = async () => {
  createNew.value = false;
  await createProduct(createProductData);
  products.value = await getProducts();
};

const update = async (data) => {
  await updateProduct(data.id, data);
  await getProducts();
};

onMounted(async () => {
  products.value = await getProducts();
  console.log(products);
});
</script>
