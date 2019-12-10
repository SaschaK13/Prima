namespace L10_FudgeCraft_DetectCombos {
    export import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let game: fudge.Node = new fudge.Node("FudgeCraft");
    export let grid: Grid = new Grid();
    let control: Control = new Control();
    let viewport: fudge.Viewport;
    let camera: CameraOrbit;
    let speedCameraRotation: number = 0.2;
    let speedCameraTranslation: number = 0.02;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize(true);
        fudge.Debug.log("Canvas", canvas);

        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);

        // set lights
        let cmpLight: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightDirectional(fudge.Color.WHITE));
        cmpLight.pivot.lookAt(new fudge.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        let cmpLightAmbient: fudge.ComponentLight = new fudge.ComponentLight(new fudge.LightAmbient(fudge.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);

        // setup orbiting camera
        camera = new CameraOrbit(75);
        game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);

        // setup viewport
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
        fudge.Debug.log("Viewport", viewport);

        // setup event handling
        viewport.activatePointerEvent(fudge.EVENT_POINTER.MOVE, true);
        viewport.activateWheelEvent(fudge.EVENT_WHEEL.WHEEL, true);
        viewport.addEventListener(fudge.EVENT_POINTER.MOVE, hndPointerMove);
        viewport.addEventListener(fudge.EVENT_WHEEL.WHEEL, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);

        // start game
        startRandomFragment();
        game.appendChild(control);

        updateDisplay();
        fudge.Debug.log("Game", game);

        //test();
    }

    function updateDisplay(): void {
        viewport.draw();

    }

    function hndPointerMove(_event: fudge.PointerEventƒ): void {
        // console.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }

    function hndWheelMove(_event: WheelEvent): void {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        if (_event.code == fudge.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }

        let transformation: Transformation = Control.transformations[_event.code];
        if (transformation)
            move(transformation);

        updateDisplay();
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
            updateDisplay();
        });
    }

    export function startRandomFragment(): void {
        let fragment: Fragment = Fragment.getRandom();
        control.cmpTransform.local = fudge.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
}