namespace L09_FudgeCraft_CameraControl {
    import fudge = FudgeCore;

    export class CameraOrbit extends fudge.Node {

        //rotatorX: fudge.Node = new fudge.Node("RotatorX");
        maxRotX: number = 75;
        minDistance: number = 1;
        //private camera: fudge.ComponentCamera;

        constructor(_maxRotX: number) {
            super("CameraOrbit");

            let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform;
            this.addComponent(cmpTransform);

            let rotatorX: fudge.Node = new fudge.Node("CameraRotX");
            this.appendChild(rotatorX);

            let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
            cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
            cmpCamera.backgroundColor = fudge.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
        }

        getCmpCamera(): fudge.ComponentCamera { //get cmpCamera()
            let rotatorX: fudge.Node = this.getChildrenByName("CameraRotX")[0];
            return rotatorX.getComponent(fudge.ComponentCamera);
        }

        rotate(_delta: fudge.Vector3): void {
            //do stuff
        }

        setRotation(_delta: fudge.Vector3): void {
            this.cmpTransform.local.rotation.y = _delta.y;
        }

        setDistance(_distance: number): void {
            let newDistance: number = Math.max(this.minDistance, _distance); //max() returns greatest value
            this.getCmpCamera().pivot.translation.z = newDistance;
        }

        moveDistance(_delta: number): void {
            this.setDistance(this.getCmpCamera().pivot.translation.z + _delta);
        }
    }
}