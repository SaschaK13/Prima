declare namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;
    interface Transformation {
        translation?: fudge.Vector3;
        rotation?: fudge.Vector3;
    }
    interface Transformations {
        [keycode: string]: Transformation;
    }
    interface Collision {
        element: GridElement;
        cube: Cube;
    }
    class Control extends fudge.Node {
        static transformations: Transformations;
        private fragment;
        constructor();
        static defineControls(): Transformations;
        setFragment(_fragment: Fragment): void;
        move(_transformation: Transformation): void;
        checkCollisions(_transformation: Transformation): Collision[];
        freeze(): void;
    }
}
