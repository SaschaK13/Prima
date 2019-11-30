"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    var fudge = FudgeCore;
    class CameraOrbit extends fudge.Node {
        //private camera: fudge.ComponentCamera;
        constructor(_maxRotX) {
            super("CameraOrbit");
            //rotatorX: fudge.Node = new fudge.Node("RotatorX");
            this.maxRotX = 75;
            this.minDistance = 1;
            let cmpTransform = new fudge.ComponentTransform;
            this.addComponent(cmpTransform);
            let rotatorX = new fudge.Node("CameraRotX");
            this.appendChild(rotatorX);
            let cmpCamera = new fudge.ComponentCamera();
            cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
            cmpCamera.backgroundColor = fudge.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
        }
        getCmpCamera() {
            let rotatorX = this.getChildrenByName("CameraRotX")[0];
            return rotatorX.getComponent(fudge.ComponentCamera);
        }
        rotate(_delta) {
            //do stuff
        }
        setRotation(_delta) {
            this.cmpTransform.local.rotation.y = _delta.y;
        }
        setDistance(_distance) {
            let newDistance = Math.max(this.minDistance, _distance); //max() returns greatest value
            this.getCmpCamera().pivot.translation.z = newDistance;
        }
        moveDistance(_delta) {
            this.setDistance(this.getCmpCamera().pivot.translation.z + _delta);
        }
    }
    L09_FudgeCraft_CameraControl.CameraOrbit = CameraOrbit;
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Camera.js.map