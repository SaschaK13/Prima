"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    class Fragment extends fudge.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new fudge.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            let type;
            for (let position of shape) { // like for each - for in returns indizes
                type = Fragment.getRandomEnum(L08_FudgeCraft_Collision.CUBE_TYPE);
                //type = Fragment.getColor(_shape);
                let vctPosition = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L08_FudgeCraft_Collision.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 0]],
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]],
                [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, -1, 0]],
                [[0, 0, 0], [0, 1, 0], [0, -1, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L08_FudgeCraft_Collision.Fragment = Fragment;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Fragment.js.map