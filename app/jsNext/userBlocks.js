function initUserCanvas(userCanvas, userCanvasSets) {
	userCanvas.width = userCanvasSets.dimension;
	userCanvas.height = userCanvasSets.dimension;

	userCanvasSets.buttons.clearField.onclick = clearField.bound(null, userCanvas, userCanvasSets);
	userCanvasSets.buttons.undo.onclick = undoUserCanvasAction.bound(null, userCanvas, userCanvasSets.currentDraw);
	userCanvasSets.buttons.submit.onclick = submitUserCanvasDraw.bound(null, userCanvas, userCanvasSets.currentDraw);
}


initUserCanvas(userCanvas, userCanvasSets);