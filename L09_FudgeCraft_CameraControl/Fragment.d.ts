declare namespace L09_FudgeCraft_CameraControl {
    import fudge = FudgeCore;
    class Fragment extends fudge.Node {
        private static shapes;
        position: fudge.Vector3;
        constructor(_shape: number, _position?: fudge.Vector3);
        static getRandom(): Fragment;
        private static getShapeArray;
        private static getRandomEnum;
    }
}
