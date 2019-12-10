"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    var fudge = FudgeCore;
    class CameraOrbit extends fudge.Node {
        constructor(_maxRotX) {
            super("CameraOrbit");
            //rotatorX: fudge.Node;
            this.maxRotX = 75;
            this.minDistance = 10;
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
            this.cmpTransform.local.rotation = fudge.Vector3.Y(_angle);
        }
        setRotationX(_angle) {
            _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = fudge.Vector3.X(_angle);
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
        }
        rotateX(_delta) {
            let angle = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        translate(_delta) {
            let distance = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
    L10_FudgeCraft_DetectCombos.CameraOrbit = CameraOrbit;
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Camera.js.map