# Visitnyhem

Website for cottage rental, built with Vue 3 Compositon API, BulmaCSS and Firebase.

[See website](https://nyhem15.se/)

## Setup 

### Standard
- Pull repo: _git clone https://github.com/albinronnkvist/visit_nyhem15_
- Install packages: _npm i_

### Firebase
Add a .env.local-file with your Firebase-config in the root folder and add the following environment variables:
- _VUE_APP_FIREBASE_API_KEY=[your api key]_
- _VUE_APP_FIREBASE_AUTH_DOMAIN=[your auth domain]_
- _VUE_APP_FIREBASE_PROJECT_ID=[your project id]_
- _VUE_APP_FIREBASE_STORAGE_BUCKET=[your storage bucket]_
- _VUE_APP_FIREBASE_MESSAGING_SENDER_ID=[your messaging sender id]_
- _VUE_APP_FIREBASE_APP_ID=[your app id]_
- _VUE_APP_FIREBASE_MEASUREMENT_ID=[your measurement id]_

### Google Maps
If you want to work with maps, you need to get your own Google Maps API key and add it as an evironment variable:
- VUE_APP_GOOGLE_MAPS_API_KEY=[your Google Maps API key]   

### Travel planning
Same goes with if you want a travelplanner, you have get your own [TrafikLab API key](https://www.trafiklab.se/api/) and add it as an evironment variable:
  - VUE_APP_TRAFIKLAB_API_KEY=[your TrafikLab API Key]
