namespace L07_FudgeCraft_Fragments {
    import fudge = FudgeCore;

    export class Fragment extends fudge.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: fudge.Vector3 = new fudge.Vector3(0, 0, 0);

        constructor(_shape: number) {
            super("Fragment-Type" + _shape);
            let shape: number [][] = Fragment.shapes[_shape];
            let type: CUBE_TYPE;
            for (let position of shape) {
                let type: CUBE_TYPE =  Fragment.getRandomEnum(CUBE_TYPE);
                type = Fragment.getColor(_shape);
                let vctPosition: fudge.Vector3 = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }

        private static getShapeArray(): number[][][] {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 0]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]],

                [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, -1, 0]]
            ];
        }

        private static getRandomEnum<T>(_enum: {[key: string]: T}): T {
            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }

        private static getColor(shape: number) {
            switch (shape) {
                case 1:
                    return CUBE_TYPE.GREEN;
                    break;
                case 2:
                    return CUBE_TYPE.BLUE;
                    break;
                case 3:
                    return CUBE_TYPE.YELLOW;
                    break;
                default:
                    return CUBE_TYPE.RED;
                    break;
            }
        }
    }
}