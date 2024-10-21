import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Llama extends THREE.Object3D {
  constructor() {
    super();
    
    // Materiales:
    var mat_rojo = new THREE.MeshBasicMaterial({color: 0xD32213});
    var mat_amarillo = new THREE.MeshBasicMaterial({color: 0xFFAC00});

    // Hacemos la llama:
    var cargado = new OBJLoader();
    var cargado2 = new OBJLoader();
    var escena = this;
    
    // Cargar archivo:
    cargado.load('objs/campfire.obj', function(objeto) {
      // Recorre todas las mallas del objeto
      objeto.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          // Asigna el material a la malla
          child.material = mat_rojo;
        }
      });
      objeto.scale.set(4,4,4);
      escena.add(objeto);
    });

    cargado2.load('objs/campfire.obj', function(objeto) {
      // Recorre todas las mallas del objeto
      objeto.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          // Asigna el material a la malla
          child.material = mat_amarillo;
        }
      });
      objeto.scale.set(3,3,3);
      objeto.position.y = 1.5;
      escena.add(objeto);
    });
    
  }
}

export { Llama };
