import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { Antorcha } from './antorcha.js'
import { Boton } from './boton.js'
import { Reja } from './reja.js'
import * as TWEEN from '../libs/tween.esm.js'
 
class Laberinto extends THREE.Object3D {
  constructor() {
    super();

    // Materiales:
    var text_ladrillo = new THREE.TextureLoader().load('imgs/ladrillo-bump.png');
    text_ladrillo.wrapS = THREE.RepeatWrapping;
    text_ladrillo.wrapT = THREE.RepeatWrapping;
    text_ladrillo.repeat.set(0.01, 0.1)
    var mat_ladrillo = new THREE.MeshPhongMaterial({color: 0x4b4b4b, map: text_ladrillo, bumpMap: text_ladrillo, bumpScale :2});
    
    // ----------------- PAREDES -----------------
    var muro = new THREE.Shape();
    muro.moveTo(0.5,0); 
    muro.lineTo(0.5, 200);
    muro.lineTo(-205, 200);
    muro.lineTo(-205, 199.5);
    muro.lineTo(-0.5, 199.5);
    muro.lineTo(-0.5, 0.5);
    muro.lineTo(-205, 0.5);
    muro.lineTo(-205, 0);
    muro.lineTo(0.5, 0);
    
    var pt = [];
    pt = muro.extractPoints(50).shape;
    var points = [];

    pt.forEach ((pt) => {
      points.push(new THREE.Vector3(pt.y, pt.x, 0));
    });

    var pb = [];
    var barrido = new THREE.Shape();
    barrido.moveTo(-100, 0); 
    barrido.lineTo(-100, -250);
    barrido.lineTo(-100, -300);
    barrido.lineTo(-680, -300);
    barrido.lineTo(-700, -300);
    barrido.lineTo(-700, -650);
    barrido.lineTo(-700, -700);
    barrido.lineTo(-900, -700);
    barrido.lineTo(-900, -900);
    barrido.lineTo(-600, -900);
    barrido.lineTo(-600, -450);
    barrido.lineTo(-600, -400);
    barrido.lineTo(-400, -400);
    barrido.lineTo(-400, -550);
    barrido.lineTo(-400, -600);
    barrido.lineTo(-150, -600);
    barrido.lineTo(-100, -600);
    barrido.lineTo(-100, -500);
    barrido.lineTo(-250, -500);
    barrido.lineTo(-300, -500);
    barrido.lineTo(-300, -400);
    barrido.lineTo(450, -400);
    barrido.lineTo(500, -400);
    barrido.lineTo(500, -550);
    barrido.lineTo(500, -600);
    barrido.lineTo(250, -600);
    barrido.lineTo(200, -600);
    barrido.lineTo(200, -850);
    barrido.lineTo(200, -900);
    barrido.lineTo(-150, -900);
    barrido.lineTo(-150, -600);
    barrido.lineTo(-225, -600);
    barrido.lineTo(-300, -600);
    barrido.lineTo(-300, -1000);
    barrido.lineTo(480, -1000);
    barrido.lineTo(500, -1000);
    barrido.lineTo(500, -1150);
    barrido.lineTo(500, -1200);
    barrido.lineTo(700, -1200);
    barrido.lineTo(700, -950);
    barrido.lineTo(700, -900);
    barrido.lineTo(350, -900);
    barrido.lineTo(300, -900);
    barrido.lineTo(300, -700);
    barrido.lineTo(550, -700);
    barrido.lineTo(600, -700);
    barrido.lineTo(600, -350);
    barrido.lineTo(600, -300);
    barrido.lineTo(120, -300);
    barrido.lineTo(100, -300);
    barrido.lineTo(100, 0);
    
    pb = barrido.extractPoints(50).shape;
    var pb2 = [];

    pb.forEach ((pb) => {
      pb2.push(new THREE.Vector3(pb.x, 200, pb.y));
    });
    
    var path = new THREE.CatmullRomCurve3(pb2);
    var shape = new THREE.Shape(points);
    var options = {steps: 50, extrudePath: path, bevelEnabled: false};
    var geometry = new THREE.ExtrudeGeometry(shape, options);
    var mesh = new THREE.Mesh(geometry, mat_ladrillo);
    //this.add (mesh);

    // Antorchas:

    var antorcha = new Antorcha();
    antorcha.position.y = 120;
    antorcha.position.z = -372;
    this.add(antorcha);

    var antorcha2 = new Antorcha();
    antorcha2.position.y = 120;
    antorcha2.position.x = -250;
    antorcha2.position.z = -605;
    this.add(antorcha2);

    var antorcha3 = new Antorcha();
    antorcha3.rotation.y = Math.PI/2;
    antorcha3.position.y = 120;
    antorcha3.position.x = -703;
    antorcha3.position.z = -550;
    this.add(antorcha3);

    var antorcha4 = new Antorcha();
    antorcha4.rotation.y = -Math.PI/2;
    antorcha4.position.y = 120;
    antorcha4.position.x = 606;
    antorcha4.position.z = -400;
    this.add(antorcha4);

    var antorcha5 = new Antorcha();
    antorcha5.position.y = 120;
    antorcha5.position.x = 350;
    antorcha5.position.z = -1014;
    this.add(antorcha5);

    var antorcha6 = new Antorcha();
    antorcha6.rotation.y = Math.PI/2;
    antorcha6.position.y = 160;
    antorcha6.position.x = -866;
    antorcha6.position.z = -800;
    this.add(antorcha6);

    // Hueco puerta:
    var geometria_hueco_puerta = new THREE.BoxGeometry (100,194,60);
    var hueco_puerta = new THREE.Mesh (geometria_hueco_puerta, mat_ladrillo);
    hueco_puerta.position.x = 600;
    hueco_puerta.position.y = 99;
    hueco_puerta.position.z = -1200;
        
    var csg = new CSG();
    csg.union([mesh]);
    csg.subtract([hueco_puerta]);
    var laberinto_con_hueco = csg.toMesh();
    this.add(laberinto_con_hueco);

    // Botón:
    var boton = new Boton();
    boton.rotation.y = Math.PI/2;
    boton.position.set(-870, 100, -800);
    this.add(boton);

    // Reja:
    this.reja = new Reja();
    this.reja.position.set(600, 0, -1205);
    this.add(this.reja);
  }

  subirReja(){
    var animacion = new TWEEN.Tween(this.reja.position)
        .to({ y: this.reja.position.y + 190 }, 2000) 
        .start();
  }
}

export { Laberinto };
