namespace L08_FudgeCraft_Collision {
    import fudge = FudgeCore;

    let parent: fudge.Node = new fudge.Node("Parent");

    window.addEventListener("scroll", hndScroll);

    export let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translate(new fudge.Vector3(4, 6, 20));
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.WHITE;

    function hndScroll(_event: Event): void {
        cmpCamera.pivot.translate(new fudge.Vector3(4, 6, 30));

        fudge.Debug.log(cmpCamera);
    
        viewport.draw();
    }
}

