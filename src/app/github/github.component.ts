import { Component, OnInit } from '@angular/core';
import { ServerComponent } from '../server/server.component';
import * as THREE from 'three';

declare const myFunction:any;

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent  {

  user:any;
  username:any;
  errors:any;
  constructor(private _githubService:ServerComponent) {
      this._githubService.getUser().subscribe(user => {
     this.user = false;
     console.log(this.user);
     },errors => {
        this.errors = errors;
       console.error('Oops', errors);
       });
    //this.user=false;
   }
   search()
  {
    this._githubService.searchUser(this.username);
    this._githubService.getUser().subscribe(user => {
      this.user = user;
    });
    //this.animationFunction();
  }
  animationFunction() {
    
  var scene = new THREE.Scene();

  //var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
  var camera = new THREE.PerspectiveCamera(75,400/200,0.1,1000)

        camera.position.z = 2;

  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor("#e5e5e5");
  //renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setSize(400,200);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', () => {
            //renderer.setSize(window.innerWidth,window.innerHeight);
            //camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(400,200);
            camera.aspect = 400 / 200;

            camera.updateProjectionMatrix();
        })

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  //var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
  //var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('./assets/img/time.jpg');
  //const texture = textureLoader.load('user.avatar_url');
  var materials = new THREE.MeshLambertMaterial({map: texture });

  var mesh = new THREE.Mesh(geometry, materials);
 // mesh.position.x=-1;
 // mesh.position.y=1;
  //mesh.position.z=1;
  // mesh.rotation.set(45,0,0);
   //mesh.scale.set(1,2,1);
  scene.add(mesh);

  var light = new THREE.PointLight(0xFFFFFF, 1, 500)
        light.position.set(10,0,25);
        scene.add(light);
  var render =function(){
    requestAnimationFrame(render);
    mesh.rotation.x +=0.03;
    mesh.rotation.y +=0.01;
    renderer.render(scene,camera);
  }
  render();
   
  }
  
  ngOnInit(): void {
    this.animationFunction();
     
  }

}
