import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
 
class Objetoshader extends THREE.Object3D {
  constructor() {
      super();
      // Definir el fragment shader
        var fragmentShader =  `
        varying vec3 v_Position;
      
        vec3 getColorWithBlueRange(float y) {
          float r = 0.0;
          float g = clamp(y, 0.0, 1.0);
          float b = 1.0 - g;
          return vec3(r, g, b);
        }
      
        void main() {
          gl_FragColor = vec4(getColorWithBlueRange(v_Position.y), 1.0);
        }
      `;

        // Definir el vertex shader
        var vertexShader = `
        varying vec3 v_Position;

        void main() {
          v_Position = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `;
        
      
      // Crear el material utilizando el shader personalizado
        var material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        
        // Crear el objeto al que se le aplicará el material
        var geometria = new THREE.SphereGeometry(10, 32, 32);
         this.esfera = new THREE.Mesh(geometria, material);
         this.esfera.position.y += 5;
         this.esfera.name = "8";
      

        

      this.add(this.esfera);

        //Creamos la animacion
     var origen = {p : 200};
     var destino = {p : 0};

     var escaladorigen = {x: 1, y:1, z:1};
     var escalado1 = {x: 1.1, y:0.9, z:1.1};
     var escalado2 = {x: 0.9, y:1.1, z:0.9};
     var escaladodest = {x: 1, y:1, z:1};
    
    

     var origen2 = {p : 0};
     var destino2 = {p : 50};
     var origen3 = {p : 50};
     var destino3 = {p : 200};

     var animacion1 = new TWEEN.Tween(origen)
      .to(destino, 500) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        this.esfera.position.y=origen.p;
      
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true


      var animacion2 = new TWEEN.Tween(escaladorigen)
      .to(escalado1, 50) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        this.esfera.scale.set(escaladorigen.x, escaladorigen.y, escaladorigen.z);
      
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true

      var animacion3 = new TWEEN.Tween(escaladorigen)
      .to(escalado2, 50) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        this.esfera.scale.set(escaladorigen.x, escaladorigen.y, escaladorigen.z);
      
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true

      var animacion4 = new TWEEN.Tween({p: origen2.p, escalad: escaladorigen})
      .to({p: destino2.p, escalad: escaladodest}, 100) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        this.esfera.position.y = animacion4._object.p;
        this.esfera.scale.set(animacion4._object.escalad.x, animacion4._object.escalad.y, animacion4._object.escalad.z);
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true
    
      var animacion5 = new TWEEN.Tween(origen3)
      .to(destino3, 500) //tiempo que tarda la animacion en hacerse en ms
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.esfera.position.y=origen3.p;
      
      })
      .repeat(0) //veces que se repite, se hace 1 vez mas el numeo de repeticinoes
      .yoyo(false); //La animacion vuelve desde el punto final al punto de inicio si está a true*/
      

      animacion1.chain(animacion2);
      animacion2.chain(animacion3);
      animacion3.chain(animacion4);
      animacion4.chain(animacion5);
      animacion5.chain(animacion1);

      animacion1.start();
      function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        // Renderizar la escena aquí
      }
      animate();

  }
}

export { Objetoshader };