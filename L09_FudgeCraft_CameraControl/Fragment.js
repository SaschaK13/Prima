"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    var fudge = FudgeCore;
    class Fragment extends fudge.Node {
        constructor(_shape, _position = fudge.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            this.position = new fudge.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type;
                do {
                    type = Fragment.getRandomEnum(L09_FudgeCraft_CameraControl.CUBE_TYPE);
                } while (type == L09_FudgeCraft_CameraControl.CUBE_TYPE.GREY);
                let vctPosition = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L09_FudgeCraft_CameraControl.Cube(type, vctPosition);
                this.appendChild(cube);
            }
            this.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position)));
        }
        static getRandom() {
            let shape = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment = new Fragment(shape);
            return fragment;
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L09_FudgeCraft_CameraControl.Fragment = Fragment;
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Fragment.js.map