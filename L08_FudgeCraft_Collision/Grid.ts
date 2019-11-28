namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;

    export class GridElement {
        public cube: Cube;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
        }
    }

    export class Grid extends Map <string, Cube> { //grid is a map
       // private grid: Map <string, Cube> = new Map(); //grid manages map
       push(_cube: Cube): void {
           let key: string = this.toKey(_cube.cmpTransform.local.translation.map(Math.round));
           this.set(key, _cube);
           game.appendChild(_cube);
        }

        setCube(_position: fudge.Vector3): Cube {
            let key: string = this.toKey(_position);
            let cube: Cube = this.get(key);
            return cube;
        }
        
        getCube(_position: fudge.Vector3): Cube {
            let key: string = this.toKey(_position);
            let cube: Cube = this.get(key);
            this.delete(key);
            game.removeChild(cube);
            return cube;
        }

        toKey(_position: fudge.Vector3): string {
            let position: fudge.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }   
    }
}