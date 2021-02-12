// Menu

// Functions
function openMenu() {
    const menu = document.getElementById('menu');
    menu.setAttribute('visible', 'true');
    menu.setAttribute('position', '' + currentSphere.object3D.position.x + ' ' + (currentSphere.object3D.position.y - .5) + ' ' + (currentSphere.object3D.position.z - 1));
    menu.dispatchEvent(new CustomEvent('open'));

    const menuIcon = document.getElementById('open-menu');
    menuIcon.dispatchEvent(new CustomEvent('close'));
    // menuIcon.setAttribute('visible', 'false');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.dispatchEvent(new CustomEvent('close'));
    // menu.setAttribute('visible', 'false'); // Set invisible by animation

    const menuIcon = document.getElementById('open-menu');
    menuIcon.dispatchEvent(new CustomEvent('open'));
    menuIcon.setAttribute('visible', 'true');
}

// Components
// Open menu
AFRAME.registerComponent('menu-open', {

    init: function () {
        this.el.addEventListener('click', function () {
            openMenu();
        });
    },

    tick: function () {
        this.el.object3D.position.setFromMatrixPosition(document.getElementById('menu-open-position').object3D.matrixWorld);
        this.el.object3D.position.y = -.9;
    }
});

// Close menu
AFRAME.registerComponent('menu-close', {

    init: function () {
        this.el.addEventListener('click', function () {
            closeMenu();
        });
    },
});

// Button: Map
AFRAME.registerComponent('menu-open-map', {

    init: function () {
        this.el.addEventListener('click', function () {
            closeMenu();
            openMap();
        });
    },
});
