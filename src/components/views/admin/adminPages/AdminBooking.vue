<template>
  <section class="info-tiles">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h3 class="title has-text-left">
            Besökare
          </h3>
          <div class="field has-addons">
            <div class="control">
              <input 
                v-model.number="visitors"
                class="input" 
                type="number" 
                placeholder="Antal besökare"
              >
            </div>
            <div class="control">
              <button 
                class="button is-primary"
                :class="{'is-loading': isLoading}"
                :disabled="isLoading"
                @click="updateVisitors"
              >
                Spara
              </button>
            </div>
          </div>
          <div 
            v-show="isVisitorSuccess"
            class="notification is-success has-text-left"
          >
            <button 
              class="delete" 
              @click="isVisitorSuccess = false" 
            />
            Uppdatering lyckades! <br>Antal besökare är nu: <b>{{ visitors }}</b>
          </div>
          <div 
            v-show="isVisitorError"
            class="notification is-danger has-text-left"
          >
            <button 
              class="delete" 
              @click="isVisitorError = false" 
            />
            Uppdatering misslyckades: Du har angett samma värde som redan existerar i databasen, vänligen välj ett nytt värde.
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h3 class="title has-text-left">
            Nätter
          </h3>
          <div class="field has-addons">
            <div class="control">
              <input 
                v-model.number="nights"
                class="input" 
                type="number" 
                placeholder="Antal nätter"
              >
            </div>
            <div class="control">
              <button 
                class="button is-primary"
                :class="{'is-loading': isLoading}"
                :disabled="isLoading"
                @click="updateNights"
                @focus="isNightsError = false" 
              >
                Spara
              </button>
            </div>
          </div>
          <div 
            v-show="isNightsSuccess"
            class="notification is-success has-text-left"
          >
            <button 
              class="delete" 
              @click="isNightsSuccess = false" 
            />
            Uppdatering lyckades! <br>Antal nätter är nu: <b>{{ nights }}</b>
          </div>
          <div 
            v-show="isNightsError"
            class="notification is-danger has-text-left"
          >
            <button 
              class="delete" 
              @click="isNightsError = false" 
            />
            Uppdatering misslyckades: Du har angett samma värde som redan existerar i databasen, vänligen välj ett nytt värde.
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h3 class="title has-text-left">
            Omdömen
          </h3>
          <h4>Skapa</h4>
          <input 
            v-model="reviewName"
            class="input" 
            type="text" 
            placeholder="Namn"
          >
          <input 
            v-model.number="reviewStars"
            class="input" 
            type="number" 
            placeholder="Antal stjärnor"
          >
          <textarea 
            v-model="reviewText"
            class="textarea" 
            placeholder="Text"
          />

          <h4>Hantera</h4>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { db } from '@/firebase/firebaseInit.js'

export default defineComponent({
  name: 'AdminBooking',
  setup() {
    // Visitors
    let visitors = ref<number>(0);
    let initVisitors = ref<number>(0);
    let isVisitorSuccess = ref<boolean>(false);
    let isVisitorError = ref<boolean>(false);
    let isLoading = ref<boolean>(false);

    db.collection('visitors')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        visitors.value = doc.data().total
        initVisitors.value = doc.data().total
      })
    })

    const updateVisitors = () => {
      if(visitors.value === initVisitors.value) {
        isVisitorError.value = true
      } else {
        isLoading.value = true;
        db.collection('visitors')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              total: visitors.value
            })
            .then(() => {
              isVisitorSuccess.value = true;
              isLoading.value = false;
              initVisitors.value = visitors.value
            })
          })
        })
      }
    }


    // Nights
    let nights = ref<number>(0);
    let initNights = ref<number>(0);
    let isNightsSuccess = ref<boolean>(false);
    let isNightsError = ref<boolean>(false);

    db.collection('nights')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        nights.value = doc.data().total
        initNights.value = doc.data().total
      })
    })

    const updateNights = () => {
      if(nights.value === initNights.value) {
        isNightsError.value = true
      } else {
        isLoading.value = true;
        db.collection('nights')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              total: nights.value
            })
            .then(() => {
              isNightsSuccess.value = true;
              isLoading.value = false;
              initNights.value = nights.value;
            })
          })
        })
      }
    }


    // Reviews
    let reviewName = ref<string>('')
    let reviewStars = ref<number>(0)
    let reviewText = ref<string>('')

    // Create

    // Read all

    // Read single

    // Update

    // Delete
    
    return {
      visitors,
      updateVisitors,
      isVisitorSuccess,
      isVisitorError,
      nights,
      updateNights,
      isNightsSuccess,
      isNightsError,
      isLoading,
      reviewName,
      reviewStars,
      reviewText
    }
  },
})
</script>
