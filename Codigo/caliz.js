import * as THREE from '../libs/three.module.js'
 
class Caliz extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color
    var text_marmol = new THREE.TextureLoader().load('imgs/piedra-caliz.jpg');
    text_marmol.wrapS = THREE.RepeatWrapping;
    text_marmol.wrapT = THREE.RepeatWrapping;
    text_marmol.repeat.set(8, 16);
    var mat_marmol = new THREE.MeshBasicMaterial({color: 0x808080, map: text_marmol});

    var perfil = new THREE.Shape();
    perfil.moveTo(0,0); // punto inicial (x,y) 
    perfil.lineTo(7,0);
    perfil.quadraticCurveTo(8, 0, 8, 2);
    perfil.quadraticCurveTo(8, 4, 7, 4);
    perfil.quadraticCurveTo(3, 4, 3, 8);
    perfil.quadraticCurveTo(3, 10, 5, 10);
    perfil.quadraticCurveTo(5, 12, 3, 12);
    perfil.lineTo(3,14);
    perfil.quadraticCurveTo(8, 14, 8, 19.5);
    perfil.quadraticCurveTo(8, 20, 7.5, 20);
    perfil.quadraticCurveTo(7, 20, 7, 19.5);
    perfil.quadraticCurveTo(7, 14.5, 0, 14.5);
    
    var pt = [];
    pt = perfil.extractPoints(50).shape;

    var caliz = new THREE.Mesh(new THREE.LatheGeometry(pt, 20, 0, Math.PI*2), mat_marmol);
    this.add(caliz);
  }
}

export { Caliz };
