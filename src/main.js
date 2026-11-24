import * as THREE from 'three';
const canvas=document.querySelector('#scene');
if(canvas&&!matchMedia('(prefers-reduced-motion: reduce)').matches){try{
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.z=7.2;
const group=new THREE.Group();scene.add(group);
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.45,5),new THREE.MeshPhysicalMaterial({color:0x8e79d8,metalness:.72,roughness:.23,transmission:.12,thickness:.8,clearcoat:1,transparent:true,opacity:.92}));group.add(core);
const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.49,2),new THREE.MeshBasicMaterial({color:0xc7b7ff,wireframe:true,transparent:true,opacity:.16}));group.add(wire);
const r1=new THREE.Mesh(new THREE.TorusGeometry(2.05,.008,8,180),new THREE.MeshBasicMaterial({color:0x91aaff,transparent:true,opacity:.6}));r1.rotation.set(1.12,.35,-.25);group.add(r1);
const r2=new THREE.Mesh(new THREE.TorusGeometry(2.28,.006,8,180),new THREE.MeshBasicMaterial({color:0xb49cff,transparent:true,opacity:.35}));r2.rotation.set(.25,1.05,.65);group.add(r2);
scene.add(new THREE.AmbientLight(0x9b9acb,1.5));const l1=new THREE.PointLight(0xc6b4ff,38,15);l1.position.set(3,3,4);scene.add(l1);const l2=new THREE.PointLight(0x609bff,24,14);l2.position.set(-3,-2,2);scene.add(l2);
const p=[];for(let i=0;i<180;i++){const r=2.6+Math.random()*1.5,t=Math.random()*Math.PI*2,f=Math.acos(2*Math.random()-1);p.push(r*Math.sin(f)*Math.cos(t),r*Math.sin(f)*Math.sin(t),r*Math.cos(f))}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(p,3));group.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xb9b0ff,size:.018,transparent:true,opacity:.65})));
let px=0,py=0;addEventListener('pointermove',e=>{px=(e.clientX/innerWidth-.5)*.28;py=(e.clientY/innerHeight-.5)*.2},{passive:true});
const resize=()=>{const w=canvas.clientWidth||1,h=canvas.clientHeight||1;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};new ResizeObserver(resize).observe(canvas);resize();
const clock=new THREE.Clock();function animate(){const t=clock.getElapsedTime();group.rotation.y+=(px-group.rotation.y)*.018;group.rotation.x+=(-py-group.rotation.x)*.018;core.rotation.y=t*.12;wire.rotation.y=-t*.07;r1.rotation.z=t*.035;r2.rotation.x=.25+Math.sin(t*.18)*.06;renderer.render(scene,camera);requestAnimationFrame(animate)}animate();
}catch(e){console.warn('3D visual unavailable; static design remains visible.',e)}}