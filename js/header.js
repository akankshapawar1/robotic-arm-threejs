class ManipulatorTest {
  constructor() {
    this.revJoin1 = new RevolutJoint("cylinder"); 
    this.revJoin2 = new RevolutJoint("smallcircle");
    this.shoulder1 = new THREE.Object3D(); 
    this.link1 = new link();
    this.link2 = new link();

    // Set initial positions and rotations
    this.revJoin1.rotation.x = 0;
    this.revJoin1.children[3].rotation.z = 0; // Ensure this is set to 0 to stand upright
    this.revJoin2.rotation.x = 0;
    this.revJoin2.children[3].rotation.z = 0;

    this.shoulder1.position.y = 10; // Adjust based on the geometry of the joint and link
    this.link1.position.y = 50; // Adjust based on the length of the link
    this.revJoin2.position.y = 50;
    this.link2.position.y = 50;

    // Nest the components to form the manipulator
    this.revJoin1.children[3].add(this.shoulder1);
    this.shoulder1.add(this.link1);
    this.link1.add(this.revJoin2);
    this.revJoin2.add(this.link2); // Attach link2 directly to revJoin2
  }

  setAngle(angles) {
    const { a1, a2 } = angles;
    const clampedA1 = Math.max(-90, Math.min(90, a1));
    const clampedA2 = Math.max(-90, Math.min(90, a2));
    const radA1 = clampedA1 * (Math.PI / 180);  
    const radA2 = clampedA2 * (Math.PI / 180); 
    this.shoulder1.rotation.z = radA1; // Rotate shoulder around z-axis
    this.revJoin2.rotation.z = radA2; // Rotate second joint around z-axis
  }
}

class EndEffector {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(12 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xFF00CC })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.frame = new Frame();
    this.frame.add(this.mesh);
    return this.frame;
  }
}

class link {
  constructor(
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 }
  ) {
    this.geometry = new THREE.CylinderGeometry(5, 5, 100, 32);
    this.material = new THREE.MeshLambertMaterial({
      color: 0x9fc5e8,
      transparent: true,
      opacity: 1
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    var { x, y, z } = position;
    this.mesh.position.set(x, y, z);
    var { x, y, z } = rotation;
    this.mesh.rotation.set(x, y, z);

    return this.mesh;
  }
}

// class RevolutJoint {
//   constructor(
//     geometry = new THREE.CylinderGeometry(15, 15, 20, 30), // Increased height to encapsulate the link
//     material = new THREE.MeshLambertMaterial({
//       color: 0xC0C0C0,
//       transparent: false,
//       opacity: 1
//     })
//   ) {
//     this.frame = new Frame();
//     this.material = material;
//     this.geometry = geometry;
//     this.frame.add(new THREE.Mesh(this.geometry, this.material));
//     return this.frame;
//   }
// }
class RevolutJoint {
  constructor(type = "cylinder") {
    this.frame = new Frame();
    this.material = new THREE.MeshLambertMaterial({
      color: 0xC0C0C0, // Silver color
      transparent: false,
      opacity: 1
    });

    if (type === "smallcircle") {
      this.geometry = new THREE.SphereGeometry(8, 32, 32); // Small circle geometry
    } else {
      this.geometry = new THREE.CylinderGeometry(15, 15, 25, 32);
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 0; // Adjust position to align properly
    this.frame.add(this.mesh);
    return this.frame;
  }
}

class Frame {
  constructor(_scale = 1) {
    let scale = _scale;
    let axis = {
      x: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0xff0000
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0xff0000
          })
        )
      ),
      y: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x00ff00
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x00ff00
          })
        )
      ),
      z: new Segment(
        new THREE.CylinderGeometry(2, 2, 20, 32),
        new THREE.MeshLambertMaterial({
          color: 0x0000ff
        })
      ).add(
        new Segment(
          new THREE.CylinderGeometry(0, 4, 5, 32),
          new THREE.MeshLambertMaterial({
            color: 0x0000ff
          })
        )
      )
    };

    axis.x.position.x = 10;
    axis.x.children[0].position.y = 12.5;
    axis.x.rotation.z = -Math.PI / 2;
    axis.x.visible = false; 

    axis.y.position.y = 10;
    axis.y.children[0].position.y = 12.5;
    axis.y.visible = false; 

    axis.z.position.z = 10;
    axis.z.children[0].position.y = 12.5;
    axis.z.rotation.x = Math.PI / 2;
    axis.z.visible = false; 

    this.pivot = new Pivot();
    this.pivot
      .add(axis.x)
      .add(axis.y)
      .add(axis.z);

    return this.pivot;
  }
}

class Pivot {
  constructor(
    scale = 1,
    geometry = new THREE.SphereGeometry(2 * scale, 20, 20),
    material = new THREE.MeshLambertMaterial({ color: 0xffcc00 })
  ) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }
}

class Segment {
  constructor(
    geometry = new THREE.CylinderGeometry(5, 5, 20, 32),
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.7
    })
  ) {
    this.material = material;
    this.geometry = geometry;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.pivot = new Pivot();

    this.pivot.position.set(this.mesh.position);
    this.pivot.rotation.set(this.mesh.rotation);

    return this.mesh;
  }
}
