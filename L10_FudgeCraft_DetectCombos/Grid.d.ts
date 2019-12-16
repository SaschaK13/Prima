declare namespace L10_FudgeCraft_DetectCombos {
    class GridElement {
        cube: Cube;
        constructor(_cube?: Cube);
    }
    class Grid extends Map<string, GridElement> {
        constructor();
        push(_position: ƒ.Vector3, _element?: GridElement): void;
        pull(_position: ƒ.Vector3): GridElement;
        pop(_position: ƒ.Vector3): GridElement;
        findNeigbors(_of: ƒ.Vector3): GridElement[];
        private toKey;
    }
}
