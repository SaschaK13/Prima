"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var fudge = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
    })(CUBE_TYPE = L07_FudgeCraft_Fragments.CUBE_TYPE || (L07_FudgeCraft_Fragments.CUBE_TYPE = {}));
    class Cube extends fudge.Node {
        constructor(_type, _position) {
            super("Cube");
            let cmpMesh = new fudge.ComponentMesh(Cube.mesh);
            this.addComponent(cmpMesh);
            let cmpMaterial = new fudge.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position));
            cmpTransform.local.scale(fudge.Vector3.ONE(0.9));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new fudge.Material(CUBE_TYPE.RED, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.RED))],
                [CUBE_TYPE.GREEN, new fudge.Material(CUBE_TYPE.GREEN, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.GREEN))],
                [CUBE_TYPE.BLUE, new fudge.Material(CUBE_TYPE.BLUE, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.BLUE))],
                // [CUBE_TYPE.MAGENTA, new fudge.Material(CUBE_TYPE.MAGENTA, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.MAGENTA))],
                [CUBE_TYPE.YELLOW, new fudge.Material(CUBE_TYPE.YELLOW, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.YELLOW))],
            ]);
        }
    }
    Cube.mesh = new fudge.MeshCube();
    Cube.materials = Cube.createMaterials();
    L07_FudgeCraft_Fragments.Cube = Cube;
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Cube.js.map