<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="computedProduct.image" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-24x24">
            <img :src="computedProduct.image" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4" v-if="!isEditing">
            {{ computedProduct.prod_name }}
          </p>
          <p class="title is-4" v-else>
            <input
              type="text"
              class="input"
              v-model="updatedProduct.data.prod_name"
            />
          </p>
        </div>
      </div>

      <div class="content">
        <p v-if="!isEditing">{{ computedProduct.prod_desc }}</p>
        <input type="text" v-else v-model="updatedProduct.data.prod_desc" />
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <button class="button is-dark" @click="edit">
          {{ isEditing ? "SAVE" : "EDIT" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";

import { reactive, ref, onMounted } from "vue";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ["update"],
  setup(props, context) {
    const updatedProduct = reactive({ data: {} });
    const isEditing = ref(false);

    const edit = () => {
      console.log(updatedProduct);
      if (isEditing.value) {
        isEditing.value = false;
        context.emit("update", updatedProduct.data);
        return;
      }

      isEditing.value = true;
    };
    onMounted(() => {
      updatedProduct.data = { ...props.product };
    });

    const computedProduct = computed(() => {
      return {
        ...props.product,
        image: "https://picsum.photos/200/300",
      };
    });

    return {
      isEditing,
      edit,
      updatedProduct,
      computedProduct,
    };
  },
};
</script>

<style lang="scss" scoped></style>
