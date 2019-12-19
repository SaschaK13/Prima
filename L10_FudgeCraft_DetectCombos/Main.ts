namespace L10_FudgeCraft_DetectCombos {
    export import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let game: ƒ.Node = new ƒ.Node("FudgeCraft");
    export let grid: Grid = new Grid();
    let control: Control = new Control();
    let viewport: ƒ.Viewport;
    let camera: CameraOrbit;
    let speedCameraRotation: number = 0.2;
    let speedCameraTranslation: number = 0.02;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);

        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);

        // set lights
        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);

        // setup orbiting camera
        camera = new CameraOrbit(75);
        game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);

        // setup viewport
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, camera.cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);

        // setup event handling
        viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        viewport.activateWheelEvent(ƒ.EVENT_WHEEL.WHEEL, true);
        viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, hndPointerMove);
        viewport.addEventListener(ƒ.EVENT_WHEEL.WHEEL, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);

        game.appendChild(control);

        startGame();
        // startTests();

        updateDisplay();
        ƒ.Debug.log("Game", game);

    }

    function startGame(): void {
        grid.push(ƒ.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.GREY, ƒ.Vector3.ZERO())));
        startRandomFragment();
    }

    export function updateDisplay(): void {
        viewport.draw();
    }

    function hndPointerMove(_event: ƒ.PointerEventƒ): void {
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
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            let frozen: GridElement[] = control.freeze();
            let combos: Combos = new Combos(frozen);
            handleCombos(combos);
            //handleCompression();
            startRandomFragment();
        }

        let transformation: Transformation = Control.transformations[_event.code];
        if (transformation)
            move(transformation);

        updateDisplay();
    }

    function handleCombos(_combos: Combos): void {
        for (let combo of _combos.found) {
            if (combo.length > 2) {
                for (let element of combo) {
                    let mtxLocal: ƒ.Matrix4x4 = element.cube.cmpTransform.local;
                    console.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.scale(ƒ.Vector3.ONE(0.5));
                    grid.pop(mtxLocal.translation);
                }
            }     
        }   
    }

    function handleCompression(): void {
        blackHole();
    }

    function blackHole(): void {
        grid.forEach((element: GridElement, key: string) => {
            let elementPosition: ƒ.Vector3  = grid.get(key).cube.cmpTransform.local.translation;
            let emptyNeighbors: ƒ.Vector3[] = grid.findNeighbors(elementPosition, true) as ƒ.Vector3[];
            getPositionOfNearestCubeToNucleus(emptyNeighbors);

            
            ƒ.Debug.log(emptyNeighbors);
        });
    }

    function getPositionOfNearestCubeToNucleus(_emptyNeighbors: ƒ.Vector3[]): ƒ.Vector3 {
        let nearestPosition: ƒ.Vector3 = _emptyNeighbors[0];
        let nucleus: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
        let nearestDistance: number = getDistanceBetweenTwoPoints(nearestPosition, nucleus);

        for (let currentPosition of _emptyNeighbors) {
            let currentDistance: number = getDistanceBetweenTwoPoints(currentPosition, nucleus);
            if (currentDistance < nearestDistance) {
                nearestDistance = currentDistance;
                nearestPosition = currentPosition;
            }
        }
        return nearestPosition;
    }

    function getDistanceBetweenTwoPoints(_a: ƒ.Vector3, _b: ƒ.Vector3): number {
        let connectionVector: ƒ.Vector3 = new ƒ.Vector3(_b.x - _a.x, _b.y - _a.y, _b.z - _a.z);
        let distance: number = Math.sqrt((connectionVector.x ** 2) + (connectionVector.y ** 2 ) + (connectionVector.z ** 2));

        return distance;
    }

    function move(_transformation: Transformation): void {
        let animationSteps: number = 10;
        let fullRotation: number = 90;
        let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
            translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
        };

        let timers: ƒ.Timers = ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;

        let collisions: Collision[] = control.checkCollisions(move);
        if (collisions.length > 0)
            return;

        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);

        ƒ.Time.game.setTimer(10, animationSteps, function (): void {
            control.move(move);
            updateDisplay();
        });
    }

    export function startRandomFragment(): void {
        let fragment: Fragment = Fragment.getRandom();
        control.cmpTransform.local = ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
}