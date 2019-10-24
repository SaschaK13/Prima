"use strict";
var L04_PongAnimated;
(function (L04_PongAnimated) {
    var fudge = FudgeCore;
    let keysPressed = {};
    window.addEventListener("load", handleLoad);
    let ball = new fudge.Node("Ball");
    let paddleLeft = new fudge.Node("PaddleLeft");
    let paddleRight = new fudge.Node("PaddleRight");
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        let pong = createPong();
        /** CAMERA **/
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 20));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));
        /** POSITIONING **/
        paddleRight.cmpTransform.local.translateX(9);
        paddleLeft.cmpTransform.local.translateX(-9);
        /** SCALING **/
        //paddleRight.cmpTransform.local.scaleY(5); --> verzerrt Koordinatensystem
        paddleRight.getComponent(fudge.ComponentMesh).pivot.scaleY(5);
        paddleLeft.getComponent(fudge.ComponentMesh).pivot.scaleY(5); //like "as"
        /** VIEWPORT **/
        L04_PongAnimated.viewport = new fudge.Viewport();
        L04_PongAnimated.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(L04_PongAnimated.viewport);
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);
        L04_PongAnimated.viewport.draw();
        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function update(_event) {
        //fudge.Debug.log(keysPressed);
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
        ball.cmpTransform.local.translateX(0.05);
        fudge.RenderManager.update();
        L04_PongAnimated.viewport.draw();
    }
    function createPong() {
        let pong = new fudge.Node("Pong");
        let meshQuad = new fudge.MeshQuad();
        let coat = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink = new fudge.Material("HotPink", fudge.ShaderUniColor, coat);
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        /** BALL **/
        let cmpMeshBall = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialBall = new fudge.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cmpMeshBall);
        ball.addComponent(cmpMaterialBall);
        ball.addComponent(new fudge.ComponentTransform());
        /** PADDLELEFT **/
        let cmpMeshPadddleLeft = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleLeft = new fudge.ComponentMaterial(mtrHotPink);
        paddleLeft.addComponent(cmpMeshPadddleLeft);
        paddleLeft.addComponent(cmpMaterialPaddleLeft);
        paddleLeft.addComponent(new fudge.ComponentTransform());
        /** PADDLERIGHT **/
        let cmpMeshPaddleRight = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleRight = new fudge.ComponentMaterial(mtrHotPink);
        paddleRight.addComponent(cmpMeshPaddleRight);
        paddleRight.addComponent(cmpMaterialPaddleRight);
        paddleRight.addComponent(new fudge.ComponentTransform());
        /** append children **/
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function handleKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function handleKeydown(_event) {
        keysPressed[_event.code] = true;
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
//# sourceMappingURL=Main.js.map