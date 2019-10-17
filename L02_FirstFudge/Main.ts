namespace L02_FirstFudge {
    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);
    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        let parentNode: fudge.Node = new fudge.Node("Parent");
        let node: fudge.Node = new fudge.Node("Cube");
        let pyramidNode: fudge.Node = new fudge.Node("Pyramid");
        parentNode.appendChild(node);
        parentNode.appendChild(pyramidNode);

        let mesh: fudge.MeshCube = new fudge.MeshCube();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        cmpMesh.pivot.translate(new fudge.Vector3(0, 0, 0));
        node.addComponent(cmpMesh);
 
        let pyramidMesh: fudge.MeshPyramid = new fudge.MeshPyramid();
        let pyramidCmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(pyramidMesh);
        pyramidCmpMesh.pivot.translate(new fudge.Vector3(1, 1, 3));
        pyramidNode.addComponent(pyramidCmpMesh); 

        let coat: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, coat);
        let cmpColor: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);
        node.addComponent(cmpColor);
        //pyramidNode.addComponent(cmpColor); 
 
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(3, 3, 10));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();
    }
}