"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        /** NODES **/
        let parentNode = new fudge.Node("Parent");
        let node = new fudge.Node("Quad");
        let nodePlayer = new fudge.Node("PlayerQuad");
        let nodePlayer2 = new fudge.Node("Player2Quad");
        parentNode.appendChild(node);
        parentNode.appendChild(nodePlayer);
        parentNode.appendChild(nodePlayer2);
        let mesh = new fudge.MeshQuad();
        let coat = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink = new fudge.Material("HotPink", fudge.ShaderUniColor, coat);
        let coat2 = new fudge.CoatColored(new fudge.Color(1, 1, 1, 1));
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, coat2);
        /** BALL **/
        let cmpMesh = new fudge.ComponentMesh(mesh);
        cmpMesh.pivot.translate(new fudge.Vector3(0, 0, 0));
        cmpMesh.pivot.scale(new fudge.Vector3(0.5, 0.5, 0.5));
        node.addComponent(cmpMesh);
        let cmpMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        /** PLAYER **/
        let cmpMeshPlayer = new fudge.ComponentMesh(mesh);
        cmpMeshPlayer.pivot.translate(new fudge.Vector3(2, 0, 0));
        cmpMeshPlayer.pivot.scale(new fudge.Vector3(1, 2, 1));
        nodePlayer.addComponent(cmpMeshPlayer);
        let cmpMaterialPlayer = new fudge.ComponentMaterial(mtrHotPink);
        nodePlayer.addComponent(cmpMaterialPlayer);
        /** PLAYER2 **/
        let cmpMeshPlayer2 = new fudge.ComponentMesh(mesh);
        cmpMeshPlayer2.pivot.translate(new fudge.Vector3(-2, 0, 0));
        cmpMeshPlayer2.pivot.scale(new fudge.Vector3(1, 2, 1));
        nodePlayer2.addComponent(cmpMeshPlayer2);
        let cmpMaterialPlayer2 = new fudge.ComponentMaterial(mtrHotPink);
        nodePlayer2.addComponent(cmpMaterialPlayer2);
        /** CAMERA **/
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 6));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));
        L02_FirstFudge.viewport = new fudge.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        fudge.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map