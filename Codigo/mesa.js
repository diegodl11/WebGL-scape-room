import * as THREE from '../libs/three.module.js'
 
class Mesa extends THREE.Object3D {
  constructor() {
    super();
    
    // Como material se crea uno a partir de un color

    var text_madera = new THREE.TextureLoader().load('imgs/madera-oscura.avif');
    var mat_madera = new THREE.MeshBasicMaterial({map: text_madera});
    var mat_transparente = new THREE.MeshPhongMaterial(
      {color: 0xffffff, transparent: true, opacity:0, refractionRatio:0.98});

    // Hacemos la tabla superior:
    var geometria_superior = new THREE.BoxGeometry (200,20,100);
    var parte_superior = new THREE.Mesh (geometria_superior, mat_madera);
    parte_superior.position.y = 90;
    this.add(parte_superior);
    
    // Hacemos las patas:
    var pos = [ 
      new THREE.Vector3(90, 40, 40),
      new THREE.Vector3(90, 40, -40),
      new THREE.Vector3(-90, 40, 40),
      new THREE.Vector3(-90, 40, -40)
    ];

    var geometria_pata = new THREE.BoxGeometry (20,80,20);

    for( var i = 0; i < 4; i++){
      var pata = new THREE.Mesh (geometria_pata, mat_madera);
      pata.position.copy(pos[i]);
      this.add(pata);
    }

    
    var geometria_colision = new THREE.BoxGeometry (200,250,100);

    var colision = new THREE.Mesh (geometria_colision, mat_transparente);
    colision.position.y=125;

    this.add(colision);
    
  }
}

export { Mesa };