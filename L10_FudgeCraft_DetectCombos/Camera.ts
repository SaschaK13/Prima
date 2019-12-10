namespace L10_FudgeCraft_DetectCombos {
    import fudge = FudgeCore;

    export class CameraOrbit extends fudge.Node {
        //rotatorX: fudge.Node;
        maxRotX: number = 75;
        minDistance: number = 10;

        constructor(_maxRotX: number) {
            super("CameraOrbit");

            this.maxRotX = Math.min(_maxRotX, 89);

            let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);

            let rotatorX: fudge.Node = new fudge.Node("CameraRotX");
            rotatorX.addComponent(new fudge.ComponentTransform());
            this.appendChild(rotatorX);

            let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
            cmpCamera.backgroundColor = fudge.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
        }

        get cmpCamera(): fudge.ComponentCamera {
            return this.rotatorX.getComponent(fudge.ComponentCamera);
        }

        get rotatorX(): fudge.Node {
            return this.getChildrenByName("CameraRotX")[0];
        }

        setDistance(_distance: number): void {
            let newDistance: number = Math.max(this.minDistance, _distance);
            this.cmpCamera.pivot.translation = fudge.Vector3.Z(newDistance);
        }

        moveDistance(_delta: number): void {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }

        setRotationY(_angle: number): void {
            this.cmpTransform.local.rotation = fudge.Vector3.Y(_angle);
        }

        setRotationX(_angle: number): void {
            _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = fudge.Vector3.X(_angle);
        }

        rotateY(_delta: number): void {
            this.cmpTransform.local.rotateY(_delta);
        }
        
        rotateX(_delta: number): void {
            let angle: number = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        translate(_delta: number): void {
            let distance: number = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
}
