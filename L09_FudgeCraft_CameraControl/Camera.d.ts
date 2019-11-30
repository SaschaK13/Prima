declare namespace L09_FudgeCraft_CameraControl {
    import fudge = FudgeCore;
    class CameraOrbit extends fudge.Node {
        maxRotX: number;
        minDistance: number;
        constructor(_maxRotX: number);
        getCmpCamera(): fudge.ComponentCamera;
        rotate(_delta: fudge.Vector3): void;
        setRotation(_delta: fudge.Vector3): void;
        setDistance(_distance: number): void;
        moveDistance(_delta: number): void;
    }
}
