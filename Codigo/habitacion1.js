import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { Puerta } from './puerta.js'
import * as TWEEN from '../libs/tween.esm.js'

class Habitacion1 extends THREE.Object3D {
    constructor() {
        super();
        //texturas de la habitación
        var text_ladrillo = new THREE.TextureLoader().load('imgs/ladrillo-bump.png');
        text_ladrillo.wrapS = THREE.RepeatWrapping;
        text_ladrillo.wrapT = THREE.RepeatWrapping;
        text_ladrillo.repeat.set(8, 16);
        var mat_ladrillo = new THREE.MeshPhongMaterial({color: 0x4b4b4b, map: text_ladrillo, bumpMap: text_ladrillo, bumpScale :2});

        var text_marmol = new THREE.TextureLoader().load('imgs/marmol-blanco.jpg');
        text_marmol.wrapS = THREE.RepeatWrapping;
        text_marmol.wrapT = THREE.RepeatWrapping;
        text_marmol.repeat.set(8, 16);
        var mat_marmol = new THREE.MeshPhongMaterial({ color: 0x4b4b4b, map: text_marmol, bumpMap: text_marmol});


        // -------------- HABITACION PRINCIPAL -------------- 
        
        // PAREDES:

        var geometria_muro = new THREE.BoxGeometry (50,400,800);
        var muro_izquierda = new THREE.Mesh (geometria_muro, mat_ladrillo);
        muro_izquierda.position.y = 200;
        muro_izquierda.castShadow = true;
        this.add(muro_izquierda);

        var muro_derecha = muro_izquierda.clone();
        this.add(muro_derecha);

        var muro_delantero = muro_derecha.clone();
        muro_delantero.rotation.y = Math.PI/2;

        var muro_trasero = muro_delantero.clone();

        muro_izquierda.position.x = -375;
        muro_derecha.position.x = 375;
        muro_trasero.position.z = -375;
        muro_delantero.position.z = 375;

        // PUERTA:

        var geometria_hueco_puerta = new THREE.BoxGeometry (100,194,60);
        var hueco_puerta = new THREE.Mesh (geometria_hueco_puerta, mat_ladrillo);
        hueco_puerta.position.y = 97;
        hueco_puerta.position.z = -370;
        var hueco_puerta2 = new THREE.Mesh (geometria_hueco_puerta, mat_ladrillo);
        hueco_puerta2.position.y = 97;
        hueco_puerta2.position.z = 370;
        
        var csg = new CSG();
        csg.union([muro_trasero]);
        csg.subtract([hueco_puerta]);
        var muro_con_hueco = csg.toMesh();
        
        this.add(muro_con_hueco);

        var csg2 = new CSG();
        csg2.union([muro_delantero]);
        csg2.subtract([hueco_puerta2]);
        var muro_con_hueco2 = csg2.toMesh();
        muro_con_hueco2.receiveShadow = true;
        this.add(muro_con_hueco2);

        this.puerta = new Puerta();
        this.puerta.position.set(-50,97,-375);
        this.add(this.puerta);
        this.puerta2 = new Puerta();
        this.puerta2.position.set(-50,97,375);
        this.add(this.puerta2);
        

        // TECHO Y SUELO:

        var geometria_techo = new THREE.BoxGeometry(800,50,800);
        var techo = new THREE.Mesh(geometria_techo, mat_ladrillo);
        techo.position.y = 425;
        techo.castShadow = true;
        this.add(techo);

        var suelo = new THREE.Mesh(geometria_techo, mat_marmol);
        suelo.position.y = -25;
        suelo.receiveShadow = true;
        this.add(suelo);
    }

    abrirPuerta(){
        var inicioRotacion = { rotacion: 0 }; // Objeto para almacenar el estado inicial de la rotación
        var animacion = new TWEEN.Tween(inicioRotacion)
            .to({ rotacion: Math.PI/2 }, 2000) // El 5 es para dar 5 vueltas
            .onUpdate(() => {
            this.puerta.rotation.y = inicioRotacion.rotacion;
            })
            .start();
    }

    abrirPuerta2(){
        var inicioRotacion = { rotacion: 0 }; // Objeto para almacenar el estado inicial de la rotación
        var animacion = new TWEEN.Tween(inicioRotacion)
            .to({ rotacion: Math.PI/2 }, 2000) // El 5 es para dar 5 vueltas
            .onUpdate(() => {
            this.puerta2.rotation.y = inicioRotacion.rotacion;
            })
            .start();
    }
  }
  
  export { Habitacion1 };