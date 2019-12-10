declare namespace L10_FudgeCraft_DetectCombos {
    class GridElement {
        cube: Cube;
        constructor(_cube?: Cube);
    }
    class Grid extends Map<string, GridElement> {
        constructor();
        push(_position: fudge.Vector3, _element?: GridElement): void;
        pull(_position: fudge.Vector3): GridElement;
        pop(_position: fudge.Vector3): GridElement;
        toKey(_position: fudge.Vector3): string;
    }
}
