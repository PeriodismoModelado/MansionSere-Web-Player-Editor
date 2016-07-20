
# Periodismo Modelado Web Player

Periodismo Modelado provee un framework que facilita la construcción de historias navegables en mundos de realidad virtual a través de la definición de 4 componentes:
- Modelo 3d
- Puntos de Interes
- Tracks de Audio 
- Transiciones entre Puntos.

El Modelo 3d provee un lugar físico donde se van a ubicar distintos puntos de interés. Cada uno de ellos tendrá un tiempo de recorrido.
Cuando la experiencia inicia, una cámara recorre el modelo 3d pasando punto por punto tomando el delay, la duración y reproduciendo el audio una vez finalizado el delay.
Una vez finalizada la lista de puntos, se procede a la finalización de la experiencia.



#¿Qué Tecnologias?

Navegador Mobile con soporte  WebGL y WebVR (chrome!)
El proyecto está desarrollado sobre 
- Aframe.io.

## ¿Cómo ejecutar el proyecto localmente?
 
###Instalar NodeJS
[Node Js Oficial](http://nodejs.org)


###Instalar http-server
`npm install http-server -g`

###Ir a Directorio DIST y ejecutar servidor


`http-server ./`

###Abrir navegador 

Dirección: `http://localhost:8080`



#Backlog

##v0.1-
###Editor
-Enable user to save position everytime he press spacebar. 
-Add a 3d pin to let user see where is the check point. 
-See the position that he choose in a list. 
-Change order of checkpoints. 
-Set remote model (.dae) by pasting URL in a textbox. 
-Save checkpoints in localstorage with random hash ID. 

###Player
-Load experience by url hash from localstorage


##v0.2
###Editor 
-Add for each checkpoint a url for an audio file.
-Save checkpoints in localstorage.

###Player  
-When a checkpoint animation is reproduce, it should also reproduce the audioa assigned.

##v0.3
###Editor
- Add the hability to create credits texts.
- Save credits in localstorage.

###Player
-Load credits from localstorage main experience json.

##v0.4
###Architecture
- Migrate to node/express + mongo

###Editor
- Save experience in mongo.

###Player
- Load from backend using ID and generate outside frontend.





