import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Crucifijo extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color
    var text_madera = new THREE.TextureLoader().load('imgs/madera-oscura.avif');
    var mat_madera = new THREE.MeshBasicMaterial({map: text_madera});

    // Hacemos la cruz:
    var geometria_horizontal = new THREE.BoxGeometry (30,5,5);
    var horizontal = new THREE.Mesh (geometria_horizontal, mat_madera);

    var geometria_vertical = new THREE.BoxGeometry (5,60,5);
    var vertical = new THREE.Mesh (geometria_vertical, mat_madera);
    vertical.position.y = -10;
    
    var csg = new CSG();
    csg.union([horizontal, vertical]);
    var figura = csg.toMesh();
    figura.name = "1"; 

    this.add(figura);  }
}

export { Crucifijo };
