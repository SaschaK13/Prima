namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);
    let viewport: fudge.Viewport;
    let game: fudge.Node;
    let grid: Cube [][][];
    let rotate: fudge.Vector3 = fudge.Vector3.ZERO();

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);

        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());

        game = new fudge.Node("FudgeCraft");

        /** FRAGMENTS **/
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

        fillGrid();

        viewport.draw();

        fudge.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);

        // fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        // fudge.Loop.start();
    }

    function hndKeyDown(_event: KeyboardEvent): void {
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

    function fillGrid(): void {

        //TODO initialize array
        const n: number = 20; 
        grid = new Array(n).fill(null).map(() => new Array(n).fill(null).map(() => new Array(n).fill(null)));
        //fudge.Debug.log(grid);

        for (let fragment of game.getChildren()) {
            for (let cube of fragment.getChildren()) {
                let cubeTranslation: fudge.Vector3 = cube.cmpTransform.local.translation;
                let transformedTranslation: fudge.Vector3 = getGrid(cubeTranslation);

                grid[transformedTranslation.x][transformedTranslation.y][transformedTranslation.z] = cube;
                fudge.Debug.log(grid);
            }
        }
    }

    function getGrid(coordinates: fudge.Vector3): fudge.Vector3 {
        coordinates.x += 10;
        coordinates.y += 10;
        coordinates.z += 10;
        fudge.Debug.log(coordinates);
        return coordinates;
    }
}