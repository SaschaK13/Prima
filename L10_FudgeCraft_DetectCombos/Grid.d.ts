declare namespace L10_FudgeCraft_DetectCombos {
    class GridElement {
        cube: Cube;
        pos: ƒ.Vector3;
        constructor(_cube?: Cube, _pos?: ƒ.Vector3);
    }
    class Grid extends Map<string, GridElement> {
        constructor();
        push(_position: ƒ.Vector3, _element?: GridElement): void;
        pull(_position: ƒ.Vector3): GridElement;
        pop(_position: ƒ.Vector3): GridElement;
        findNeighbors(_of: ƒ.Vector3, _empty?: boolean): GridElement[] | ƒ.Vector3[];
        private toKey;
    }
}
