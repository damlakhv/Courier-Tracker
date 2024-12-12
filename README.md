# Courier Tracking Case Study
You are supposed to create a restful web application with Java, that mainly takes streaming geolocations of couriers (time, courier, lat, lng) as input. The application 
also must meet following criteria; 
* Log courier and store when any courier enters radius of 100 meters from Migros stores. Reentries to the same store's circumference over 1 minute should not count as "entrance". 
* The application must provide a way for querying total distances, over which any courier travels. A sample method signature may be such as;  ``Double getTotalTravelDistance(courierId);``
* Implement at least 2 design patterns of your choice. 
* Create instructions to easily run and test your application (i.e. README or an executable script is nice to have).

## Input Data
stores.json
```
[
  {
    "name": "Ataşehir MMM Migros",
    "lat": 40.9923307,
    "lng": 29.1244229
  },
  {
    "name": "Novada MMM Migros",
    "lat": 40.986106,
    "lng": 29.1161293
  },
  {
    "name": "Beylikdüzü 5M Migros",
    "lat": 41.0066851,
    "lng": 28.6552262
  },
  {
    "name": "Ortaköy MMM Migros",
    "lat": 41.055783,
    "lng": 29.0210292
  },
  {
    "name": "Caddebostan MMM Migros",
    "lat": 40.9632463,
    "lng": 29.0630908
  }
]
```
Use the stores.json file as reference for Migros store locations.

## Solution Proposal
* Push your solution to `origin/<your-branch-name>`, and create a pull request. Please do not merge your pull request.

