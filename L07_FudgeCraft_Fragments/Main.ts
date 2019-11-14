namespace L07_FudgeCraft_Fragments {
    import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: fudge.Viewport;
    let game: fudge.Node;
    let rotate: fudge.Vector3 = fudge.Vector3.ZERO();

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);

        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());

        game = new fudge.Node("FudgeCraft");

        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment: Fragment = new Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform());
        game.appendChild(fragment);

        fragment = new Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(3))));
        game.appendChild(fragment);

        fragment = new Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-3))));
        game.appendChild(fragment);

        fragment = new Fragment(3);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(6))));
        game.appendChild(fragment);

        fragment = new Fragment(4);
        fragment.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(-6))));
        game.appendChild(fragment);

        /** LIGHT **/
        let cmpLight: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);


        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);

        viewport.draw();

        fudge.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        //let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                rotate.add(fudge.Vector3.X(-1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(fudge.Vector3.X(1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(fudge.Vector3.Y(-1));
                break;
            case fudge.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(fudge.Vector3.Y(1));
                break;
        }
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }

        fudge.RenderManager.update();
        viewport.draw();
    }
}