"use strict";
var L10_FudgeCraft_DetectCombos;
(function (L10_FudgeCraft_DetectCombos) {
    function test() {
        testGrid();
    }
    L10_FudgeCraft_DetectCombos.test = test;
    function testGrid() {
        let cube = new L10_FudgeCraft_DetectCombos.Cube(L10_FudgeCraft_DetectCombos.CUBE_TYPE.GREEN, L10_FudgeCraft_DetectCombos.fudge.Vector3.ZERO());
        L10_FudgeCraft_DetectCombos.grid.push(cube.cmpTransform.local.translation, new L10_FudgeCraft_DetectCombos.GridElement(cube));
        let pulled = L10_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L10_FudgeCraft_DetectCombos.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L10_FudgeCraft_DetectCombos.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L10_FudgeCraft_DetectCombos || (L10_FudgeCraft_DetectCombos = {}));
//# sourceMappingURL=Test.js.map