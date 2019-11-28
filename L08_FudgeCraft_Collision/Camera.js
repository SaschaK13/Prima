"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var fudge = FudgeCore;
    let parent = new fudge.Node("Parent");
    window.addEventListener("scroll", hndScroll);
    L08_FudgeCraft_Collision.cmpCamera = new fudge.ComponentCamera();
    L08_FudgeCraft_Collision.cmpCamera.pivot.translate(new fudge.Vector3(4, 6, 20));
    L08_FudgeCraft_Collision.cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    L08_FudgeCraft_Collision.cmpCamera.backgroundColor = fudge.Color.WHITE;
    function hndScroll(_event) {
        L08_FudgeCraft_Collision.cmpCamera.pivot.translate(new fudge.Vector3(4, 6, 30));
        fudge.Debug.log(L08_FudgeCraft_Collision.cmpCamera);
        L08_FudgeCraft_Collision.viewport.draw();
    }
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Camera.js.map