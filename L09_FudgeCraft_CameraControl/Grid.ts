namespace L09_FudgeCraft_CameraControl {

    import fudge = FudgeCore;

    export class GridElement {
        public cube: Cube;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
        }
    }

    export class Grid extends Map<string, GridElement> {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(fudge.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.GREY, fudge.Vector3.ZERO())));
        }

        push(_position: fudge.Vector3, _element: GridElement = null): void {
            let key: string = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                game.appendChild(_element.cube);
        }

        pull(_position: fudge.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            return element;
        }

        pop(_position: fudge.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            this.delete(key);
            if (element)
                game.removeChild(element.cube);
            return element;
        }

        toKey(_position: fudge.Vector3): string {
            let position: fudge.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }
    }
}