# Taller-2-Backend

## 1. Ejecucion

 - git clone https://github.com/MarcusRambal/Taller-2-Backend.git
 - cd Taller-2-Backend
 - docker compose up --build -d


## 2. Descripcion de la solucion
Una empresa tiene una API REST desarrollada con Node.js y Express. La API actualmente funciona directamente en http://localhost:3000. El equipo de infraestructura solicita que laAPI sea ejecutada dentro de Docker, que Nginx sea el punto de entrada y que los usuarios no accedan directamente al contenedor de la API.

Para solucionar este problema se configura un Docker Compose que integra la api y nginx como Proxy. Se elimina la exposiicon directa del Puerto del backend al host, ahora todo el trafico pasa por nginx, el cual resuelve el enrutamiento hacia la API utilizando el DNS de docker compose.

## 3. Arquitectura propuesta
<img width="953" height="539" alt="image" src="https://github.com/user-attachments/assets/3735b558-bb7e-4103-9384-0d4dbdc4fabe" />



## 4. Comandos Utilizados

- docker ps 
- docker build -t backend-api .
- docker run -d  --name backend-api -p 3000:3000 -e PORT=3000 backend-api
- docker logs backend-api
- docker inspect backend-api
- docker compose ps
- docker compose down
- docker compose up -d
- docker compose up --build -d
- docker network ls
- docker network inspect

## 5. Preguntas

- ¿Cuál es la diferencia entre el puerto del contenedor y el puerto publicado en el host? 

El puerto del contenedor es interno de docker, mientras que el puerto publicado por el host es el puerto en este caso de windows que expone docker hacia el contenedor. HOST:CONTAINER, por ejemplo si ponemos 8080:3000 el puerto del contenedor seguirá siendo 3000, pero ahora accedes con localhost:8080 de forma externa. 

- ¿Por qué http://api:3000 funciona entre contenedores, mientras que http://localhost:3000 no representa correctamente al contenedor api? 

Cada contenedor corre en su propia red aislada, cuando un servicio como ngix intenta https://localhost:3000, busca el servicio dentro de su propio contenedor, falla porque no hay nada ejecutandose en el Puerto 3000. En cambio si usa, http://api:3000 funciona porque compose genera una red virtual con un DNS interno


### 5.1 Port vs Expose

Port permite que se acceda al contenedor fuera de él, en este taller en un punto accedemos al servidor de express gracias a http://localhost:3000 que luego removemos y accedemos a el usando nginx con el nombre que le damos en compose. 

Expose expone sólo a los contenedores internos de la red de docker.


### 5.2 localhost vs nombre del servicio Docker

En el caso de que usemos localhost para redireccionar a otro contenedor no podriamos porque estariamos apuntando al mismo contenedenor, que es el caso que pasa en el troubleshooting error de este taller, el nombre de compose es un DNS interno que docker maneja para comunicarse, este nos permite comunicacion entre contenedores.

## 6. Pruebas
<img width="1098" height="885" alt="Screenshot 2026-09-26 142410" src="https://github.com/user-attachments/assets/457804a3-dc9e-4f5a-a0ad-1027a787b37c" />



## 7. Error producido durante el ejercicio de troubleshooting

<img width="606" height="347" alt="Screenshot 2026-09-26 143717" src="https://github.com/user-attachments/assets/18f58686-66d2-4bba-814e-463f463d0d3f" />

- ¿Qué error obtiene? 

502 Bad GateWay

- ¿Por qué ocurre? 

Nginx intentó resolver en http://localhost:3000/health  y en http://localhost:3000, no encontró nada.

- ¿Por qué localhost no representa al contenedor api? 

Porque localhost estaría apuntando al propio contenedor de Nginx, y como no hay nada que se resuelva en las direcciones de 502 

- ¿Cómo solucionaría el problema? 

Configurando el proxy_pass de Nginx a http://api:3000/health y http://api:3000/ , asi Nginx usaría el DNS interno de compose.

- ¿Qué comando utilizaría para verificar las redes Docker? 

Primero usando docker network ls y luego docker network inspect ${nombreDeRed}

<img width="716" height="220" alt="Screenshot 2026-09-26 144740" src="https://github.com/user-attachments/assets/6b63212a-2c71-4fab-9a54-0b024e50267d" />


<img width="798" height="811" alt="Screenshot 2026-09-26 144804" src="https://github.com/user-attachments/assets/772db719-3f15-4043-8c9a-80733f7ad13c" />



