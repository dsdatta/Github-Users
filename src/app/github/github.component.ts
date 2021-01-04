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
  repos:any;
  constructor(private _githubService:ServerComponent) {
      this._githubService.getUser().subscribe(user => {
     this.user = false;
     //this.user = user; 
     },errors => {
        this.errors = errors;
       console.error('Oops', errors);
       });

       this._githubService.getRepos().subscribe(repos => {
        this.repos = repos;
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
    this._githubService.getRepos().subscribe(repos => {
      this.repos = repos;
      });
}

  animationFunction(avatar_url:string) //3D Cube with profile image of the search result
  {   
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(75,400/300,0.1,1000)

        camera.position.z =1.5;

  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor("#FFFFFF");

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
            renderer.setSize(400,300);
            camera.aspect = 400 / 300;

            camera.updateProjectionMatrix();
        })

  var geometry = new THREE.BoxGeometry(1, 1, 1);

  //Create texture loader to load avatar image of the searched user.
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(String(avatar_url));
  var materials = new THREE.MeshLambertMaterial({map: texture });

  var mesh = new THREE.Mesh(geometry, materials);

  scene.add(mesh);

  var light = new THREE.PointLight(0xFFFFFF, 1, 500)
        light.position.set(10,0,25);
        scene.add(light);

  var render =function(){
    requestAnimationFrame(render);
     mesh.rotation.y +=0.02;
    renderer.render(scene,camera);
  }
  render();

  }
  
  ngOnInit(): void {
 
  }

}
