"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    var fudge = FudgeCore;
    class Control extends fudge.Node {
        constructor() {
            super("Control");
            this.addComponent(new fudge.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[fudge.KEYBOARD_CODE.ARROW_UP] = { rotation: fudge.Vector3.X(-1) };
            controls[fudge.KEYBOARD_CODE.ARROW_DOWN] = { rotation: fudge.Vector3.X(1) };
            controls[fudge.KEYBOARD_CODE.ARROW_LEFT] = { rotation: fudge.Vector3.Y(-1) };
            controls[fudge.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: fudge.Vector3.Y(1) };
            controls[fudge.KEYBOARD_CODE.W] = { translation: fudge.Vector3.Z(-1) };
            controls[fudge.KEYBOARD_CODE.S] = { translation: fudge.Vector3.Z(1) };
            controls[fudge.KEYBOARD_CODE.A] = { translation: fudge.Vector3.X(-1) };
            controls[fudge.KEYBOARD_CODE.D] = { translation: fudge.Vector3.X(1) };
            controls[fudge.KEYBOARD_CODE.SHIFT_LEFT] = controls[fudge.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: fudge.Vector3.Y(1) };
            controls[fudge.KEYBOARD_CODE.CTRL_LEFT] = controls[fudge.KEYBOARD_CODE.CTRL_RIGHT] = { translation: fudge.Vector3.Y(-1) };
            return controls;
        }
        setFragment(_fragment) {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }
        move(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
        }
        checkCollisions(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            let save = [mtxContainer.getMutator(), mtxFragment.getMutator()];
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
            fudge.RenderManager.update();
            let collisions = [];
            for (let cube of this.fragment.getChildren()) {
                let element = L09_FudgeCraft_CameraControl.grid.pull(cube.mtxWorld.translation);
                if (element)
                    collisions.push({ element, cube });
            }
            mtxContainer.mutate(save[0]);
            mtxFragment.mutate(save[1]);
            return collisions;
        }
        freeze() {
            for (let cube of this.fragment.getChildren()) {
                let position = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                L09_FudgeCraft_CameraControl.grid.push(position, new L09_FudgeCraft_CameraControl.GridElement(cube));
            }
        }
    }
    Control.transformations = Control.defineControls();
    L09_FudgeCraft_CameraControl.Control = Control;
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Control.js.map