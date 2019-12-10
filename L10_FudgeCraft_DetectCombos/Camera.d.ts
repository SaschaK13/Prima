declare namespace L10_FudgeCraft_DetectCombos {
    import fudge = FudgeCore;
    class CameraOrbit extends fudge.Node {
        maxRotX: number;
        minDistance: number;
        constructor(_maxRotX: number);
        readonly cmpCamera: fudge.ComponentCamera;
        readonly rotatorX: fudge.Node;
        setDistance(_distance: number): void;
        moveDistance(_delta: number): void;
        setRotationY(_angle: number): void;
        setRotationX(_angle: number): void;
        rotateY(_delta: number): void;
        rotateX(_delta: number): void;
        translate(_delta: number): void;
    }
}
