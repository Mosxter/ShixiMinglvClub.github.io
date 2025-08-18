export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        
    }

    create() {
        var click_count = 0;
        this.input.on('pointerdown', function (pointer) {
            const touchX = pointer.x;
            const touchY = pointer.y;

            const effect_center_rectangle_in_lines = [
                () => Center_Rectangle_In_Lines_1.call(this),
                () => Center_Rectangle_In_Lines_2.call(this),
                () => Center_Rectangle_In_Lines_3.call(this),
                () => Center_Rectangle_In_Lines_4.call(this)
            ];

            var run_effect_center_rectangle_in_lines = Phaser.Math.RND.pick(effect_center_rectangle_in_lines);

            const effect_center_particles = [
            () => Center_Arc.call(this),
            () => Center_Circle_1.call(this),
            //() => Center_Circle_2.call(this),
            () => Center_Rectangle_1.call(this),
            () => Center_Rectangle_2.call(this),
            () => run_effect_center_rectangle_in_lines()
            ];

            /*runEffect = Phaser.Math.RND.pick(effect_center_particles);
            runEffect();*/

            const pickN = 2;
            const chosen = Phaser.Utils.Array.Shuffle([...effect_center_particles]).slice(0, pickN);
            chosen.forEach(fn => fn());

            click_count++;
            if (click_count % 8 == 1) Change_Background.call(this);

            //Click_Circle
            /*var circle = this.add.circle(touchX, touchY, 10, 0x000000, 0);
            circle.setStrokeStyle(25, 0xffffff, 1);
            this.tweens.add({
                targets: circle,
                radius: 500,
                lineWidth: 0,
                duration: 1000,
                ease: 'Sine.out',
                loop: 0,
                onComplete: () => circle.destroy()*/

            /*var circle = this.add.circle(vw / 2, vh / 2, 0, 0x000000, 0);
            circle.setStrokeStyle(50, 0xffffff, 1);
            this.tweens.add({
                targets: circle,
                radius: size_std_min / 2,
                lineWidth: 0,
                duration: 1000,
                ease: 'Sine.out',
                loop: 0,
                onComplete: () => circle.destroy()
            });

            //Click_Rectangle
            for (var i = 0; i < 10; i++) {
                let square = this.add.rectangle(touchX, touchY, 50, 50, 0x000000, 0);
                square.setStrokeStyle(10, 0xffffff, 1);
                this.tweens.add({
                    targets: square,
                    x: touchX + rnd.between(-300, 300),
                    y: touchY + rnd.between(-300, 300),
                    scaleX: 0,
                    scaleY: 0,
                    duration: 500,
                    ease: 'Sine.out',
                    loop: 0,
                    onComplete: () => square.destroy()
                });
            }*/
        }, this);

        var gameSize = this.scale.gameSize;
        var vw = gameSize.width;
        var vh = gameSize.height;
        var size_std_min = vw <= vh ? vw : vh;
        var size_std_max = vw >= vh ? vw : vh;

        var rnd = Phaser.Math.RND;

        //Change_Background
        //1 from left to right
        function Change_Background() {
            const r = Phaser.Math.Between(0, 128);
            const g = Phaser.Math.Between(0, 128);
            const b = Phaser.Math.Between(0, 128);
            const color = Phaser.Display.Color.GetColor(r, g, b);
            var rectangle;

            switch(rnd.between(1, 4)) {
                case 1:
                    rectangle = this.add.rectangle(-vw / 2, vh / 2, vw, 3 * vh, color, 1);
                    break;
                case 2:
                    rectangle = this.add.rectangle(vw * 1.5, vh / 2, vw, 3 * vh, color, 1);
                    break;
                case 3:
                    rectangle = this.add.rectangle(vw / 2, -vh / 2, 3 * vw, vh, color, 1);
                    break;
                case 4:
                    rectangle = this.add.rectangle(vw / 2, vh * 1.5, 3 * vw, vh, color, 1);
                    break;
            }
            rectangle.angle = rnd.between(-30, 30);
            this.tweens.add({
                targets: rectangle,
                x: vw / 2,
                y: vh / 2,
                duration: 500,
                ease: 'Sine.out',
                loop: 0
            });
            this.tweens.add({
                targets: rectangle,
                angle: 0,
                duration: 500,
                ease: 'Sine.in',
                loop: 0,
                onComplete: () => {
                    this.cameras.main.setBackgroundColor(color);
                    this.time.delayedCall(2000, () => {
                        rectangle.destroy();
                    });
                }
            });
        }
        
        //Center_Arc
        function Center_Arc() {
            var start_angle = rnd.between(0, 360);
            var end_angle = start_angle;
            var radius = rnd.between(size_std_min / 4, size_std_min / 7);
            var arc = this.add.arc(vw / 2, vh / 2, radius, start_angle, end_angle, true);
            const r = Phaser.Math.Between(0, 128);   // 0~128
            const g = 0;                             // 或 Phaser.Math.Between(0, 32)
            const b = 255;
            const color = Phaser.Display.Color.GetColor(r, g, b); // 得到 0xRRGGBB
            arc.setFillStyle(color, 1);
            this.tweens.add({
                targets: arc,
                startAngle: start_angle + 360,
                duration: 250,
                ease: 'Sine.out',
                loop: 0
            });
            this.tweens.add({
                targets: arc,
                endAngle: end_angle + 360,
                duration: 250,
                delay: 200,
                ease: 'Sine.out',
                loop: 0,
                onComplete: () => arc.destroy()
            }); 
        }

        //Center_Circle
        //1 from center to sides
        function Center_Circle_1() {
            for (var i = 0; i < 10; i++) {
                const r = Phaser.Math.Between(128, 255);
                const g = Phaser.Math.Between(128, 255);
                const b = Phaser.Math.Between(128, 255);

                const color = Phaser.Display.Color.GetColor(r, g, b); // 得到 0xRRGGBB
                let circle = this.add.circle(vw / 2, vh / 2, 50, color, 0);
                circle.setStrokeStyle(5, color, 1);
                var x = rnd.between(0, vw);
                var y = rnd.between(0, vh);

                circle.angle = Phaser.Math.RadToDeg(Math.atan2(y - vh / 2, x - vw / 2)) + 45;

                this.tweens.add({
                    targets: circle,
                    x: x,
                    y: y,
                    duration: 500,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.time.delayedCall(rnd.between(500, 700), () => circle.destroy());
            }
        }

        //2 from center grow bigger
        function Center_Circle_2() {
            var circle = this.add.circle(vw / 2, vh / 2, 0, 0x000000, 0);
            circle.setStrokeStyle(50, 0xffffff, 1);
            this.tweens.add({
                targets: circle,
                radius: size_std_max / 2,
                lineWidth: 0,
                duration: 500,
                ease: 'Power2',
                loop: 0,
                onComplete: () => circle.destroy()
            });
        }

        //Center_Rectangle
        //1 from center to sides
        function Center_Rectangle_1() {
            for (var i = 0; i < 10; i++) {
                const r = Phaser.Math.Between(128, 255);
                const g = Phaser.Math.Between(128, 255);
                const b = Phaser.Math.Between(128, 255);
                const color = Phaser.Display.Color.GetColor(r, g, b); // 得到 0xRRGGBB

                let rectangle = this.add.rectangle(vw / 2, vh / 2, 50, 50, color, 1);
                var x = rnd.between(0, vw);
                var y = rnd.between(0, vh);

                rectangle.angle = Phaser.Math.RadToDeg(Math.atan2(y - vh / 2, x - vw / 2)) + 45;

                this.tweens.add({
                    targets: rectangle,
                    x: x,
                    y: y,
                    duration: 500,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.time.delayedCall(rnd.between(500, 700), () => rectangle.destroy());
            }
        }

        //2 appears right in place
        function Center_Rectangle_2() {
            for (var i = 0; i < 10; i++) {
                const r = Phaser.Math.Between(128, 255);
                const g = Phaser.Math.Between(128, 255);
                const b = Phaser.Math.Between(128, 255);
                const color = Phaser.Display.Color.GetColor(r, g, b); // 得到 0xRRGGBB

                var x = rnd.between(0, vw);
                var y = rnd.between(0, vh);
                var size = rnd.between(60, 100);

                let rectangle = this.add.rectangle(x, y, size, size, color, 0);
                rectangle.setStrokeStyle(5, color, 1);
                rectangle.scale = 0;
                rectangle.angle = 30;
                
                this.tweens.add({
                    targets: rectangle,
                    angle: 0,
                    scale: 1,
                    duration: 500,
                    ease: 'Back.out',
                    loop: 0
                });
                this.tweens.add({
                    targets: rectangle,
                    angle: -30,
                    scale: 0,
                    duration: 500,
                    delay: 500,
                    ease: 'Back.in',
                    loop: 0,
                    onComplete: () => rectangle.destroy()
                });
            }
        }

        //Center rectangles in lines
        //1 from left to right
        function Center_Rectangle_In_Lines_1() {
            const lines = rnd.between(4, 7);
            const height_change = rnd.between(0, 6);
            const order = rnd.between(0, 1);
            for (var i = 0; i < lines; i++) {
                var x = vw / 4;
                var height = vh / 2 / lines;
                var y = vh / 4 + (order ? (lines - 1 - i) : i) * height;
                var visual_height = vh / 2 / (lines + 1 + height_change);
                let rectangle = this.add.rectangle(x, y + (height - visual_height) / 2, 0, visual_height, 0xffffff, 1);

                this.tweens.add({
                    targets: rectangle,
                    width: vw / 2,
                    duration: 250,
                    delay: 100 * i,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.tweens.add({
                    targets: rectangle,
                    width: 0,
                    x: vw * 0.75,
                    duration: 250,
                    delay: 250 + 100 * i,
                    ease: 'Sine.out',
                    loop: 0,
                    onComplete: () => rectangle.destroy()
                });
            }
        }

        //2 from right to left
        function Center_Rectangle_In_Lines_2() {
            const lines = rnd.between(4, 7);
            const height_change = rnd.between(0, 6);
            const order = rnd.between(0, 1);
            for (var i = 0; i < lines; i++) {
                var x = vw / 4 * 3;
                var height = vh / 2 / lines;
                var y = vh / 4 + (order ? (lines - 1 - i) : i) * height;
                var visual_height = vh / 2 / (lines + 1 + height_change);
                let rectangle = this.add.rectangle(x, y + (height - visual_height) / 2, 0, visual_height, 0xffffff, 1);

                this.tweens.add({
                    targets: rectangle,
                    x: vw / 4,
                    width: vw / 2,
                    duration: 250,
                    delay: 100 * i,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.tweens.add({
                    targets: rectangle,
                    width: 0,
                    duration: 250,
                    delay: 250 + 100 * i,
                    ease: 'Sine.out',
                    loop: 0,
                    onComplete: () => rectangle.destroy()
                });
            }
        }

        //3 from top to bottom
        function Center_Rectangle_In_Lines_3() {
            const lines = rnd.between(7, 11);
            const width_change = rnd.between(0, 6);
            const order = rnd.between(0, 1);
            for (var i = 0; i < lines; i++) {
                var width = vw / 2 / lines;
                var x = vw / 4 + (order ? (lines - 1 - i) : i) * width;
                var y = vh / 4;
                var visual_width = vw / 2 / (lines + 1 + width_change);
                let rectangle = this.add.rectangle(x + (width - visual_width) / 2, y, visual_width, 0, 0xffffff, 1);

                this.tweens.add({
                    targets: rectangle,
                    height: vh / 2,
                    duration: 250,
                    delay: 100 * i,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.tweens.add({
                    targets: rectangle,
                    y: vh / 4 * 3,
                    height: 0,
                    duration: 250,
                    delay: 250 + 100 * i,
                    ease: 'Sine.out',
                    loop: 0,
                    onComplete: () => rectangle.destroy()
                });
            }
        }

        //4 from bottom to top
        function Center_Rectangle_In_Lines_4() {
            const lines = rnd.between(7, 11);
            const width_change = rnd.between(0, 6);
            const order = rnd.between(0, 1);
            for (var i = 0; i < lines; i++) {
                var width = vw / 2 / lines;
                var x = vw / 4 + (order ? (lines - 1 - i) : i) * width;
                var y = vh / 4 * 3;
                var visual_width = vw / 2 / (lines + 1 + width_change);
                let rectangle = this.add.rectangle(x + (width - visual_width) / 2, y, visual_width, 0, 0xffffff, 1);

                this.tweens.add({
                    targets: rectangle,
                    y: vh / 4,
                    height: vh / 2,
                    duration: 250,
                    delay: 100 * i,
                    ease: 'Sine.out',
                    loop: 0
                });
                this.tweens.add({
                    targets: rectangle,
                    height: 0,
                    duration: 250,
                    delay: 250 + 100 * i,
                    ease: 'Sine.out',
                    loop: 0,
                    onComplete: () => rectangle.destroy()
                });
            }
        }

        //3 from center to side
        /*function Center_Rectangle_3() {
            for (let i = 0; i < 19; i++) {
                this.time.delayedCall(50 * i, () => {
                    for (let j = 0; j < 2; j++) {
                        const dir = Phaser.Math.DegToRad(30 * i - 90 + 180 * j);
                        const { width, height } = this.scale;
                        const cx = width / 2 + Math.cos(dir) * size_std_max / 10;
                        const cy = height / 2 + Math.sin(dir) * size_std_max / 10;

                        let rect = this.add.rectangle(cx, cy, size_std_max / 5, size_std_max / 25, 0xffffff).setOrigin(0.5);

                        rect.rotation = dir;
                        const tx  = cx + Math.cos(dir) * size_std_max / 2;
                        const ty  = cy + Math.sin(dir) * size_std_max / 2;

                        // 位移 + 自身旋转
                        this.tweens.add({
                            targets: rect,
                            x: tx,
                            y: ty,
                            width: 0,
                            duration: 800,
                            ease: 'Power2',
                            onComplete: () => rect.destroy()
                        });
                    }
                });
            }
        }*/
    }

    update() {
        
    }
}
