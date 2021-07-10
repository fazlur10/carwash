'use strict';

const firebase = require('../db');
const Booking = require('../models/booking');
const firestore = firebase.firestore();




const checkBooking = async(req, res, next) =>{
    try{
        const schedule = [
            8,9,10,11,12,13,14,15,16,17
        ];
        firestore.collection('bookings').where('date','==',req.body.date).get().then(snap => {
            if(snap.size<1){
                res.send (schedule.toString());
            }
            else if (snap.size==1){
                 snap.forEach(doc => {
                    const booked_schedule= doc.data().schedule;
                    var filterResult = schedule.filter((x) => { return x > booked_schedule.end_time || x < booked_schedule.start_time; });
                    console.log(filterResult);
                    res.send(filterResult);
         }); 
            }
        });
    }
    catch{
        res.status(400).send(error.message);
    }
}

const addBooking = async (req, res, next) => {
try {
     const data = req.body;
     await firestore.collection('bookings').doc().set(data);
     res.send ('Successfully made booking');
      
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports ={
    checkBooking: checkBooking,
    addBooking:addBooking
}