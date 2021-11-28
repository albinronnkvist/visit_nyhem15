<template>
  <div>
    <input 
      type="file" 
      accept="image/*"
      @change="onFileSelected"
    >
    <button @click="onFileUpload">
      Upload
    </button>

    <progress
      v-show="loadingImage"
      class="progress is-medium is-primary mb-4"
    >
      {{ progress }}
    </progress>
    <p> {{ progress }} </p>

    <p>{{ imageURL }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { storage } from '@/firebase/firebaseInit'

export default defineComponent({
  name: 'UploadImage',

  setup() {
    let image = ref(null)
    let progress = ref(0)
    let loadingImage = ref(false)
    let imageURL = ref(null)

    const onFileSelected = (e) => {
      image.value = e.target.files[0]
    }

    const onFileUpload = () => {
      loadingImage.value = true
      progress.value = 0

      const storageRef = storage.ref(`images/${image.value.name}`).put(image.value)

      storageRef.on('state_changed', snapshot => {
        progress.value = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      }, 
      error => {
        console.log(error.message)
        loadingImage.value = false
      },
      () => {
        loadingImage.value = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {imageURL.value = url})
        loadingImage.value = false
      })

      // const uploadTask = storage.ref(`images/${image.value.name}`).put(image, {
      //     contentType: 'image/png',
      // });
      // uploadTask.on(
      //   "state_changed",
      //   snapshot => {
      //     progress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) 
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   () => {
      //     storage
      //       .ref("images")
      //       .child(image.value.name)
      //       .getDownloadURL()
      //       .then(url => {
      //         console.log(url)
      //       });
      //   })
    }

    return {
      image,
      progress,
      loadingImage,
      imageURL,
      onFileSelected,
      onFileUpload
    }
  }
})
</script>