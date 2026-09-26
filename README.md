# Taller-2-Backend

## 1. Ejecucion

git clone https://github.com/MarcusRambal/Taller-2-Backend.git
cd 

docker compose up --build -d

## 2. Descripcion de la solucion


## 3. Arquitectura propuesta


## 4. Comandos Utilizados

## 5. Preguntas

- ¿Cuál es la diferencia entre el puerto del contenedor y el puerto publicado en el host? 

El puerto del contenedor es interno de docker, mientras que el puerto publicado por el host es el puerto en este caso de windows que expone docker hacia el contenedor HOST:CONTAINER, por ejemplo si ponemos 8080:3000 el puerto del contenedor seguirá siendo 3000, pero ahora accedes con localhost:8080

- ¿Por qué http://api:3000 funciona entre contenedores, mientras que http://localhost:3000 no representa correctamente al contenedor api? 

Esto sucede por como docker maneja internamente las redes internas, al usar http://localhost:3000 lo que expones es el contenedor como tal pero solo ese,  http://api:3000 funciona por la red virtual que crea docker internamente.


### 5.1 Port vs Expose

Port es HOST:CONTAINER como se ha mencionado esto permite que se acceda al contenedor fuera de él, en este taller en un punto  accedemos al servidor de express gracias a http://localhost:3000 que luego quitamos y accedemos desde http://localhost:8080 a nginx. 
Expose expone sólo a los contenedores internos de la red de docker.


### 5.2 localhost vs nombre del servicio Docker

## 6. Pruebas
<img width="1098" height="885" alt="Screenshot 2026-09-26 142410" src="https://github.com/user-attachments/assets/457804a3-dc9e-4f5a-a0ad-1027a787b37c" />



## 7. Rrror producido durante el ejercicio de troubleshooting
