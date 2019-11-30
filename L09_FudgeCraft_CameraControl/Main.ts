namespace L09_FudgeCraft_CameraControl {
    import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let game: fudge.Node = new fudge.Node("FudgeCraft");
    export let grid: Grid = new Grid();
    let control: Control = new Control();
    export let viewport: fudge.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);

        //Camera
        let camera: CameraOrbit = new CameraOrbit(75);

        //Light
        let cmpLight: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        let cmpLightAmbient: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightAmbient(fudge.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, camera.getCmpCamera(), canvas);
        fudge.Debug.log("Viewport", viewport);
        viewport.draw();
        
        startRandomFragment();
        game.appendChild(control);
        
        viewport.draw();
        fudge.Debug.log("Game", game);
        
        window.addEventListener("keydown", hndKeyDown);
        //window.addEventListener("wheel", hndWheel);
        window.addEventListener("mousemove", hndMousemove);

        
        //test();
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        if (_event.code == fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }

        let transformation: Transformation = Control.transformations[_event.code];
        if (transformation)
            move(transformation);

        // ƒ.RenderManager.update();
        viewport.draw();
    }

    function move(_transformation: Transformation): void {
        let animationSteps: number = 10;
        let fullRotation: number = 90;
        let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? fudge.Vector3.SCALE(_transformation.rotation, fullRotation) : new fudge.Vector3(),
            translation: _transformation.translation ? fudge.Vector3.SCALE(_transformation.translation, fullTranslation) : new fudge.Vector3()
        };

        let timers: fudge.Timers = fudge.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;

        let collisions: GridElement[] = control.checkCollisions(move);
        if (collisions.length > 0)
            return;

        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);

        fudge.Time.game.setTimer(10, animationSteps, function (): void {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }

    export function startRandomFragment(): void {
        let fragment: Fragment = Fragment.getRandom();
        control.cmpTransform.local = fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }

    // function hndWheel(_event: Event): void {
    //     camera.pivot.translateZ(5);

    //     fudge.Debug.log(camera);
    
    //     viewport.draw();
    // }

    function hndMousemove(_event: Event): void {
        fudge.Debug.log(_event);
        viewport.draw();
    }
}