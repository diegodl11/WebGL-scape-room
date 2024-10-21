import * as THREE from '../libs/three.module.js'
 
class Boton extends THREE.Object3D {
  constructor() {
    super();

    // Materiales:
    var text_madera = new THREE.TextureLoader().load('imgs/madera-oscura.avif');
    var mat_madera = new THREE.MeshBasicMaterial({map: text_madera});
    var text_ladrillo = new THREE.TextureLoader().load('imgs/ladrillo-bump.png');
    var mat_ladrillo = new THREE.MeshPhongMaterial({color: 0x4b4b4b, map: text_ladrillo, bumpMap: text_ladrillo});
    var text_cuero = new THREE.TextureLoader().load('imgs/cuero-rojo.webp');
    var mat_cuero = new THREE.MeshBasicMaterial({map: text_cuero});
    
    // Hacemos una mini pared: 
    var geometria_pared = new THREE.BoxGeometry (130,200,5);
    var pared = new THREE.Mesh (geometria_pared, mat_ladrillo);
    this.add(pared);
    
    // Hacemos el soporte: 
    var geometria_soporte = new THREE.BoxGeometry (20,20,2);
    var soporte = new THREE.Mesh (geometria_soporte, mat_ladrillo);
    soporte.position.z = 4;
    this.add(soporte);

    var geometria_cilindro = new THREE.CylinderGeometry(2, 2, 2);
    var cilindro = new THREE.Mesh(geometria_cilindro, mat_ladrillo);
    cilindro.position.z = 5.5;
    cilindro.rotation.x = Math.PI/2;
    this.add(cilindro);

    // Puntos de la tapa:
    this.tapa = new THREE.Shape();
    this.tapa.moveTo(4,0); 
    this.tapa.quadraticCurveTo(4, 4, 0, 4); 
    this.tapa.quadraticCurveTo(-4, 4, -4, 0);
    this.tapa.quadraticCurveTo(-4, -4, 0, -4);
    this.tapa.quadraticCurveTo(4, -4, 4, 0);
  
    var pt = [];
    var points = [];
    pt = this.tapa.extractPoints(50).shape;

    pt.forEach ((pt) => {
      points.push(new THREE.Vector3(pt.x, pt.y, 0));
    });
    var shape = new THREE.Shape(points);
    var options = {depth : 2, steps : 2, curveSegments : 4, bevelThickness : 1, bevelSize : 1, bevelSegments : 2 };
    var geometry = new THREE.ExtrudeGeometry(shape, options);
    var mesh = new THREE.Mesh(geometry, mat_cuero);
    mesh.position.z = 7;
    mesh.name = "3"; 
    this.add (mesh);

  }
}

export { Boton };
