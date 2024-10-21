import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Mundotransparente extends THREE.Object3D {
  constructor() {
    super();

    // Materiales:
    // Como material se crea uno a partir de un color
    var text_marmol = new THREE.TextureLoader().load('imgs/marmol-negro.jpg');
    text_marmol.wrapS = THREE.RepeatWrapping;
    text_marmol.wrapT = THREE.RepeatWrapping;
    text_marmol.repeat.set(0.05, 0.05);
      var mat_marmol = new THREE.MeshPhongMaterial({ color: 0x202020});
      var mat_marmol2 = new THREE.MeshPhongMaterial({ map: text_marmol });
      
      var material_mundo = new THREE.MeshPhongMaterial({ color: 0xaf5d4a  });
      var text_mundo = new THREE.TextureLoader().load('imgs/textura-alpha.jpg');
      material_mundo.alphaMap = text_mundo;
      material_mundo.transparent = true;
      material_mundo.side = THREE.DoubleSide;

      
      var text_ladrillo = new THREE.TextureLoader().load('imgs/marmol-negro.jpg');
      text_ladrillo.wrapS = THREE.RepeatWrapping;
      text_ladrillo.wrapT = THREE.RepeatWrapping;
      text_ladrillo.repeat.set(2, 4);
      var mat_ladrillo = new THREE.MeshPhongMaterial({color: 0x4b4b4b, map: text_ladrillo, bumpMap: text_ladrillo, bumpScale :2});

      //geometria bola del mundo
      var geometria_mundo = new THREE.SphereGeometry(20, 50, 50);
      var mundo = new THREE.Mesh(geometria_mundo, material_mundo);
      mundo.position.y += 142;
      

      //para la colision
      var geometria_caja = new THREE.BoxGeometry(44, 183, 13);
  


    // Puntos de la extrusión del apoyo:
    this.lineApoyo = new THREE.Shape();
    this.lineApoyo.moveTo(20,0); 
    this.lineApoyo.quadraticCurveTo(22, 20, 18, 40); 
    this.lineApoyo.quadraticCurveTo(24, 100, 20, 120);
    this.lineApoyo.quadraticCurveTo(0, 120, -20, 120);
      this.lineApoyo.quadraticCurveTo(-24, 100, -18, 40);
      this.lineApoyo.quadraticCurveTo(-22, 20, -20, 0);
  
    var pt = [];
    var points = [];
    pt = this.lineApoyo.extractPoints(50).shape;

    pt.forEach ((pt) => {
      points.push(new THREE.Vector3(pt.x, pt.y, 0));
    });
      var shape = new THREE.Shape(points);
      var shape2 = new THREE.Shape(points);
    var options = {depth : 40, steps : 20, curveSegments : 4, bevelThickness : 1, bevelSize : 1, bevelSegments : 2 };
      var geometry = new THREE.ExtrudeGeometry(shape, options);
      var geometry2 = new THREE.ExtrudeGeometry(shape, options);
      var mesh = new THREE.Mesh(geometry, mat_marmol);

      mesh.position.z -= 20;
      mesh.position.y += 1;
      var mesh2 = new THREE.Mesh(geometry2, mat_marmol);

      mesh2.position.x -= 20;
      mesh2.rotation.y += Math.PI / 2;
    
      var csg = new CSG();
      csg.intersect([mesh, mesh2]);

      var objetofinal = csg.toMesh();

      objetofinal.material = mat_marmol2;
      objetofinal.material.needsUpdate = true;

      //para la colision

      var colision = new THREE.Mesh(geometria_caja, mat_ladrillo);
      colision.position.y += 91.5;
      colision.position.z -= 25.5;
      
      this.add(mundo);
      this.add(objetofinal);
      this.add(colision);

  }
}

export { Mundotransparente };