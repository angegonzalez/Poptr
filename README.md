# Poptr 
Una red social que permite la conexion entre usuarios que desean hacer los trámites de entidades publicas o provadas de una mejor forma, comunicandose con otras personas y haciendo una mejor gestion sobre sus tramites.

### Proyecto: Estructuras de datos // UNAL 2020-I
El proyecto contempla el uso de estructuras de datos, su implementacion y desarrrollo en las distintas operaciones de la red social

### Recursos y Software usado:
Lenguaje de programación: TypeScript + React 
<br/>
Gestor de base de datos ( no relacional ): Firebase
### Para desarrolladores:
Este proyecto fue creado con la herramienta Create React App.
<br/>
Para poder correr el proyecto es necesario tener instalada la herramienta <a href= "https://nodejs.org/es/"> Node JS </a>
<br/>
Una vez instalado NodeJS, asegurese que este se encuentra en el PATH de su sistema operativo (que indica que lo puede usar en cualquier carpeta), ejecute el comando sobre la carpeta donde se encuentra el archivo .json
``` 
npm install 
npm start
```
Si todo sale bien, deberia ver la pantalla inicial de la aplicacion (React App) en su navegador por defecto, en la ruta : http://localhost:3000 generalmente. 

#### Codigo y localizacion de archivos:
En la carpeta src, se encuentra todo el codigo referente al proyecto, y en la carpeta classes, se podrán encontrar con las distintas implementaciones de las estructuras, llegando a un acuerdo frente a que estas mismas serán trabajadas durante la ejecución del proyecto más no serán persistentes durante todo el tiempo de vida de la aplicacion.

#### Notas: 
Para la realizacion de pruebas de carga en memoria, asegurese de seguir los siguientes pasos: 
<br/>
<ul>
    <li> Cambie la linea de codigo que se encuentra en `package.json` (linea 28) por:  react-scripts start --max-old-space-size=4096</li>
    <li> El archivo `Users.js` en classes, se encuentra comentado, asegurese de que no lo esté</li>
    <li> En `Landing.tsx` asegurese de descomentar la linea de `import` y lea los comentarios para realizar las pruebas que requiera</li>
</ul>
<br/>
Por motivos de carga de datos en la memoria, el lenguaje, y en especifico, NodeJS, le pedirán grandes recursos de memoria, asi que asegurese de liberar memoria suficiente (4GB al momento de hacer las pruebas)
<br/>
<small> Nota: Se omitió la prueba de carga para 10 millones de datos por esto mismo, ya que el archivo generado para esa cantidad de datos pesa alrededor de las 2.5GB, lo cual usa grandes recursos de memoria con la cual no contamos. </small> 

##### Thanks for colaborating and happy hacking!
###### Idea, commit inicial por: Angel Mateo González
