declare namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;
    class Fragment extends fudge.Node {
        private static shapes;
        position: fudge.Vector3;
        constructor(_shape: number);
        private static getShapeArray;
        private static getRandomEnum;
    }
}
