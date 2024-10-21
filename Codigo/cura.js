import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

 
class Cura extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color
    var text_camisa = new THREE.TextureLoader().load('imgs/camisa-cura.png');
    var text_cabeza = new THREE.TextureLoader().load('imgs/cabeza.jpg');
   
    var materialCuerpo = new THREE.MeshStandardMaterial({ color: 0xfff4b5, castShadow: true });
    var materialFrontal = new THREE.MeshStandardMaterial({ map: text_camisa, castShadow: true });
    var materialCabeza = new THREE.MeshStandardMaterial({ map: text_cabeza, castShadow: true });

    // Crear un material básico para las demás caras del del torso
    var materialLateral = new THREE.MeshBasicMaterial({color: 0x000000});

    var geometria_torso = new THREE.BoxGeometry (60,90,20);
    var geometria_piernas= new THREE.CylinderGeometry (7,7,90,20);
    var geometria_brazos= new THREE.CylinderGeometry (6,6,30,20);
    var geometria_extremidades = new THREE.SphereGeometry(9,40,40);
    var geometria_manos = new THREE.CylinderGeometry(5,5,10,20);
    var geometria_cabeza = new THREE.SphereGeometry(17,40,40);

    // Crear una matriz de materiales para el cubo
    var mat_torso = [
      materialLateral,  // Material para las caras laterales
      materialLateral,  // Material para las caras laterales
      materialLateral,  // Material para las caras laterales
      materialLateral,  // Material para las caras laterales
      materialFrontal,  // Material para la cara frontal
      materialLateral   // Material para las caras laterales
    ];
  
    var torso = new THREE.Mesh(geometria_torso, mat_torso);
    torso.name = "7";
    torso.castShadow = true;
    
    //PIERNAS

    var cadera1 = new THREE.Mesh(geometria_extremidades, materialLateral);
    cadera1.position.x+=20;
    cadera1.castShadow = true;
    cadera1.name = "7";

    var cadera2 = new THREE.Mesh(geometria_extremidades, materialLateral);
    cadera2.position.x-=20;
    cadera2.castShadow = true;
    cadera2.name = "7";

    var pierna1 = new THREE.Mesh(geometria_piernas, materialLateral);
    pierna1.position.x+=20;
    pierna1.position.y-=50;
    pierna1.castShadow = true;
    pierna1.name = "7";

    var pierna2 = new THREE.Mesh(geometria_piernas, materialLateral);
    pierna2.position.x-=20;
    pierna2.position.y-=50;
    pierna2.castShadow = true;
    pierna2.name = "7";

    var piernaDerecha = new THREE.Object3D();
    piernaDerecha.add(pierna1);
    piernaDerecha.add(cadera1);
    piernaDerecha.position.set(0,-45,0);
    piernaDerecha.rotation.x=Math.PI/8;

    var piernaIzquierda = new THREE.Object3D();
    piernaIzquierda.add(pierna2);
    piernaIzquierda.add(cadera2);
    piernaIzquierda.position.set(0,-45,0);
    piernaIzquierda.rotation.x=-Math.PI/8;

    var hombro1 = new THREE.Mesh(geometria_extremidades, materialLateral);
    var brazo11 = new THREE.Mesh(geometria_brazos, materialLateral);
    brazo11.position.set(0,-20, 0);
    var brazoArriba1 = new THREE.Object3D();
    brazoArriba1.add(hombro1);
    brazoArriba1.add(brazo11);
    hombro1.castShadow = true;
    brazo11.castShadow = true;
    hombro1.name = "7";
    brazo11.name = "7";

    var codo1 = new THREE.Mesh(geometria_extremidades, materialLateral);
    var brazo12 = new THREE.Mesh(geometria_brazos, materialLateral);
    brazo12.position.set(0,-20, 0);
    var mano1 = new THREE.Mesh(geometria_manos, materialCuerpo);
    mano1.position.y-=5;
    mano1.rotation.x-=Math.PI/3;
    mano1.position.y-=35;
    var brazoAbajo1 = new THREE.Object3D();
    brazoAbajo1.add(codo1);
    brazoAbajo1.add(brazo12);
    brazoAbajo1.add(mano1);
    brazoAbajo1.position.y-=30;
    codo1.castShadow = true;
    brazo12.castShadow = true;
    mano1.castShadow = true;
    codo1.name="7";
    brazo12.name="7";
    mano1.name = "7";
    
    var brazoEntero1 = new THREE.Object3D();
    brazoEntero1.add(brazoArriba1);
    brazoEntero1.add(brazoAbajo1);
    brazoEntero1.rotation.z+=Math.PI/10;
    brazoEntero1.position.set(35,40,0);

    var hombro2 = new THREE.Mesh(geometria_extremidades, materialLateral);
    var brazo21 = new THREE.Mesh(geometria_brazos, materialLateral);
    brazo21.position.set(0,-20, 0);
    var brazoArriba2 = new THREE.Object3D();
    brazoArriba2.add(hombro2);
    brazoArriba2.add(brazo21);
    hombro2.castShadow = true;
    brazo21.castShadow = true;
    hombro2.name="7";
    brazo21.name="7";

    var codo2 = new THREE.Mesh(geometria_extremidades, materialLateral);
    var brazo22 = new THREE.Mesh(geometria_brazos, materialLateral);
    brazo22.position.set(0,-20, 0);
    var mano2 = new THREE.Mesh(geometria_manos, materialCuerpo);
    mano2.position.y-=5;
    mano2.rotation.x-=Math.PI/3;
    mano2.position.y-=35;
    var brazoAbajo2 = new THREE.Object3D();
    brazoAbajo2.add(codo2);
    brazoAbajo2.add(brazo22);
    brazoAbajo2.add(mano2);
    brazoAbajo2.position.y-=30;
    codo2.castShadow = true;
    brazo22.castShadow = true;
    mano2.castShadow = true;
    codo2.name="7";
    brazo22.name="7";
    mano2.name="7";

    var brazoEntero2 = new THREE.Object3D();
    brazoEntero2.add(brazoArriba2);
    brazoEntero2.add(brazoAbajo2);
    brazoEntero2.rotation.z-=Math.PI/10;
    brazoEntero2.position.set(-35,40,0);

    var cabeza = new THREE.Mesh(geometria_cabeza, materialCabeza);
    cabeza.position.y+=63.5;
    cabeza.rotation.y-=Math.PI/2.5;
    cabeza.rotation.x+=Math.PI/8;
    cabeza.castShadow = true;
    cabeza.name="7";

    this.cuerpoCura = new THREE.Object3D();
    this.cuerpoCura.add(torso);
    this.cuerpoCura.add(piernaDerecha);
    this.cuerpoCura.add(piernaIzquierda);
    this.cuerpoCura.add(brazoEntero1);
    this.cuerpoCura.add(brazoEntero2);
    this.cuerpoCura.add(cabeza);
    this.cuerpoCura.castShadow = true;
    this.add(this.cuerpoCura);

    var anguloMinimo =0;
    var anguloMaximo = Math.PI/4;

    var anguloPiernaMax = Math.PI/8;
    var anguloPiermaMin = -Math.PI/8;

    var movimientoMinimo =0;
    var movimientoMaximo = 200;

    var giroMin = 0;
    var giroMax = Math.PI;
    var giroMin2 = Math.PI*2;


    var animacion1 = new TWEEN.Tween({ angulo: anguloMinimo, angulo2: anguloMaximo, angulo3: anguloPiermaMin, angulo4: anguloPiernaMax })
    .to({ angulo: anguloMaximo, angulo2: anguloMinimo,  angulo3: anguloPiernaMax, angulo4: anguloPiermaMin }, 1000) // Tiempo que tarda la animación en hacerse en ms
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
      brazoEntero1.rotation.x = animacion1._object.angulo;
      brazoAbajo1.rotation.x = -2 * animacion1._object.angulo;
      brazoEntero2.rotation.x = animacion1._object.angulo2;
      brazoAbajo2.rotation.x = -2 * animacion1._object.angulo2;

      piernaDerecha.rotation.x = animacion1._object.angulo3;
      piernaIzquierda.rotation.x = animacion1._object.angulo4;
    })
    .repeat(0); // Veces que se repite, se hace 1 vez más el número de repeticiones

    var animacion2 = new TWEEN.Tween({ angulo: anguloMaximo, angulo2: anguloMinimo, angulo3: anguloPiernaMax, angulo4: anguloPiermaMin })
    .to({ angulo: anguloMinimo,  angulo2: anguloMaximo, angulo3: anguloPiermaMin, angulo4: anguloPiernaMax }, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
      brazoEntero1.rotation.x = animacion2._object.angulo;
      brazoAbajo1.rotation.x = -2 * animacion2._object.angulo;
      brazoEntero2.rotation.x = animacion2._object.angulo2;
      brazoAbajo2.rotation.x = -2 * animacion2._object.angulo2;

      piernaDerecha.rotation.x = animacion2._object.angulo3;
      piernaIzquierda.rotation.x = animacion2._object.angulo4;
    })
    .repeat(0);

    var animacion3 = new TWEEN.Tween({mov: movimientoMinimo })
    .to({mov: movimientoMaximo }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
        this.cuerpoCura.position.z=animacion3._object.mov;
    })
    .repeat(0);

    var animacion4 = new TWEEN.Tween({giro: giroMin})
    .to({giro: giroMax }, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
        this.cuerpoCura.rotation.y=animacion4._object.giro;
    })
    .repeat(0);
    var animacion5 = new TWEEN.Tween({mov: movimientoMaximo})
    .to({mov: movimientoMinimo }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
        this.cuerpoCura.position.z=animacion5._object.mov;
    })
    .repeat(0);
    var animacion6 = new TWEEN.Tween({giro: giroMax})
    .to({giro: giroMin2 }, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
        this.cuerpoCura.rotation.y=animacion6._object.giro;
    })
    .repeat(0);


    animacion1.chain(animacion2);
    animacion2.chain(animacion1);
    animacion1.chain(animacion2);
    animacion2.chain(animacion1);
    animacion1.start();

    animacion3.chain(animacion4);
    animacion4.chain(animacion5);
    animacion5.chain(animacion6);
    animacion6.chain(animacion3);

    animacion3.start();

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
      // Renderizar la escena aquí
    }
    animate();
   
  }
}

export { Cura };