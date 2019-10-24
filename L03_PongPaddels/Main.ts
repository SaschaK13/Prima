namespace L03_LongPaddels {
    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);

    export let viewport: fudge.Viewport;

    let ball: fudge.Node = new fudge.Node("Ball");
    let paddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
    let paddleRight: fudge.Node = new fudge.Node("PaddleRight");

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        let pong: fudge.Node = createPong();

        /** CAMERA **/ 
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 20));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        /** POSITIONING **/
        paddleRight.cmpTransform.local.translateX(9);
        paddleLeft.cmpTransform.local.translateX(-9);
       

        /** SCALING **/
        //paddleRight.cmpTransform.local.scaleY(5); --> verzerrt Koordinatensystem
        (<fudge.ComponentMesh> paddleRight.getComponent(fudge.ComponentMesh)).pivot.scaleY(5);
        (<fudge.ComponentMesh> paddleLeft.getComponent(fudge.ComponentMesh)).pivot.scaleY(5); //like "as"

        /** VIEWPORT **/
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        document.addEventListener("keydown", movePaddels);

        viewport.draw();
    }

    function createPong(): fudge.Node {
        let pong: fudge.Node = new fudge.Node("Pong");
    
        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();

        let coat: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink: fudge.Material = new fudge.Material("HotPink", fudge.ShaderUniColor, coat);
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));

        /** BALL **/
        let cmpMeshBall: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialBall: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        ball.addComponent(cmpMeshBall);
        ball.addComponent(cmpMaterialBall);
        ball.addComponent(new fudge.ComponentTransform());

        /** PADDLELEFT **/
        let cmpMeshPadddleLeft: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleLeft: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);

        paddleLeft.addComponent(cmpMeshPadddleLeft);
        paddleLeft.addComponent(cmpMaterialPaddleLeft);
        paddleLeft.addComponent(new fudge.ComponentTransform());

        /** PADDLERIGHT **/
        let cmpMeshPaddleRight: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleRight: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);

        paddleRight.addComponent(cmpMeshPaddleRight);
        paddleRight.addComponent(cmpMaterialPaddleRight);
        paddleRight.addComponent(new fudge.ComponentTransform());

        /** append children **/
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);

        return pong;
    }

    function movePaddels(_event: KeyboardEvent): void {
        switch (_event.code) {
            case fudge.KEYBOARD_CODE.ARROW_UP:
                paddleRight.cmpTransform.local.translateY(0.5);
                break;
            case fudge.KEYBOARD_CODE.ARROW_DOWN:
                paddleRight.cmpTransform.local.translateY(-0.5);
                break;
            case fudge.KEYBOARD_CODE.W:
                paddleLeft.cmpTransform.local.translateY(0.5);
                break;
            case fudge.KEYBOARD_CODE.S:
                paddleLeft.cmpTransform.local.translateY(-0.5);
                break;
        }
        fudge.RenderManager.update();
        viewport.draw();
    }
}