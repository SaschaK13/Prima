declare namespace L09_FudgeCraft_CameraControl {
    import fudge = FudgeCore;
    enum CUBE_TYPE {
        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue",
        YELLOW = "Yellow",
        MAGENTA = "Magenta",
        CYAN = "Cyan",
        GREY = "Grey"
    }
    class Cube extends fudge.Node {
        private static mesh;
        private static materials;
        constructor(_type: CUBE_TYPE, _position: fudge.Vector3);
        private static createMaterials;
    }
}
