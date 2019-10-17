namespace L02_FirstFudge {
    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);
    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        /** NODES **/
        let parentNode: fudge.Node = new fudge.Node("Parent");
        let node: fudge.Node = new fudge.Node("Quad");
        let nodePlayer: fudge.Node = new fudge.Node("PlayerQuad");
        let nodePlayer2: fudge.Node = new fudge.Node("Player2Quad");

        parentNode.appendChild(node);
        parentNode.appendChild(nodePlayer);
        parentNode.appendChild(nodePlayer2);

        let mesh: fudge.MeshQuad = new fudge.MeshQuad();

        let coat: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink: fudge.Material = new fudge.Material("HotPink", fudge.ShaderUniColor, coat);

        let coat2: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 1, 1, 1));
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, coat2);

        /** BALL **/
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        cmpMesh.pivot.translate(new fudge.Vector3(0, 0, 0));
        cmpMesh.pivot.scale(new fudge.Vector3(0.5, 0.5, 0.5));

        node.addComponent(cmpMesh);

        let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        node.addComponent(cmpMaterial);

        /** PLAYER **/
        let cmpMeshPlayer: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        cmpMeshPlayer.pivot.translate(new fudge.Vector3(2, 0, 0));
        cmpMeshPlayer.pivot.scale(new fudge.Vector3(1, 2, 1));

        nodePlayer.addComponent(cmpMeshPlayer);

        let cmpMaterialPlayer: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);

        nodePlayer.addComponent(cmpMaterialPlayer);

        /** PLAYER2 **/
        let cmpMeshPlayer2: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        cmpMeshPlayer2.pivot.translate(new fudge.Vector3(-2, 0, 0));
        cmpMeshPlayer2.pivot.scale(new fudge.Vector3(1, 2, 1));
  
        nodePlayer2.addComponent(cmpMeshPlayer2);

        let cmpMaterialPlayer2: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);

        nodePlayer2.addComponent(cmpMaterialPlayer2);

        /** CAMERA **/ 
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 6));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();
    }
}