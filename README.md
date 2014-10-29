# Juego de la Vida

## Introducción
El juego de la vida es un autómata celular diseñado por el matemático británico John Horton Conway en 1970.
Hizo su primera aparición pública en el número de octubre de 1970 de la revista Scientific American, en la columna de juegos matemáticos de Martin Gardner. Desde un punto de vista teórico, es interesante porque es equivalente a una máquina universal de Turing, es decir, todo lo que se puede computar algorítmicamente se puede computar en el juego de la vida.
Desde su publicación, ha atraído mucho interés debido a la gran variabilidad de la evolución de los patrones. Se considera que la vida es un buen ejemplo de emergencia y autoorganización. Es interesante para los científicos, matemáticos, economistas y otros observar cómo patrones complejos pueden provenir de la implementación de reglas muy sencillas.
La vida tiene una variedad de patrones reconocidos que provienen de determinadas posiciones iniciales. Poco después de la publicación, se descubrieron el pentaminó R, el planeador o caminador (en inglés glider, conjunto de células que se desplazan) y el explosionador (células que parecen formar la onda expansiva de una explosión), lo que atrajo un mayor interés hacia el juego. Contribuyó a su popularidad el hecho de que se publicó justo cuando se estaba lanzando al mercado una nueva generación de miniordenadores baratos, lo que significaba que se podía jugar durante horas en máquinas que, por otro lado, no se utilizarían por la noche.
Para muchos aficionados, el juego de la vida sólo era un desafío de programación y una manera divertida de usar ciclos de la CPU. Para otros, sin embargo, el juego adquirió más connotaciones filosóficas. Desarrolló un seguimiento casi fanático a lo largo de los años 1970 hasta mediados de los 80.
El juego de la vida es en realidad un juego de cero jugadores, lo que quiere decir que su evolución está determinada por el estado inicial y no necesita ninguna entrada de datos posterior. El "tablero de juego" es una malla formada por cuadrados ("células") que se extiende por el infinito en todas las direcciones. Cada célula tiene 8 células vecinas, que son las que están próximas a ella, incluso en las diagonales. Las células tienen dos estados: están "vivas" o "muertas" (o "encendidas" y "apagadas"). El estado de la malla evoluciona a lo largo de unidades de tiempo discretas (se podría decir que por turnos). El estado de todas las células se tiene en cuenta para calcular el estado de las mismas al turno siguiente. Todas las células se actualizan simultáneamente.
Las transiciones dependen del número de células vecinas vivas:
Una célula muerta con exactamente 3 células vecinas vivas "nace" (al turno siguiente estará viva).
Una célula viva con 2 ó 3 células vecinas vivas sigue viva, en otro caso muere o permanece muerta (por "soledad" o "superpoblación").

## El Juego
Este juego está diseñado bajo las reglas del juego de la vida de Conway, pero la vida no muere al cerrar el navegador. En este juego varios jugadores pueden interactuar con el ciclo de la vida al hacer clic dentro del mundo.

## Instalación

### Requisitos
* NodeJS
* Bower
* NPM
* Grunt

### Instalación

Después de Instalar **NodeJS** y **NPM**

```
[sudo] npm install -g grunt grunt-cli
[sudo] npm install -g bower
npm install
```
**bower install** se ejecutará solo al terminar **npm install** de manera automática.

### Ejecución

```
grunt
```

Esto automáticamente iniciará el servidor, además de la generación de la semilla del mundo, a partir de ese momento (y hasta que no se pare el servidor) la vida continuará ejecutándose.

### Visualización

Para visualizar el mundo hay que abrir en el navegador **http://[ip-del-server]:3000** para observar la vida e interactuar con el juego.
