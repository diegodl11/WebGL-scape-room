import * as THREE from '../libs/three.module.js'
 
class Marco extends THREE.Object3D {
  constructor() {
    super();
    
    // Materiales:
    var text_foto = new THREE.TextureLoader().load('imgs/cristo.jpg');
    var mat_cristo = new THREE.MeshBasicMaterial({map: text_foto});

    // Hacemos el marco: 
    var geometria_marco = new THREE.BoxGeometry (75,125,1);
    var marco = new THREE.Mesh (geometria_marco, mat_cristo);
    this.add(marco);

    
  }
}

export { Marco };
