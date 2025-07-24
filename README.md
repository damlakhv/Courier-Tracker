# Courier Tracking System

## Overview
This project tracks couriers' real-time locations, records their entries into the system when they come within 100 
meters of stores, and calculates and displays the total distance traveled by each courier.

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

4. Enter your Google Maps API key in frontend/src/components/map/MapView.tsx :
```ts
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
```

5. Build the backend JAR:
```bash
./mvnw clean package
```

6. Build the project with Docker Compose:
```bash
docker-compose up -d --build
```

Open the frontend in your browser: http://localhost:3000
