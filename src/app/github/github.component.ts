import { Component } from '@angular/core';
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
  avatar_url:string;
  constructor(private _githubService:ServerComponent) {
      this._githubService.getUser().subscribe(user => {
     this.user = false;
     //this.user = user;
     //this.avatar_url = this.user.avatar_url;
     //this.animationFunction(this.user.avatar_url);
 
     },errors => {
        this.errors = errors;
       console.error('Oops', errors);
       });
   }

   search() //Search function returns the entered result from textbox
  {   
    this._githubService.searchUser(this.username);
    this._githubService.getUser().subscribe(user => {
      this.user = user;
      this.animationFunction(this.user.avatar_url);
    });

  }

  animationFunction(avatar_url:string) //3D Cube with profile image of the search result
  {   
  var scene = new THREE.Scene();

  //var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
  var camera = new THREE.PerspectiveCamera(75,400/300,0.1,1000)

        camera.position.z =1.5;

  var renderer = new THREE.WebGLRenderer({antialias: true});
  //renderer.setClearColor("#e5e5e5");
  renderer.setClearColor("#FFFFFF");
  //renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setSize(400,300);
  var elementExists = document.getElementById("one");

  if(!elementExists)
  {
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id='one';

  }else{
    elementExists.parentNode.removeChild(elementExists);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id='one';
  }
    

  window.addEventListener('resize', () => {
            //renderer.setSize(window.innerWidth,window.innerHeight);
            //camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(400,300);
            camera.aspect = 400 / 300;

            camera.updateProjectionMatrix();
        })

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  //var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
  //var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(String(avatar_url));
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
    //mesh.rotation.x +=-0.01;
    // mesh.rotation.y +=0.01;
     mesh.rotation.y +=0.02;
    renderer.render(scene,camera);
  }
  render();
  

  }
  
  ngOnInit(): void {
  
     
  }

}
