// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import * as KeyCode from '../libs/keycode.esm.js'
import { GUI } from '../libs/dat.gui.module.js'
import { Stats } from '../libs/stats.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto

import { Mesa } from './mesa.js'
import { Estanteria } from './estanteria.js'
import { Crucifijo } from './crucifijo.js'
import { Velas } from './velas.js'
import { Virgen } from './virgen.js'
import { Jarron } from './jarron.js'
import { Caliz } from './caliz.js'
import { Marco } from './marco.js'
import { Laberinto } from './laberinto.js'
import { Habitacion1 } from './habitacion1.js'
import { Cura } from './cura.js'
import { Paisaje } from './paisaje.js'
import { Foco } from './foco.js'
import { Mundotransparente } from './apoyo.js'
import { Objetoshader } from './objetoshader.js'


/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class Escena3 extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.initStats();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Ejes:
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    // ----------------- COLISIONES -----------------

    this.raycaster = new THREE.Raycaster();
    this.direction = new THREE.Vector3();
    this.intersecciones;
    this.distanciaAlMasCercano;
    this.rayfrontal =false;
    this.raytrasero = false;

    // --------------------- PICK --------------------------
    
    this.iniciaPick = false;
    this.raycasterPick = new THREE.Raycaster();
    this.objetosEncontrado = 0;
    this.mouse = new THREE.Vector2();
    this.mouse.x=0;
    this.mouse.y=0;

    // ----------------- MATERIALES ----------------- 

    var text_ladrillo = new THREE.TextureLoader().load('imgs/ladrillo-bump.png');
    text_ladrillo.wrapS = THREE.RepeatWrapping;
    text_ladrillo.wrapT = THREE.RepeatWrapping;
    text_ladrillo.repeat.set(8, 16);

    var text_foto1 = new THREE.TextureLoader().load('imgs/jesusito.png');
    var mat_jesusito = new THREE.MeshBasicMaterial({map: text_foto1});

    var text_foto2 = new THREE.TextureLoader().load('imgs/avemaria.jpg');
    var mat_avemaria = new THREE.MeshBasicMaterial({map: text_foto2});

    var text_foto3 = new THREE.TextureLoader().load('imgs/padrenuestro.jpg');
    var mat_padrenuestro = new THREE.MeshBasicMaterial({map: text_foto3});

    var text_foto4 = new THREE.TextureLoader().load('imgs/credo.jpg');
    var mat_credo = new THREE.MeshBasicMaterial({map: text_foto4});
    
    // -------------- HABITACIÓN 1 -------------- 

    this.habitacion1 = new Habitacion1();
    this.add(this.habitacion1);
    
    // POINTER LOOK
    this.moveForward = true;
    this.moveBackward = true;
    this.seMueveAlante = false;
    this.seMueveAtras = false;
    
    // MUEBLES:
    var mesa = new Mesa();
    mesa.rotation.y = Math.PI/2;
    mesa.position.x = 300;
    this.add(mesa)

    var estanteria = new Estanteria();
    estanteria.rotation.y = Math.PI/2;
    estanteria.position.x = -315;
    this.add(estanteria);

    this.crucifijo = new Crucifijo();
    this.crucifijo.position.z = 348;
    this.crucifijo.position.y = 200;
    this.crucifijo.position.x = 200;
    this.add(this.crucifijo);

    var velas = new Velas();
    velas.rotation.y = Math.PI/2;
    velas.position.y = 145;
    velas.position.x = -315;
    this.add(velas);

    this.virgen = new Virgen(0xffffff);
    this.virgen.position.y = 100;
    this.virgen.position.x = 310;
    this.virgen.rotation.y = -Math.PI/2;
    this.add(this.virgen);


    var jarron = new Jarron();
    jarron.position.y = 20;
    jarron.position.x = -315;
    jarron.scale.set(2,2,2);
    this.add(jarron)

    var caliz = new Caliz();
    caliz.position.y = 100;
    caliz.position.x = 310;
    caliz.position.z = 40;
    this.add(caliz);

    var amuletoshader = new Objetoshader();
    amuletoshader.position.set(-325, 7, 325);
    this.add(amuletoshader)

    var foco = new Foco(); 
    foco.position.set(700, 370, -2340);
    this.add(foco);

    //bola del mundo con transparencias
    var mundo = new Mundotransparente();
    mundo.position.set(750,0,-2320)
    this.add(mundo);

    var marco = new Marco();
    marco.position.y = 262;
    marco.position.x = 200;
    marco.position.z = -349;
    this.add(marco);

    // -------------- LABERINTO --------------
    
    this.laberinto = new Laberinto();
    this.laberinto.position.z = -400;
    this.laberinto.position.y = -2;
    this.add(this.laberinto);

    // -------------- HABITACIÓN 2 -------------- 
    
    this.habitacion2 = new Habitacion1();
    this.habitacion2.position.set(600, 0, -1998);
    this.add(this.habitacion2);

    // MODELO JERÁRQUICO:
    this.cura = new Cura();
    this.cura.position.set(600, 140, -2000);
    this.add(this.cura);

    // CUADROS:
    var geometria_marco = new THREE.BoxGeometry (75,125,1);
    var marco1 = new THREE.Mesh (geometria_marco, mat_jesusito);
    marco1.rotation.y = Math.PI/2;
    marco1.position.set(250, 200, -1900);
    this.add(marco1);

    var marco2 = new THREE.Mesh (geometria_marco, mat_avemaria);
    marco2.rotation.y = Math.PI/2;
    marco2.position.set(250, 200, -2200);
    this.add(marco2);

    var marco3 = new THREE.Mesh (geometria_marco, mat_padrenuestro);
    marco3.rotation.y = -Math.PI/2;
    marco3.position.set(950, 200, -2200);
    marco3.name = "5";
    this.add(marco3);

    var marco4 = new THREE.Mesh (geometria_marco, mat_credo);
    marco4.rotation.y = -Math.PI/2;
    marco4.position.set(950, 200, -1900);
    this.add(marco4);

    var paisaje = new Paisaje();
    paisaje.position.set(600, 70, -2480);
    this.add(paisaje);
  }
  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 150, 0);
    // this.camera.position.set(600, 150, -1998);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,-1000);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
   
    // Se configuran las velocidades de los movimientos
   

  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightAmbientIntensity : 0.1,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightAmbientIntensity', 0, 1, 0.1)
      .name('Intensidad de la Luz : ')
      .onChange ( (value) => this.setLightIntensity (value) );
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight(0xccddee, this.guiControls.lightAmbientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Luz habitación 1:
    this.pointLight = new THREE.PointLight( 0xffffff, 1, 2000 );
    this.pointLight.position.set( 0, 200, 0 );
    this.add (this.pointLight);

    // Luz habitación 2 con sombras para el modelo jerárquico:
    this.pointLight2 = new THREE.PointLight(0xffffff, 1, 5000); // Aumenta el valor de distance a 5000
    this.pointLight2.position.set(600, 200, -2050);
    this.pointLight2.shadow.mapSize.width = 1024;
    this.pointLight2.shadow.mapSize.height = 1024;
    this.add(this.pointLight2);

    // Luz direccional:
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(600, 200, -2050); // Ajusta la posición de la luz en el eje Z negativo
    directionalLight.target.position.set(600, 0, -2500); // Ajusta la posición del objetivo de la luz en el eje Z negativo
    directionalLight.castShadow = true;
    directionalLight.distance = 100;
    directionalLight.intensity = 0.4;
    directionalLight.shadow.mapSize.width = 200;
    directionalLight.shadow.mapSize.height = 200;
    directionalLight.shadow.camera.left = -200;
    directionalLight.shadow.camera.right = 200;
    directionalLight.shadow.camera.top = 200;
    directionalLight.shadow.camera.bottom = -200;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 1000;
    this.add(directionalLight);

  }
  
  setLightIntensity (valor) {
    this.ambientLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Aplicamos sombras:
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update() {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    TWEEN.update();

    // Se actualiza la posición de la cámara según su controlador
    this.direction.set(0, 0, -1);
    this.camera.getWorldDirection(this.direction);
    if (this.direction.y < 1 && this.direction.y > -1)
      this.direction.y = 0;
    this.direction.normalize();
    
    if ((this.seMueveAlante || this.seMueveAtras) && this.direction.y < 1 && this.direction.y > -1) {
      
      
      if (this.raytrasero) {
        this.direction.negate();
      }
      this.raycaster.set(this.camera.position, this.direction);
      this.intersecciones = this.raycaster.intersectObjects(this.children, true);

      if (this.intersecciones.length > 0) {
        this.distanciaAlMasCercano = this.intersecciones[0].distance;
        if (this.distanciaAlMasCercano < 6) {
          if (this.rayfrontal) {
            this.moveForward = false;
              
          } else if (this.raytrasero) {
            this.moveBackward = false;
          }
        }
      }
     
      if (this.moveForward && this.seMueveAlante) {
        this.cameraControl.moveForward(4);
      }
      if (this.moveBackward && this.seMueveAtras) {
        this.cameraControl.moveForward(-4);
      }
      this.moveForward = true;
      this.moveBackward = true;
    }
    this.camera.position.y = 150;

      //raycaster para el pick
     //volvemos a obtener la dirección pero con la componente y para el raycast de selección de objetos
    // Usamos el raycaster para intersectar los objetos de la escena
    if(this.iniciaPick){
      this.raycasterPick.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycasterPick.intersectObjects(this.children);

      // Si hay una intersección, cambiamos las características del objeto seleccionado
      if (intersects.length > 0) {
        this.distanciaAlMasCercano = intersects[0].distance;
        if(intersects.length>1)
          var obj1 = intersects[1].object.name;
        var obj = intersects[0].object.name;
        if(this.distanciaAlMasCercano<100){
          if(obj1 == "0" && this.objetosEncontrado == 0 ){  
            this.objetosEncontrado++;
            this.remove(this.virgen);
            this.virgen.setColor(0xff0000);
            this.add(this.virgen);
            showMessage("Parece que se ha movido algo en la pared...");

          }else if(obj == "1" && this.objetosEncontrado == 1){
            this.objetosEncontrado++;
            var inicioRotacion = { rotacion: 0 }; // Objeto para almacenar el estado inicial de la rotación
            var animacion = new TWEEN.Tween(inicioRotacion)
              .to({ rotacion: 5 * 2 * Math.PI }, 5000) // El 5 es para dar 5 vueltas
              .onUpdate(() => {
                this.crucifijo.rotation.z = inicioRotacion.rotacion;
              })
              .start();
            showMessage("Parece que la puerta ya puede abrirse");
          } else if (obj == "2" && this.objetosEncontrado == 2) {
            this.objetosEncontrado++;
            this.habitacion1.abrirPuerta();
          } else if (obj == "3" && this.objetosEncontrado == 3) {
            this.objetosEncontrado++;
            this.laberinto.subirReja();
            this.habitacion2.puerta2.pomo.name = "4";
            showMessage("Subiendo reja...");
          } else if (obj == "4" && this.objetosEncontrado == 4) {
            this.objetosEncontrado++;
            this.habitacion2.abrirPuerta2();
          } else if (obj == "5" && this.objetosEncontrado == 5) {
            this.objetosEncontrado++;
            this.habitacion2.puerta.pomo.name = "6";
            showMessage("Parece que la puerta ya puede abrirse");
          } else if (obj == "6" && this.objetosEncontrado == 6) {
            this.objetosEncontrado++;
            this.habitacion2.abrirPuerta();

            setTimeout(() => {
              alert('¡¡ENHORABUENA!!\nHas completado el Scape Church.');
              location.reload();
            }, 5000);
          }
          
          // Al clickar en el cura te da una pista del último puzzle:
          if(obj == "7"){
            showMessage("Cura: Si la última puerta quieres abrir, el padre nuestro deberás decir.");
          }
          if(obj == "8"){
            showMessage("Pelota del hijo del cura: Si tú querer salir, a la virgen te habrás de acercar");
          }
        }
      }
    }
    
    // Se actualiza el resto del modelo
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

  }
  onKeyDown(event){
    this.teclaCursor = event.which || event.KeyCode;
    if(String.fromCharCode (this.teclaCursor) == "W" || this.teclaCursor == KeyCode.KEY_UP){
   
      this.rayfrontal=true; 
      this.seMueveAlante=true;
    }else if(String.fromCharCode (this.teclaCursor) == "S" || this.teclaCursor == KeyCode.KEY_DOWN){
      this.raytrasero=true;
     
      this.seMueveAtras=true;
      
    }else if(this.teclaCursor == KeyCode.KEY_CONTROL){
      this.cameraControl.lock(); 
    }

    
  }
  onKeyUp(event){
    this.teclaCursor = event.which || event.KeyCode;
    if(String.fromCharCode (this.teclaCursor) == "W" || this.teclaCursor == KeyCode.KEY_UP){
      this.seMueveAlante=false;
      this.rayfrontal=false;
    }else if(String.fromCharCode (this.teclaCursor) == "S" || this.teclaCursor == KeyCode.KEY_DOWN){
      this.seMueveAtras=false;
      this.raytrasero=false;
    }
  }
  onMouseMove (event){
    this.teclaMouse = event.which;
    
  }
  onMouseUp (event){
    this.teclaMouse = event.which;
    if(this.teclaMouse == 1){
      this.iniciaPick = false;
    }
    
  }
  onMouseDown (event){
    this.teclaMouse = event.which;
    if(this.teclaMouse == 1){
      this.iniciaPick = true;      
    }
  } 

}

 function showMessage(message) {
  var messageBox = document.getElementById("message-box");
  var messageText = document.getElementById("message-text");

  messageText.innerText = message;
  messageBox.classList.add("show");

  setTimeout(function() {
    messageBox.classList.remove("show");
  }, 5000);
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new Escena3("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
  window.addEventListener ("keyup", (event) => scene.onKeyUp(event));
  window.addEventListener ("mouseup", (event)=> scene.onMouseUp(event));
  window.addEventListener ("mousedown", (event)=> scene.onMouseDown(event));
  window.addEventListener ("mousemove", (event)=> scene.onMouseMove(event));

  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});