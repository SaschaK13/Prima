"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
        CUBE_TYPE["MAGENTA"] = "Magenta";
        CUBE_TYPE["CYAN"] = "Cyan";
        CUBE_TYPE["GREY"] = "Grey";
    })(CUBE_TYPE = L08_FudgeCraft_Collision.CUBE_TYPE || (L08_FudgeCraft_Collision.CUBE_TYPE = {}));
    class Cube extends fudge.Node {
        constructor(_type, _position) {
            super("Cube." + _type);
            let cmpMesh = new fudge.ComponentMesh(Cube.mesh);
            cmpMesh.pivot.scale(fudge.Vector3.ONE(0.9));
            this.addComponent(cmpMesh);
            let cmpMaterial = new fudge.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new fudge.Material(CUBE_TYPE.RED, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.RED))],
                [CUBE_TYPE.GREEN, new fudge.Material(CUBE_TYPE.GREEN, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.GREEN))],
                [CUBE_TYPE.BLUE, new fudge.Material(CUBE_TYPE.BLUE, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.BLUE))],
                [CUBE_TYPE.MAGENTA, new fudge.Material(CUBE_TYPE.MAGENTA, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.MAGENTA))],
                [CUBE_TYPE.YELLOW, new fudge.Material(CUBE_TYPE.YELLOW, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.YELLOW))],
                [CUBE_TYPE.CYAN, new fudge.Material(CUBE_TYPE.CYAN, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.CYAN))],
                [CUBE_TYPE.GREY, new fudge.Material(CUBE_TYPE.GREY, fudge.ShaderFlat, new fudge.CoatColored(fudge.Color.LIGHT_GREY))]
            ]);
        }
    }
    Cube.mesh = new fudge.MeshCube();
    Cube.materials = Cube.createMaterials();
    L08_FudgeCraft_Collision.Cube = Cube;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Cube.js.map