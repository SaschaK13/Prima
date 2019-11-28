declare namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;
    class GridElement {
        cube: Cube;
        constructor(_cube?: Cube);
    }
    class Grid extends Map<string, Cube> {
        push(_cube: Cube): void;
        setCube(_position: fudge.Vector3): Cube;
        getCube(_position: fudge.Vector3): Cube;
        toKey(_position: fudge.Vector3): string;
    }
}
