import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCX5gFXniN-HvFcmuyMUOgcHcVeKUvbkbI",
	authDomain: "shopify-intern.firebaseapp.com",
	databaseURL: "https://shopify-intern.firebaseio.com",
	projectId: "shopify-intern",
	storageBucket: "shopify-intern.appspot.com",
	messagingSenderId: "363639814123"
  };
firebase.initializeApp(config);

export default firebase;