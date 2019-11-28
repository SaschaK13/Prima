"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let rotate = fudge.Vector3.ZERO();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        L08_FudgeCraft_Collision.game = new fudge.Node("FudgeCraft");
        /** FRAGMENTS **/
        let fragment = new L08_FudgeCraft_Collision.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform());
        L08_FudgeCraft_Collision.game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(3))));
        L08_FudgeCraft_Collision.game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-3))));
        L08_FudgeCraft_Collision.game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(3);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(6))));
        L08_FudgeCraft_Collision.game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(4);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-6))));
        L08_FudgeCraft_Collision.game.appendChild(fragment);
        /** LIGHT **/
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);
        fillGrid();
        viewport.draw();
        fudge.Debug.log("Game", L08_FudgeCraft_Collision.game);
        window.addEventListener("keydown", hndKeyDown);
        // fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        // fudge.Loop.start();
    }
    function hndKeyDown(_event) {
        //let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                rotate.add(fudge.Vector3.X(-90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(fudge.Vector3.X(90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(fudge.Vector3.Y(-90));
                break;
            case fudge.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(fudge.Vector3.Y(90));
                break;
            case fudge.KEYBOARD_CODE.A:
                rotate.add(fudge.Vector3.Z(-90));
                break;
            case fudge.KEYBOARD_CODE.D:
                rotate.add(fudge.Vector3.Z(90));
                break;
        }
        for (let fragment of L08_FudgeCraft_Collision.game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
    function fillGrid() {
        //TODO initialize array
        const n = 20;
        //grid = new Array(n).fill(null).map(() => new Array(n).fill(null).map(() => new Array(n).fill(null)));
        //fudge.Debug.log(grid);
        for (let fragment of L08_FudgeCraft_Collision.game.getChildren()) {
            for (let cube of fragment.getChildren()) {
                let cubeTranslation = cube.cmpTransform.local.translation;
                let transformedTranslation = getGrid(cubeTranslation);
                //grid[transformedTranslation.x][transformedTranslation.y][transformedTranslation.z] = cube;
                fudge.Debug.log(L08_FudgeCraft_Collision.grid);
            }
        }
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
            translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
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
            viewport.draw();
        });
    }
    function getGrid(coordinates) {
        coordinates.x += 10;
        coordinates.y += 10;
        coordinates.z += 10;
        fudge.Debug.log(coordinates);
        return coordinates;
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map