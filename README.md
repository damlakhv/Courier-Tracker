# Courier Tracking System

## Overview
This project tracks couriers' real-time locations, records their entries into the system when they come within 100 
meters of stores , and calculates and displays the total distance traveled by each courier.

## Built With
**Backend:** Java, Spring Boot, MySQL, Maven, Spring Data JPA, RESTful API
**Frontend:** React, TypeScript, Ant Design, Google Maps JavaScript API
**Testing:** JUnit & Mockito for Backend, Jest for Frontend unit tests

## Requirements
- **Docker** (>= 20.10)
- **Docker Compose** (v2+)
- **Git** (Needed to clone the repository)
- **Google Maps API key** (This is needed to use the map)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/damlakhv/Courier-Tracker.git
```
2. Move to the project:
```bash
cd Courier-Tracker
```
3. Open your 'docker-compose.yml' and under each 'environment:' block set your passwords.
```yaml
MYSQL_ROOT_PASSWORD: <your_password>
SPRING_DATASOURCE_PASSWORD: <your_password>
```
> **Note:** In this case, your passwords will be visible in `docker-compose.yml`; if you are going to make the 
> repository public, you should use the **.env** method.

4. Edit the file frontend/src/components/map/MapView.tsx and replace:
```ts
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
```

5. Build the backend JAR:
```bash
./mvnw clean package
```
> **Note:** If you get "zsh: permission denied: ./mvnm", firstly run:
```bash
chmod +x mvnw
```

6. (If there is not) Add the node_modules to the project.
```bash
cd frontend
npm install
cd ..
```

7. Build the project with Docker Compose:
```bash
docker-compose up -d --build
```

Open the frontend in your browser: http://localhost:3000

## Endpoints
**Couriers**
- `GET /api/couriers` – List all couriers
- `POST /api/couriers` – Add a new courier
- `PUT /api/couriers/{id}` – Update courier info
- `DELETE /api/couriers/{id}` – Delete courier
**Stores**
- `GET /api/stores` – List all stores
- `POST /api/stores` – Add multiple stores
- `PUT /api/stores/{id}` – Update store info
- `DELETE /api/stores/{id}` – Delete store
**Store Visits**
- `GET /api/store-visits` – List all visit logs
- `GET /api/store-visits/count-today` – Count of today’s visits
- `GET /api/store-visits/statistics/courier-store-visits?start=&end=` – Visits per courier
- `GET /api/store-visits/statistics/store-visit-counts` – Visit count per store
- `GET /api/store-visits/statistics/store-visit-heatmap` – Visit data for heatmap
**Location Logs**
- `GET /api/location-logs` – List all location logs
- `POST /api/location-logs` – Add a location log
- `GET /api/location-logs/total-distance?courierId=&start=&end=` – Total km traveled by courier

## Demo

https://github.com/user-attachments/assets/fd1006c0-f0ee-46f8-bf0f-ad491373bef5

Also see the responsive design:

https://github.com/user-attachments/assets/4dd6f862-d32a-4b72-be68-c19fa47a16a4

