"use strict";
var L03_LongPaddels;
(function (L03_LongPaddels) {
    var fudge = FudgeCore;
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
        L03_LongPaddels.viewport = new fudge.Viewport();
        L03_LongPaddels.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(L03_LongPaddels.viewport);
        L03_LongPaddels.viewport.draw();
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
})(L03_LongPaddels || (L03_LongPaddels = {}));
//# sourceMappingURL=Main.js.map