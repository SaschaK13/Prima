"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    var fudge = FudgeCore;
    class CameraOrbit extends fudge.Node {
        constructor(_maxRotX) {
            super("CameraOrbit");
            //rotatorX: fudge.Node;
            this.maxRotX = 75;
            this.minDistance = 1;
            this.maxRotX = Math.min(_maxRotX, 89);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
            let rotatorX = new fudge.Node("CameraRotX");
            rotatorX.addComponent(new fudge.ComponentTransform());
            this.appendChild(rotatorX);
            let cmpCamera = new fudge.ComponentCamera();
            cmpCamera.backgroundColor = fudge.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
        }
        get cmpCamera() {
            return this.rotatorX.getComponent(fudge.ComponentCamera);
        }
        get rotatorX() {
            return this.getChildrenByName("CameraRotX")[0];
        }
        setDistance(_distance) {
            let newDistance = Math.max(this.minDistance, _distance);
            this.cmpCamera.pivot.translation = fudge.Vector3.Z(newDistance);
        }
        moveDistance(_delta) {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation = fudge.Vector3.Y(this.cmpTransform.local.rotation.y + _angle);
        }
        setRotationX(_angle) {
            this.rotatorX.cmpTransform.local.rotation = fudge.Vector3.X(this.rotatorX.cmpTransform.local.rotation.x - _angle);
        }
    }
    L09_FudgeCraft_CameraControl.CameraOrbit = CameraOrbit;
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Camera.js.map