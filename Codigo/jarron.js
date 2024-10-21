import * as THREE from '../libs/three.module.js'
 
class Jarron extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color
    var text_marmol = new THREE.TextureLoader().load('imgs/marmol-blanco.jpg');
    var mat_marmol = new THREE.MeshBasicMaterial({map: text_marmol});

    var perfil = new THREE.Shape();
    perfil.moveTo(0,0); // punto inicial (x,y) 
    perfil.quadraticCurveTo(8, 0, 8, 7.5);
    perfil.quadraticCurveTo(8, 15, 2, 15);
    perfil.lineTo(2,27);
    perfil.quadraticCurveTo(2, 28, 3, 28);
    perfil.quadraticCurveTo(4, 28, 4, 29);
    perfil.quadraticCurveTo(4, 30, 3, 30);
    perfil.lineTo(0,30);
    
    var pt = [];
    pt = perfil.extractPoints(50).shape;

    var jarron = new THREE.Mesh(new THREE.LatheGeometry(pt, 20, 0, Math.PI*2), mat_marmol);
    this.add(jarron);
  }
}

export { Jarron };
