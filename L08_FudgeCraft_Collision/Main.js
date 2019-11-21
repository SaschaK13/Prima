"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let grid;
    let rotate = fudge.Vector3.ZERO();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        game = new fudge.Node("FudgeCraft");
        /** FRAGMENTS **/
        let fragment = new L08_FudgeCraft_Collision.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform());
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-3))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(3);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(6))));
        game.appendChild(fragment);
        fragment = new L08_FudgeCraft_Collision.Fragment(4);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-6))));
        game.appendChild(fragment);
        /** LIGHT **/
        let cmpLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);
        fillGrid();
        viewport.draw();
        fudge.Debug.log("Game", game);
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
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
    function fillGrid() {
        //TODO initialize array
        const n = 20;
        grid = new Array(n).fill(null).map(() => new Array(n).fill(null).map(() => new Array(n).fill(null)));
        //fudge.Debug.log(grid);
        for (let fragment of game.getChildren()) {
            for (let cube of fragment.getChildren()) {
                let cubeTranslation = cube.cmpTransform.local.translation;
                let transformedTranslation = getGrid(cubeTranslation);
                grid[transformedTranslation.x][transformedTranslation.y][transformedTranslation.z] = cube;
                fudge.Debug.log(grid);
            }
        }
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