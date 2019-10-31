namespace L05_PongReflection {

    interface KeyPress {
        [code: string]: boolean;
    }

    import fudge = FudgeCore;
    let keysPressed: KeyPress = { };

    window.addEventListener("load", handleLoad);
    export let viewport: fudge.Viewport;

    let pong: fudge.Node = new fudge.Node("Pong");

    let ball: fudge.Node;
    let paddleLeft: fudge.Node;
    let paddleRight: fudge.Node;
    let leftWall: fudge.Node;
    let rightWall: fudge.Node;
    let topWall: fudge.Node;
    let bottomWall: fudge.Node;

    let ballSpeed: fudge.Vector3;
    let randomX: number;
    let randomY: number;

    let canvasLength: number = 9;
    let canvasHeight: number = 7;

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        let pong: fudge.Node = createPong();

        /** CAMERA **/ 
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 20));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        /** BALL **/
        randomX = getSign() * Math.random();
        randomY = getSign() * Math.random();
        ballSpeed = new fudge.Vector3(randomX / 2, randomY / 2, 0);

        /** VIEWPORT **/
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);

        viewport.draw();

        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start();
    }

    function update(_event: Event): void {
        //fudge.Debug.log(keysPressed);

        /** CONTROLS **/
        if (keysPressed[fudge.KEYBOARD_CODE.W] == true) {
            paddleLeft.cmpTransform.local.translateY(0.3);
        } 
        if (keysPressed[fudge.KEYBOARD_CODE.S] == true) {
            paddleLeft.cmpTransform.local.translateY(-0.3);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP] == true) {
            paddleRight.cmpTransform.local.translateY(0.3);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN] == true) {
            paddleRight.cmpTransform.local.translateY(-0.3);
        }

        ball.cmpTransform.local.translate(ballSpeed);
        
        if (detectHit(ball.cmpTransform.local.translation, topWall) == true || detectHit(ball.cmpTransform.local.translation, bottomWall) == true) {
            randomY = - randomY;
            ballSpeed = new fudge.Vector3(randomX, randomY, 0);
        }

        if (detectHit(ball.cmpTransform.local.translation, rightWall) == true || detectHit(ball.cmpTransform.local.translation, leftWall) == true) {
            pong.removeChild(ball);
        }

        if (detectHit(ball.cmpTransform.local.translation, paddleLeft) == true || detectHit(ball.cmpTransform.local.translation, paddleRight) == true) {
            randomX = - randomX;
            ballSpeed = new fudge.Vector3(randomX, randomY, 0);
        }
        

        fudge.RenderManager.update();
        viewport.draw();
    }

    function moveBall(): void {
        /** MOVING BALL **/
        ball.cmpTransform.local.translate(ballSpeed);

        if (ball.cmpTransform.local.translation.x > canvasLength || ball.cmpTransform.local.translation.x < - canvasLength) {
           randomX = - randomX;
           ballSpeed = new fudge.Vector3(randomX, randomY, 0);
        }

        if (ball.cmpTransform.local.translation.y > canvasHeight || ball.cmpTransform.local.translation.y < - canvasHeight) {
            randomY = - randomY;
            ballSpeed = new fudge.Vector3(randomX, randomY, 0);
        }
    }

    function getSign(): number {
        return Math.random() < 0.5 ? -1 : 1; //Math.random returns a number between 0 and 1, thats why I need the getSign function
    }

    function detectHit(position: fudge.Vector3, collisionObject: fudge.Node): boolean {

        let collisionObjectScaling: fudge.Vector3 = (<fudge.ComponentMesh> collisionObject.getComponent(fudge.ComponentMesh)).pivot.scaling;
        let collisionObjectPosition: fudge.Vector3 = collisionObject.cmpTransform.local.translation;

        let verticeTopLeft: fudge.Vector3 = new fudge.Vector3 (collisionObjectPosition.x - (collisionObjectScaling.x / 2), collisionObjectPosition.y - (collisionObjectScaling.y / 2), 0);
        let verticeBottomRight: fudge.Vector3 = new fudge.Vector3 (collisionObjectPosition.x + (collisionObjectScaling.x / 2), collisionObjectPosition.y + (collisionObjectScaling.y / 2), 0);

        if (position.x > verticeTopLeft.x && position.x < verticeBottomRight.x) {
            if (position.y > verticeTopLeft.y && position.y < verticeBottomRight.y) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function createPong(): fudge.Node {
    
        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();

        let coat: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink: fudge.Material = new fudge.Material("HotPink", fudge.ShaderUniColor, coat);
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let mtrSolidBlack: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 0, 1)));

        ball = createQuad("Ball", meshQuad, mtrSolidWhite, 0.75, 0.75, 0, 0);
        paddleLeft = createQuad("PaddleLeft", meshQuad, mtrSolidWhite, 5, 0.5, -8.5, 0);
        paddleRight = createQuad("PaddleRight", meshQuad, mtrSolidWhite, 5, 0.5, 8.5, 0);
        topWall = createQuad("TopWall", meshQuad, mtrSolidBlack, 1, 20, 0, 7);
        bottomWall = createQuad("BottomWall", meshQuad, mtrSolidBlack, 1, 20, 0, -7); 
        leftWall = createQuad("LeftWall", meshQuad, mtrSolidBlack, 20, 1, -9.5, 0);
        rightWall = createQuad("RightWall", meshQuad, mtrSolidBlack, 20, 1, 9.5, 0); 

        /** append children **/
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(topWall);
        pong.appendChild(bottomWall);
        pong.appendChild(leftWall);
        pong.appendChild(rightWall);

        return pong;
    }

    function handleKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }

    function handleKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function createQuad(name: string, meshQuad: fudge.MeshQuad, material: fudge.Material, scaleX: number, scaleY: number, translateX: number, translateY: number): fudge.Node {
        let node: fudge.Node = new fudge.Node(name);

        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(material);

        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(new fudge.ComponentTransform());

        //paddleRight.cmpTransform.local.scaleY(5); --> verzerrt Koordinatensystem
        (<fudge.ComponentMesh> node.getComponent(fudge.ComponentMesh)).pivot.scaleY(scaleX); 
        (<fudge.ComponentMesh> node.getComponent(fudge.ComponentMesh)).pivot.scaleX(scaleY);

        node.cmpTransform.local.translateX(translateX);
        node.cmpTransform.local.translateY(translateY);

        return node;
    }
}