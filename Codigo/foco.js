import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Foco extends THREE.Object3D {
  constructor() {
        super();
        
    // Como material se crea uno a partir de un color
      var mat_grisOscuro = new THREE.MeshPhongMaterial({ color: 0x464646 });
      var mat_blanco = new THREE.MeshPhongMaterial({color: 0xFFFF00, specular: 0xffffff, shininess: 10});

    // Hacemos el foco :
    var geometria_cilindro = new THREE.CylinderGeometry (12,10,40, 12);
    var parteprincipal = new THREE.Mesh(geometria_cilindro, mat_grisOscuro);
    
    var geometria_soporte = new THREE.CylinderGeometry (10,10,10, 20);
    var partesoporte = new THREE.Mesh(geometria_soporte, mat_grisOscuro);
    partesoporte.position.y -= 3;
    
    var geometria_suavizado = new THREE.SphereGeometry (15,50,50);
    var suavizado = new THREE.Mesh(geometria_suavizado, mat_grisOscuro);

    var geometria_cilindropequeno = new THREE.CylinderGeometry (10,8,10, 12);
      var partedentro = new THREE.Mesh(geometria_cilindropequeno, mat_grisOscuro);
      var geometria_cilindropequenobrillo = new THREE.CylinderGeometry (10,10,1, 12);
      var partedentrobrillo = new THREE.Mesh (geometria_cilindropequenobrillo, mat_blanco);
      partedentro.position.y += 14;
      partedentrobrillo.position.y += 23;
    
      var csg = new CSG();

      csg.intersect([suavizado, parteprincipal]);
      csg.subtract([partedentro]);
    
      var resultadoGeometry = csg.toMesh();
    
      resultadoGeometry.position.y += 14;

      var resultado = new THREE.Object3D();
      resultado.add(resultadoGeometry);
      resultado.add(partedentrobrillo);
      resultado.rotation.z += Math.PI/ 9;
      var focoEntero = new THREE.Object3D();
      focoEntero.add(resultado);
      focoEntero.add(partesoporte);
      
    focoEntero.position.y += 10;
    focoEntero.rotation.y += Math.PI / 2;
    focoEntero.rotation.x += Math.PI / 1.95  ;

    this.add(focoEntero)
  }
}

export { Foco };