import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Llama } from './llama.js'

class Antorcha extends THREE.Object3D {
  constructor() {
    super();
    
    // Materiales:
    var text_madera = new THREE.TextureLoader().load('imgs/madera-oscura.avif');
    var mat_madera = new THREE.MeshBasicMaterial({map: text_madera});
    var text_marmol = new THREE.TextureLoader().load('imgs/marmol-negro.webp');

    // Hacemos el soporte: 
    var geometria_soporte = new THREE.BoxGeometry (20,20,2);
    var soporte = new THREE.Mesh (geometria_soporte, mat_madera);
    this.add(soporte);

    var geometria_agarre = new THREE.CylinderGeometry(3, 3, 5);
    var agarre = new THREE.Mesh(geometria_agarre, mat_madera);
    agarre.rotation.x = Math.PI/2;
    agarre.position.z = 2.5;
    this.add(agarre);

    // Hacemos la antorcha:
    var perfil = new THREE.Shape();
    perfil.moveTo(0,0);
    perfil.lineTo(2, 0);
    perfil.lineTo(2, 17);
    perfil.quadraticCurveTo(4, 17, 4, 20);
    perfil.lineTo(4, 22);
    perfil.lineTo(3.5, 22);
    perfil.lineTo(3.5, 20);
    perfil.lineTo(0,20);
    
    var pt = [];
    pt = perfil.extractPoints(50).shape;

    var antorcha = new THREE.Mesh(new THREE.LatheGeometry(pt, 20, 0, Math.PI*2), mat_madera);
    antorcha.position.y = -10;
    antorcha.position.z = 7;
    this.add(antorcha);

    // Llama:
    var llama = new Llama();
    llama.position.z = 7;
    llama.position.y = 11;

    // Luz:
    var pointLight = new THREE.PointLight( 0xff0000, 4, 400);
    pointLight.position.set( 0, 11, 7.5 );
    
    // Animación de la luz:
    var intensidadMinima = 2;
    var intensidadMaxima = 4;
    var intensidadMinima2 = 2.5;


    var animacion1 = new TWEEN.Tween(pointLight)
    .to({ intensity: intensidadMinima }, 1000) 
    .easing(TWEEN.Easing.Quadratic.InOut)
    .repeat(0)

    var animacion2 = new TWEEN.Tween(pointLight)
      .to({ intensity: intensidadMaxima }, 200) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0);


      var animacion3 = new TWEEN.Tween(pointLight)
      .to({ intensity: intensidadMinima2 }, 800) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0);
      var animacion4 = new TWEEN.Tween(pointLight)
      .to({ intensity: intensidadMaxima }, 600) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0);
      var animacion5 = new TWEEN.Tween(pointLight)
      .to({ intensity: intensidadMinima2 }, 1500) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0);
      var animacion6 = new TWEEN.Tween(pointLight)
      .to({ intensity: intensidadMaxima }, 1500) 
      .easing(TWEEN.Easing.Quadratic.InOut)
      .repeat(0);
    
      animacion1.chain(animacion2);
      animacion2.chain(animacion3);
      animacion3.chain(animacion4);
      animacion4.chain(animacion5);
      animacion5.chain(animacion6);
      animacion6.chain(animacion1);
      animacion1.start();

    function actualizarAnimacion() {
      requestAnimationFrame(actualizarAnimacion);
      TWEEN.update();
    }
    
    actualizarAnimacion();
    TWEEN.update();

    // Juntamos toda la antorcha:
    var grupo = new THREE.Group();
    grupo.add(antorcha);
    grupo.add(llama);
    grupo.add(pointLight);
    grupo.rotation.z = -Math.PI/5;
    this.add(grupo);
    
    
  }
}

export { Antorcha };

