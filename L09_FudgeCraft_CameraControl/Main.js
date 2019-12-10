"use strict";
var L09_FudgeCraft_CameraControl;
(function (L09_FudgeCraft_CameraControl) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    L09_FudgeCraft_CameraControl.game = new fudge.Node("FudgeCraft");
    L09_FudgeCraft_CameraControl.grid = new L09_FudgeCraft_CameraControl.Grid();
    let control = new L09_FudgeCraft_CameraControl.Control();
    let camera;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        //Camera
        camera = new L09_FudgeCraft_CameraControl.CameraOrbit(75);
        //Light
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        L09_FudgeCraft_CameraControl.game.addComponent(cmpLight);
        let cmpLightAmbient = new fudge.ComponentLight(new fudge.LightAmbient(fudge.Color.DARK_GREY));
        L09_FudgeCraft_CameraControl.game.addComponent(cmpLightAmbient);
        L09_FudgeCraft_CameraControl.viewport = new fudge.Viewport();
        L09_FudgeCraft_CameraControl.viewport.initialize("Viewport", L09_FudgeCraft_CameraControl.game, camera.cmpCamera, canvas);
        fudge.Debug.log("Viewport", L09_FudgeCraft_CameraControl.viewport);
        L09_FudgeCraft_CameraControl.viewport.draw();
        startRandomFragment();
        L09_FudgeCraft_CameraControl.game.appendChild(control);
        L09_FudgeCraft_CameraControl.game.appendChild(camera);
        L09_FudgeCraft_CameraControl.viewport.draw();
        fudge.Debug.log("Game", L09_FudgeCraft_CameraControl.game);
        window.addEventListener("keydown", hndKeyDown);
        canvas.addEventListener("wheel", hndWheel);
        canvas.addEventListener("mousemove", hndMousemove);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L09_FudgeCraft_CameraControl.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // fudge.RenderManager.update();
        L09_FudgeCraft_CameraControl.viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? fudge.Vector3.SCALE(_transformation.rotation, fullRotation) : new fudge.Vector3(),
            translation: _transformation.translation ? fudge.Vector3.SCALE(_transformation.translation, fullTranslation) : new fudge.Vector3()
        };
        let timers = fudge.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        fudge.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // fudge.RenderManager.update();
            L09_FudgeCraft_CameraControl.viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L09_FudgeCraft_CameraControl.Fragment.getRandom();
        control.cmpTransform.local = fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L09_FudgeCraft_CameraControl.startRandomFragment = startRandomFragment;
    function hndWheel(_event) {
        //camera.pivot.translateZ(5);
        camera.moveDistance(_event.deltaY);
        fudge.Debug.log(_event);
        L09_FudgeCraft_CameraControl.viewport.draw();
    }
    function hndMousemove(_event) {
        let movementX = _event.movementX;
        let movementY = _event.movementY;
        fudge.Debug.log(_event.movementX);
        fudge.Debug.log(_event.movementY);
        //use rotateX & rotateY 
        camera.setRotationX(movementY);
        camera.setRotationY(movementX);
        L09_FudgeCraft_CameraControl.viewport.draw();
    }
})(L09_FudgeCraft_CameraControl || (L09_FudgeCraft_CameraControl = {}));
//# sourceMappingURL=Main.js.map