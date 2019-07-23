// firebase
const firebase = require('firebase-admin')
const firebase_credential = require('./credential.json')

firebase.initializeApp({
    credential: firebase.credential.cert(firebase_credential)
});

function fcm_push_publish(fcm_messages, fcm_type){
    if ( fcm_type == 'multicast' ) {
       firebase.messaging().sendMulticast(fcm_messages)
       .then((response) => {
       })
       .catch((error) => {
       });
    } else if ( fcm_type == 'single') {
       firebase.messaging().send(fcm_messages)
       .then((response) => {
       })
       .catch((error) => {
       });
    } else {
        firebase.messaging().sendAll(fcm_messages)
        .then((response) => {
        })
        .catch((error) => {
        });
    }
    // console.log(fcm_messages);
}

function fcm_sender(msg){
    const json_data = JSON.parse(msg_data);

    json_data.forEach(function (item, idx, array){
        fcm_push_publish(item.message, item.type);
    });
}
