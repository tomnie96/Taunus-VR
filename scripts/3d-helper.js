// Check visibility
// From: https://gist.github.com/Strae/7def0f84677e03727f771636709b448f
function checkIfVisible(entity) {

    let entityMesh = entity.object3DMap.mesh;
    let frustum = new THREE.Frustum();
    let cameraViewProjectionMatrix = new THREE.Matrix4();

    // Get camera
    let camera = document.querySelector("[camera]").getObject3D('camera');

    // Update camera attributes
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    // Set limited FoV
    camera = camera.clone();
    camera.aspect = .5; // Reduced from 1
    camera.fov = 60; // Reduced from 80
    // camera.zoom = 4; // Alt variant to reduce fov

    camera.updateProjectionMatrix();

    // camera.matrixWorldInverse.getInverse(camera.matrixWorld);
    cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    return frustum.intersectsObject(entityMesh);
}
