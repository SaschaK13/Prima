namespace L02_FirstFudge {
    import fudge = FudgeCore;

    window.addEventListener("load", handleLoad);
    export let viewport: fudge.Viewport;

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        let node: fudge.Node = new fudge.Node("Quad");

        let mesh: fudge.MeshQuad = new fudge.MeshQuad();
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let coat: fudge.CoatColored = new fudge.CoatColored(new fudge.Color(1, 0, 1, 1));
        let mtrHotPink: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, coat);
        let cmpColor: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrHotPink);
        node.addComponent(cmpColor);

        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 3));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        viewport.draw();
    }
}