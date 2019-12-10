declare namespace L10_FudgeCraft_DetectCombos {
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
