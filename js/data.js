/*=====================================
        SMART CITY DATABASE
======================================*/

// Smart Bins

const smartBins = [

{
    id:1,
    name:"Bin 01",
    lat:12.9716,
    lng:77.5946,
    fill:35,
    battery:92,
    temperature:29,
    smoke:false,
    washing:false
},

{
    id:2,
    name:"Bin 02",
    lat:12.9755,
    lng:77.6001,
    fill:72,
    battery:81,
    temperature:30,
    smoke:false,
    washing:true
},

{
    id:3,
    name:"Bin 03",
    lat:12.9684,
    lng:77.5880,
    fill:95,
    battery:63,
    temperature:34,
    smoke:false,
    washing:true
},

{
    id:4,
    name:"Bin 04",
    lat:12.9790,
    lng:77.5925,
    fill:20,
    battery:99,
    temperature:28,
    smoke:false,
    washing:false
}];

// Garbage Truck

const garbageTruck = {

    id:1,

    driver:"Rahul",

    capacity:100,

    currentLoad:0,

    fuel:87,

    currentStop:0

};

// Washing Truck

const washingTruck = {

    id:1,

    driver:"Amit",

    water:100,

    currentStop:0

};