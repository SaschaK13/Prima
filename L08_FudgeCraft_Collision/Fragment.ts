namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;

    export class Fragment extends fudge.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: fudge.Vector3 = new fudge.Vector3(0, 0, 0);

        constructor(_shape: number, _position: fudge.Vector3 = fudge.Vector3.ZERO()) {
            super("Fragment-Type" + _shape);
            let shape: number[][] = Fragment.shapes[_shape];
            for (let position of shape) {
                let type: CUBE_TYPE;
                do {
                    type = Fragment.getRandomEnum(CUBE_TYPE);
                } while (type == CUBE_TYPE.GREY);
                let vctPosition: fudge.Vector3 = fudge.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }

            this.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(_position)));
        }

        public static getRandom(): Fragment {
            let shape: number = Math.floor(Math.random() * Fragment.shapes.length);
            let fragment: Fragment = new Fragment(shape);
            return fragment;
        }

        private static getShapeArray(): number[][][] {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }

        private static getRandomEnum<T>(_enum: { [key: string]: T }): T {
            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
}