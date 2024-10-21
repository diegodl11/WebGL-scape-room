import * as THREE from '../libs/three.module.js'
 
class Estanteria extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color

    var text_madera = new THREE.TextureLoader().load('imgs/madera-oscura.avif');
    var mat_madera = new THREE.MeshBasicMaterial({map: text_madera});

    var mat_transparente = new THREE.MeshPhongMaterial(
      {color: 0xffffff, transparent: true, opacity:0, refractionRatio:0.98});

    // Hacemos las tablas:
    var geometria_tabla = new THREE.BoxGeometry (250,20,80);

    var tabla_superior = new THREE.Mesh (geometria_tabla, mat_madera);
    tabla_superior.position.y = 240;
    this.add(tabla_superior);

    var tabla_medio = new THREE.Mesh (geometria_tabla, mat_madera);
    tabla_medio.position.y = 135;
    this.add(tabla_medio);

    var tabla_inferior = new THREE.Mesh (geometria_tabla, mat_madera);
    tabla_inferior.position.y = 10;
    this.add(tabla_inferior);
    
    // Hacemos los laterales:
    var geometria_lateral = new THREE.BoxGeometry (20,250,80);

    var izquierda = new THREE.Mesh (geometria_lateral, mat_madera);
    izquierda.position.x = -135
    izquierda.position.y = 125;
    this.add(izquierda);

    var derecha = new THREE.Mesh (geometria_lateral, mat_madera);
    derecha.position.x = 135;
    derecha.position.y = 125;
    this.add(derecha);

    var geometria_colision = new THREE.BoxGeometry (250,250,80);

    var colision = new THREE.Mesh (geometria_colision, mat_transparente);
    colision.position.y=125;

    this.add(colision);
  }
}

export { Estanteria };