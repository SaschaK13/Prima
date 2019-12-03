declare namespace L09_FudgeCraft_CameraControl {
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
    }
}
