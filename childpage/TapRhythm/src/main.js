import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'TapRhythm',
    description: '',
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 1600,
            height: 900
        },
        max: {
            width: 1920,
            height: 1080
        },
        zoom: 1
    }
}

new Phaser.Game(config);
            