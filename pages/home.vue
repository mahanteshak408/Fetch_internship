
<template>
    <div>

        <table>

            <tbody>
                <Splitter style="height: 300px">
                    <SplitterPanel class="" :size="25" :minSize="10">
                        <!-- <ol v-for="(subtypes, breed) in products" :key="breed">
                            <li>{{ subtypes }}</li>
                            
                        </ol> -->
                        <tr v-for="(breed, index) in products" :key="index">

                            <td class="cursor-pointer  focus:cursor-auto focus:bg-gray-100 hover:bg-gray-300 hover:text-gray-700"
                                @click="selectedItem(breed)">{{ breed }}</td><br />
                        </tr> <!--   -->
                    </SplitterPanel>
                    <SplitterPanel class="" :size="75">
                        

    <!-- <div class="flex flex-wrap">
    <div class="w-1/4 h-32 bg-gray-300 m-2 overflow-hidden">
<Galleria :value="productsImages" :numVisible="5" :circular="true" 
    :showItemNavigators="true" :showThumbnails="false">
    <template #item="slotProps">
        
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; height: fit-content;" />
    </template>
   
</Galleria>

</div>
</div> -->
        <Galleria :value="productsImages" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
    :showItemNavigators="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
</Galleria>



                    </SplitterPanel>
                </Splitter>

            </tbody>
        </table>
    </div>
</template>
<script setup>

import Galleria from 'primevue/galleria';

import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import { ref, onMounted } from 'vue';
const products = ref();
const productsImages = ref();
onMounted(() => {
    logMovies()
});



const images = ref([{
    itemImageSrc: 'https://primevue.org/images/galleria/galleria1.jpg',

},
{
    itemImageSrc: 'https://primevue.org/images/galleria/galleria2.jpg',

},])
async function logMovies() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const result = await response.json();

    products.value = Object.keys(result.message);
    console.log("dogs", products.value);

}

const selectedItem = async (data) => {
    console.log("data", data)
    // const response = await fetch(`https://dog.ceo/api/breed/${data}/images/`);
    //     const result = await response.json();

    //     console.log("dogs", result);
    await fetch(`https://dog.ceo/api/breed/${data}/images/random/20`)
    .then(response => {
        if (response.status === 301) {
            const newURL = response.headers.get('Location');
            // Make future requests to newURL if necessary
            return fetch(newURL);
        } else {
            return response.json(); // Convert the response to JSON
        }
    })
    .then(jsonData => {
        // Store the JSON data in the productsImages variable
        productsImages.value = jsonData;
    })
    .catch(error => {
        console.error('Error:', error);
    });



    const transformedArray = productsImages.value.message.map(item => {
        return {
            itemImageSrc: item
        };
    });
    productsImages.value=transformedArray;
    console.log(transformedArray, productsImages.value);
}
</script>