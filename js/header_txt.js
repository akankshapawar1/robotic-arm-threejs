// //THREEjs library required
// //required classes implement THREEjs, (optionals classes don't)


// class Pivot {
//     constructor(geometry=new THREE.SphereGeometry(1,20,20), material = new THREE.MeshLambertMaterial({color: 0xFFCC00})){
//       this.geometry = geometry;
//       this.material = material;
//       this.mesh = new THREE.Mesh(this.geometry, this.material);
//       return this.mesh;
//     }
//     // //geometry
//     // setGeometry(geometry){
//     //     this.geometry = geometry;
//     // }

//     // getGeometry(){
//     //     return this.geometry;
//     // }
//     // //material
//     // setMaterial(material){
//     //     this.material = material;
//     // }

//     // getMaterial(){
//     //     return this.material;
//     // }
//     // //mesh create/update
//     // updateMesh(){
//     //     this.mesh = new THREE.Mesh(this.geometry, this.material);
//     // }
//     // setLocation(location){
//     //     cont (x, y, z) = location;
//     //     this.mesh.location = {x:x, y:y, z:z};
//     // }
//     // setOrientation(orientation){
//     //     cont (x, y, z) = orientation;
//     //     this.mesh.orientation = {x:x, y:y, z:z};
//     // }
// }



// class Segment{

//     constructor(){
//         this.material = new THREE.MeshLambertMaterial( { color: 0x0000ff,     transparent: true
//         , opacity:0.7} );
        
//         this.geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
//         // this.material.transparent = true;

//         this.mesh = new THREE.Mesh( this.geometry, this.material );
    
//         this.pivot = new Pivot();
        
//         //updatating pivot


//         this.pivot.position.set(this.mesh.position);
//         this.pivot.rotation.set(this.mesh.rotation);

        
            
//         return this.mesh;

//     }

//     setPivotPosition(
//             position = {
//                 x_offset:0,
//                 y_offset:0,
//                 z_offset:0
//             })
//     {
//         const {x, y, z} = this.mesh.position;
//         const {x_offset, y_offset, z_offset} = position;
//         this.pivot.position.set(x + x_offset, y+y_offset, z+z_offset);

//     }
//     setPivotPosition(
//         rotation = {
//             x_offset:0,
//             y_offset:0,
//             z_offset:0
//         })
//         {
//             const {x, y, z} = this.mesh.rotation;
//             const {x_offset, y_offset, z_offset} = rotation;
//             this.pivot.rotation.set(x + x_offset, y+y_offset, z+z_offset);

//         }

// }


// /*Additional classes (optional) not needed because mesh contains these.. */

// class Location{
//     constructor(location = {x:0, y:0, z:0}){
//         this.location = {x:0, y:0, z:0};
//     }

//     setX(x){
//         this.location.x = x;
//     }
//     setY(y){
//         this.location.y = y;
//     }
//     setX(z){
//         this.location.z = z;
//     }
//     set(location){
//         cont (x, y, z) = location;
//         this.location = {x:x, y:y, z:z}
//     }
    
// }

// class Orientation{
//     constructor(orientation = {x:0, y:0, z:0}){
//         this.orientation = orientation;
//     }

//     setX(x){
//         this.orientation.x = x;
//     }
//     setY(y){
//         this.orientation.y = y;
//     }
//     setX(z){
//         this.orientation.z = z;
//     }
//     set(orientation){
//         cont (x, y, z) = orientation;
//         this.orientation = {x:x, y:y, z:z}
//     }
    
// }


// /* 
//     Notes:

// */  