"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.game = new fudge.Node("FudgeCraft");
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let control = new L08_FudgeCraft_Collision.Control();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        let cmpLightAmbient = new fudge.ComponentLight(new fudge.LightAmbient(fudge.Color.DARK_GREY));
        L08_FudgeCraft_Collision.game.addComponent(cmpLightAmbient);
        L08_FudgeCraft_Collision.viewport = new fudge.Viewport();
        L08_FudgeCraft_Collision.viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, L08_FudgeCraft_Collision.cmpCamera, canvas);
        fudge.Debug.log("Viewport", L08_FudgeCraft_Collision.viewport);
        L08_FudgeCraft_Collision.viewport.draw();
        startRandomFragment();
        L08_FudgeCraft_Collision.game.appendChild(control);
        L08_FudgeCraft_Collision.viewport.draw();
        fudge.Debug.log("Game", L08_FudgeCraft_Collision.game);
        window.addEventListener("keydown", hndKeyDown);
        //test();
    }
    function hndKeyDown(_event) {
        if (_event.code == fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L08_FudgeCraft_Collision.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        L08_FudgeCraft_Collision.viewport.draw();
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
            // ƒ.RenderManager.update();
            L08_FudgeCraft_Collision.viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L08_FudgeCraft_Collision.Fragment.getRandom();
        control.cmpTransform.local = fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L08_FudgeCraft_Collision.startRandomFragment = startRandomFragment;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map