"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        let parentNode = new fudge.Node("Parent");
        let node = new fudge.Node("Cube");
        let pyramidNode = new fudge.Node("Pyramid");
        parentNode.appendChild(node);
        parentNode.appendChild(pyramidNode);
        let mesh = new fudge.MeshCube();
        let cmpMesh = new fudge.ComponentMesh(mesh);
        cmpMesh.pivot.translate(new fudge.Vector3(0, 0, 0));
        node.addComponent(cmpMesh);
        let pyramidMesh = new fudge.MeshPyramid();
        let pyramidCmpMesh = new fudge.ComponentMesh(pyramidMesh);
        pyramidCmpMesh.pivot.translate(new fudge.Vector3(1, 1, 3));
        pyramidNode.addComponent(pyramidCmpMesh);
        let coat = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink = new fudge.Material("SolidWhite", fudge.ShaderUniColor, coat);
        let cmpColor = new fudge.ComponentMaterial(mtrHotPink);
        node.addComponent(cmpColor);
        //pyramidNode.addComponent(cmpColor); 
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(3, 3, 10));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));
        L02_FirstFudge.viewport = new fudge.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        fudge.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map