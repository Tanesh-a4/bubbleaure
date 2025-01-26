class Example extends Phaser.Scene {
    constructor() {
        super();
        this.currentRound = 1;
        this.player1Wins = 0;
        this.player2Wins = 0;
    }

    preload() {
        this.load.image('animatedBackground', 'https://play.rosebud.ai/assets/1stscene.jpg?a3NK');
        this.load.image('animatedBackground2', 'https://play.rosebud.ai/assets/2ndscene.jpeg?gmK4');
        this.load.image('animatedBackground3', 'https://play.rosebud.ai/assets/3rdscene.jpg?3GzQ');
        this.load.image('animatedBackground4', 'https://play.rosebud.ai/assets/4thconc.png?z4bb');
        // this.load.svg('animatedBackground', 'assets/animated-background.svg');
        // this.load.image('bubbleBackground', 'https://play.rosebud.ai/assets/freepik__the-style-is-candid-image-photography-with-natural__52872.png?gqXF');
        this.load.image('red', `https://play.rosebud.ai/assets/red.png?pD6R`);
        this.load.image('apple', 'https://play.rosebud.ai/assets/apple_without_Shadow.png?72VQ');
        // Load round-specific audio
        this.load.audio('round1_music', 'https://play.rosebud.ai/assets/1stsecne.mp3?SZoC');
        this.load.audio('round2_music', 'https://play.rosebud.ai/assets/2ndaudio.mp3?BWXY');
        this.load.audio('round3_music', 'https://play.rosebud.ai/assets/colosium.mp3?fZfF');
        this.load.audio('wedding_music', 'https://play.rosebud.ai/assets/wedding.mp3?CtYL');
        this.load.image('bubble1', 'https://play.rosebud.ai/assets/bubble1.png?O49p');
        this.load.image('crown', 'https://play.rosebud.ai/assets/winner crown.png?DH7I');

    }

    create() {
        // Create layered background effect
        const background = this.add.image(400, 300, 'animatedBackground');

        // Add night overlay for depth
        const nightOverlay = this.add.image(400, 300, 'night_02');
        nightOverlay.setAlpha(0.3);
        nightOverlay.setBlendMode(Phaser.BlendModes.MULTIPLY);

        // Create interactive background elements group
        this.backgroundElements = this.add.group();

        // Add floating orbs
        for (let i = 0; i < 8; i++) {
            const orb = this.add.circle(
                Phaser.Math.Between(100, 700),
                Phaser.Math.Between(100, 500),
                15,
                0xffffff,
                0.4
            );

            // Random movement pattern
            this.tweens.add({
                targets: orb,
                x: orb.x + Phaser.Math.Between(-100, 100),
                y: orb.y + Phaser.Math.Between(-100, 100),
                alpha: 0.2,
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: Phaser.Math.Between(0, 1000)
            });

            this.backgroundElements.add(orb);
        }

        // Add interactive background elements
        this.backgroundElements = this.add.group();

        // Add floating lights
        for (let i = 0; i < 5; i++) {
            const light = this.add.circle(
                Phaser.Math.Between(100, 700),
                Phaser.Math.Between(100, 500),
                20,
                0xffffff,
                0.3
            );

            this.tweens.add({
                targets: light,
                alpha: 0.1,
                scale: 1.5,
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.backgroundElements.add(light);
        }

        // Scale the background to fit the game width while maintaining aspect ratio
        const scaleX = 800 / background.width;
        const scaleY = 600 / background.height;
        const scale = Math.max(scaleX, scaleY);
        background.setScale(scale);
        // Add a slight parallax effect to the background
        this.background = background;

        // Add depth sorting
        background.setDepth(-1);
        //Show the story 
        // this.showStoryText("The Dance of Bubbles\n\nTwo magical bubbles meet in an enchanted garden,\nready to prove their worth through a friendly competition.\nThe winner shall lead the evening's bubble dance!", 4000);
        this.showStoryText("The hero's arrives at the outskirts of the castle. The battle of love begins !", 3000);
        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: {
                start: 1,
                end: 0
            },
            blendMode: 'ADD',
            tint: 0x3498DB // Set the tint to royal blue color (#3498DB)
        });

        // Create shimmering effects for both players
        this.createShimmerEffect(particles, 0x42e0f5); // Blue shimmer for player 1
        this.createShimmerEffect(particles, 0xff69b4); // Pink shimmer for player 2

        // Create the bubble character
        this.player1 = this.physics.add.sprite(200, 300, 'bubble1');
        this.player1.setCollideWorldBounds(true);

        // Add floating animation for player 1
        this.tweens.add({
            targets: this.player1,
            scaleX: 0.22,
            scaleY: 0.22,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        this.player1.setBounce(0.4);
        this.player1.setScale(0.2); // Starting scale (will be adjusted by health)
        this.player1.setCircle(150 * 0.2); // Adjust collision circle to match scale
        // Player 1 RPG properties
        this.player1.hp = 100;
        this.player1.maxHp = 100;
        this.player1.attack = 15;
        this.player1.defense = 10;
        this.player1.speed = 280;
        // Create player 2 bubble character
        this.player2 = this.physics.add.sprite(600, 300, 'bubble1');
        this.player2.setTint(0x00BFFF); // Set light blue tint for player 2 (deep sky blue)
        this.player2.setCollideWorldBounds(true);

        // Add floating animation for player 2
        this.tweens.add({
            targets: this.player2,
            scaleX: 0.22,
            scaleY: 0.22,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        this.player2.setBounce(0.4);
        this.player2.setScale(0.2); // Starting scale (will be adjusted by health)
        this.player2.setCircle(150 * 0.2); // Adjust collision circle to match scale
        // Player 2 RPG properties
        this.player2.hp = 100;
        this.player2.maxHp = 100;
        this.player2.attack = 12;
        this.player2.defense = 12;
        this.player2.speed = 260;
        // Add collision between players
        this.physics.add.collider(this.player1, this.player2, this.onPlayersCollide, null, this);
        // Add HP bars for both players
        this.player1HealthBar = this.add.rectangle(200, 260, 100, 10, 0x00ff00);
        this.player1HealthBar.setOrigin(0.5);
        this.player2HealthBar = this.add.rectangle(600, 260, 100, 10, 0x00ff00);
        this.player2HealthBar.setOrigin(0.5);
        // Add player names/labels
        this.player1Text = this.add.text(200, 240, 'Player 1', {
            fontSize: '16px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        this.player2Text = this.add.text(600, 240, 'Player 2', {
            fontSize: '16px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        // Add round and score display
        this.roundText = this.add.text(400, 30, 'Round 1/3', {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        this.scoreText = this.add.text(400, 60, 'Score: 0 - 0', {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        // Create separate emitters for each player
        const emitter1 = this.createShimmerEffect(particles, 0x42e0f5); // Blue shimmer
        const emitter2 = this.createShimmerEffect(particles, 0xFF69B4); // Pink shimmer

        // Make the emitters follow their respective players
        emitter1.startFollow(this.player1);
        emitter2.startFollow(this.player2);

        // Start the first round's music
        this.changeRoundMusic(1);
        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                // this.scene.start('new-scene');
                // this.switchScene();
            },
        });
        // Initialize power-up timer
        this.nextPowerUpSpawn = this.time.now + 5000;

        // Initialize special ability cooldowns
        this.player1.specialCooldown = false;
        this.player2.specialCooldown = false;

        // Add special ability keys
        this.player1Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.player2Special = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    spawnPowerUp() {
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);

        const powerUp = this.physics.add.image(x, y, 'apple').setScale(0.1);

        // Add warning flash when power-up is about to disappear
        const flashTween = this.tweens.add({
            targets: powerUp,
            alpha: 0.3,
            duration: 200,
            yoyo: true,
            repeat: 5,
            ease: 'Linear',
            paused: true
        });
        // Add floating animation
        this.tweens.add({
            targets: powerUp,
            y: y + 20,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add collision with players
        this.physics.add.overlap(powerUp, this.player1, () => this.collectPowerUp(this.player1, powerUp));
        this.physics.add.overlap(powerUp, this.player2, () => this.collectPowerUp(this.player2, powerUp));

        // Start warning flash at 7 seconds
        this.time.delayedCall(7000, () => {
            if (powerUp.active) {
                flashTween.play();
            }
        });
        // Destroy power-up after 8 seconds if not collected
        this.time.delayedCall(8000, () => {
            if (powerUp.active) {
                // Create a disappear effect
                const particles = this.add.particles('red');
                const emitter = particles.createEmitter({
                    x: powerUp.x,
                    y: powerUp.y,
                    speed: {
                        min: 50,
                        max: 100
                    },
                    scale: {
                        start: 0.2,
                        end: 0
                    },
                    alpha: {
                        start: 1,
                        end: 0
                    },
                    lifespan: 500,
                    quantity: 15
                });

                // Destroy the power-up and its particles
                powerUp.destroy();
                this.time.delayedCall(500, () => {
                    particles.destroy();
                });
            }
        });
    }

    collectPowerUp(player, powerUp) {
        powerUp.destroy();

        // Random power-up effect
        const effect = Phaser.Math.Between(1, 3);
        switch (effect) {
            case 1: // Temporary size increase
                player.setScale(player.scale * 1.5);
                player.attack += 10;
                this.time.delayedCall(5000, () => {
                    player.setScale(player.scale / 1.5);
                    player.attack -= 10;
                });
                break;
            case 2: // Speed boost
                player.speed += 100;
                this.time.delayedCall(5000, () => {
                    player.speed -= 100;
                });
                break;
            case 3: // Health restore
                player.hp = Math.min(player.maxHp, player.hp + 30);
                break;
        }
    }
    updateHealthBars() {
        // Update health bar sizes based on current HP
        const p1HealthPercent = this.player1.hp / this.player1.maxHp;
        const p2HealthPercent = this.player2.hp / this.player2.maxHp;

        this.player1HealthBar.width = 100 * p1HealthPercent;
        this.player2HealthBar.width = 100 * p2HealthPercent;

        // Update health bar colors based on remaining HP
        if (p1HealthPercent > 0.6) {
            this.player1HealthBar.setFillStyle(0x00ff00);
        } else if (p1HealthPercent > 0.3) {
            this.player1HealthBar.setFillStyle(0xffff00);
        } else {
            this.player1HealthBar.setFillStyle(0xff0000);
        }

        if (p2HealthPercent > 0.6) {
            this.player2HealthBar.setFillStyle(0x00ff00);
        } else if (p2HealthPercent > 0.3) {
            this.player2HealthBar.setFillStyle(0xffff00);
        } else {
            this.player2HealthBar.setFillStyle(0xff0000);
        }
    }
    update() {
        // Player 1 controls (WASD)
        const cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        // Player 2 controls (Arrow Keys)
        const cursors2 = this.input.keyboard.createCursorKeys();
        // Player 1 movement
        if (this.player1 && this.player1.active) {
            if (cursors.left.isDown) {
                this.player1.setVelocityX(-280);
            } else if (cursors.right.isDown) {
                this.player1.setVelocityX(280);
            } else {
                this.player1.setVelocityX(0);
            }
            if (cursors.up.isDown) {
                this.player1.setVelocityY(-280);
            } else if (cursors.down.isDown) {
                this.player1.setVelocityY(280);
            } else {
                this.player1.setVelocityY(0);
            }
        }
        // Player 2 movement
        if (this.player2 && this.player2.active) {
            if (cursors2.left.isDown) {
                this.player2.setVelocityX(-260);
            } else if (cursors2.right.isDown) {
                this.player2.setVelocityX(260);
            } else {
                this.player2.setVelocityX(0);
            }
            if (cursors2.up.isDown) {
                this.player2.setVelocityY(-260);
            } else if (cursors2.down.isDown) {
                this.player2.setVelocityY(260);
            } else {
                this.player2.setVelocityY(0);
            }
        }
        // Update health bars and bubble sizes only if players exist
        if (this.player1 && this.player2 && this.player1.active && this.player2.active) {
            this.updateHealthBars();
            this.updateBubbleSizes();

            // Keep health bars and text following players
            if (this.player1HealthBar && this.player1Text) {
                this.player1HealthBar.x = this.player1.x;
                this.player1HealthBar.y = this.player1.y - 40;
                this.player1Text.x = this.player1.x;
                this.player1Text.y = this.player1.y - 60;
            }

            if (this.player2HealthBar && this.player2Text) {
                this.player2HealthBar.x = this.player2.x;
                this.player2HealthBar.y = this.player2.y - 40;
                this.player2Text.x = this.player2.x;
                this.player2Text.y = this.player2.y - 60;
            }
        }
        // Enhanced background parallax and effects
        const parallaxFactor = 0.1;
        this.background.x = 400 + (this.player1.x - 400) * parallaxFactor;
        this.background.y = 300 + (this.player1.y - 300) * parallaxFactor;

        // Dynamic lighting based on player positions
        this.backgroundElements.getChildren().forEach((element, index) => {
            const p1Distance = Phaser.Math.Distance.Between(this.player1.x, this.player1.y, element.x, element.y);
            const p2Distance = Phaser.Math.Distance.Between(this.player2.x, this.player2.y, element.x, element.y);

            // Increase brightness when players are nearby
            if (p1Distance < 150 || p2Distance < 150) {
                element.setAlpha(0.6);
            }
        });

        // Spawn power-ups periodically
        if (this.time.now > this.nextPowerUpSpawn) {
            this.spawnPowerUp();
            this.nextPowerUpSpawn = this.time.now + Phaser.Math.Between(5000, 10000);
        }

        // Handle special abilities
        if (this.player1Special.isDown && !this.player1.specialCooldown) {
            this.useSpecialAbility(this.player1);
        }
        if (this.player2Special.isDown && !this.player2.specialCooldown) {
            this.useSpecialAbility(this.player2);
        }
        // Handle attacks
        if (cursors.attack.isDown && !this.player1.isAttacking && !this.player1.attackCooldown) {
            this.playerAttack(this.player1, this.player2);
        }
        if (cursors2.shift.isDown && !this.player2.isAttacking && !this.player2.attackCooldown) {
            this.playerAttack(this.player2, this.player1);
        }
    }
    onPlayersCollide(player1, player2) {
        // Create a bounce effect
        const angle = Phaser.Math.Angle.Between(player1.x, player1.y, player2.x, player2.y);
        const speed = 200;
        player1.setVelocity(
            Math.cos(angle) * -speed,
            Math.sin(angle) * -speed
        );
        player2.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
        // Add a small visual effect
        const x = (player1.x + player2.x) / 2;
        const y = (player1.y + player2.y) / 2;

        const collisionParticles = this.add.particles('red');
        const collisionEmitter = collisionParticles.createEmitter({
            speed: {
                min: -200,
                max: 200
            },
            scale: {
                start: 0.6,
                end: 0
            },
            lifespan: 500,
            blendMode: 'ADD',
            tint: [0x42e0f5, 0xff69b4],
            rotate: {
                min: 0,
                max: 360
            },
            alpha: {
                start: 0.8,
                end: 0
            }
        });
        collisionEmitter.setPosition(x, y);
        collisionEmitter.explode(10);
        // Destroy the particle system after animation
        this.time.delayedCall(300, () => {
            collisionParticles.destroy();
        });
    }
    playerAttack(attacker, target) {
        // Set attacking state and prevent rapid attacks
        if (attacker.isAttacking || attacker.attackCooldown) return;
        attacker.isAttacking = true;
        attacker.attackCooldown = true;

        // Track combo hits
        attacker.comboHits = (attacker.comboHits || 0) + 1;
        if (attacker.lastHitTime && (this.time.now - attacker.lastHitTime) < 1000) {
            attacker.comboHits++;
        } else {
            attacker.comboHits = 1;
        }
        attacker.lastHitTime = this.time.now;
        // Calculate distance between players
        const distance = Phaser.Math.Distance.Between(attacker.x, attacker.y, target.x, target.y);
        // Attack range is 100 pixels
        if (distance < 100) {
            // Calculate damage with defense reduction and increased base damage
            const baseDamage = 10; // Increased base damage
            const damage = Math.max(0, (baseDamage + attacker.attack) - target.defense / 2);
            target.hp = Math.max(0, target.hp - damage);

            // Change target's color to attacker's color temporarily
            const originalTint = target === this.player1 ? 0x3498DB : 0x00BFFF;
            const attackerTint = attacker === this.player1 ? 0x3498DB : 0x00BFFF;
            target.setTint(attackerTint);
            this.time.delayedCall(300, () => {
                target.setTint(originalTint);
            });

            // Check if target is defeated
            if (target.hp <= 0) {
                this.createBubblePopEffect(target);
                target.setVisible(false);
                // Update round wins
                if (attacker === this.player1) {
                    this.player1Wins++;
                } else {
                    this.player2Wins++;
                }
                // Update score display
                this.scoreText.setText(`Score: ${this.player1Wins} - ${this.player2Wins}`);
                // Create winner crown with reference stored in the scene
                this.currentCrown = this.add.image(attacker.x, attacker.y - 50, 'crown');
                this.currentCrown.setScale(0.1);
                this.currentCrown.setDepth(100);

                // Animate the crown
                this.tweens.add({
                    targets: this.currentCrown,
                    y: attacker.y - 70,
                    scaleX: 0.15,
                    scaleY: 0.15,
                    duration: 1000,
                    ease: 'Bounce',
                    yoyo: true,
                    repeat: -1
                });

                // Add winner text
                const winnerText = this.add.text(400, 100,
                    `${attacker === this.player1 ? 'Player 1' : 'Player 2'} Wins!`, {
                        fontSize: '32px',
                        fill: '#FFD700',
                        stroke: '#000000',
                        strokeThickness: 4
                    }).setOrigin(0.5);
                this.time.delayedCall(2000, () => {
                    // Check if the match is over
                    // Check if the match is over
                    if (this.player1Wins === 2 || this.player2Wins === 2) {
                        // Game Over - Show final winner
                        const finalWinner = this.player1Wins > this.player2Wins ? 'Player 1' : 'Player 2';
                        const gameOverText = this.add.text(400, 200,
                            `The Story Concludes!\n\n${finalWinner} becomes the\nGuardian of the Bubble Realm!\n\nHe gets the princess`, {
                                fontSize: '48px',
                                fill: '#FFD700',
                                stroke: '#000000',
                                strokeThickness: 6,
                                align: 'center'
                            }).setOrigin(0.5);

                        // Reset game after 3 seconds and then transition to the wedding scene
                        this.time.delayedCall(3000, () => {
                            this.startWeddingScene(); // Transition to the wedding dance scene
                        });
                    } else {
                        this.currentRound++;
                        this.roundText.setText(`Round ${this.currentRound}/3`);
                        // Change the music for the new round
                        this.changeRoundMusic(this.currentRound);
                        // Show story text for the next round
                        if (this.currentRound === 2) {
                            this.cameras.main.fadeOut(1000);
                            this.time.delayedCall(1000, () => {
                                if (this.background) this.background.destroy();
                                // Create new enhanced background
                                this.background = this.add.image(400, 300, 'animatedBackground2');

                                // Add animated flame effects
                                for (let i = 0; i < 5; i++) {
                                    const flame = this.add.particles('red');
                                    const emitter = flame.createEmitter({
                                        x: Phaser.Math.Between(100, 700),
                                        y: 550,
                                        speed: {
                                            min: 50,
                                            max: 100
                                        },
                                        angle: {
                                            min: 270,
                                            max: 310
                                        },
                                        scale: {
                                            start: 0.4,
                                            end: 0
                                        },
                                        alpha: {
                                            start: 0.5,
                                            end: 0
                                        },
                                        tint: [0xff6600, 0xff3300],
                                        lifespan: 1000,
                                        frequency: 100
                                    });
                                }
                                const scaleX = 800 / this.background.width;
                                const scaleY = 600 / this.background.height;
                                const scale = Math.max(scaleX, scaleY);
                                this.background.setScale(scale);
                                this.background.setDepth(-1);
                                this.cameras.main.fadeIn(1000);
                                this.showStoryText("The Battle of Love\n\nNext battle happens in Castle \n\nThe battle shifts to an ancient temple...", 4000);
                            });
                        } else if (this.currentRound === 3) {
                            // Final round in colosseum
                            this.cameras.main.fadeOut(1000);
                            this.time.delayedCall(1000, () => {
                                if (this.background) this.background.destroy();
                                this.background = this.add.image(400, 300, 'animatedBackground3');

                                // Enhanced colosseum effects with dynamic lighting
                                const spotlight1 = this.add.circle(200, 0, 100, 0xffffff, 0.3);
                                const spotlight2 = this.add.circle(600, 0, 100, 0xffffff, 0.3);

                                // Add dust particles
                                const dustParticles = this.add.particles('red');
                                const dustEmitter = dustParticles.createEmitter({
                                    x: {
                                        min: 0,
                                        max: 800
                                    },
                                    y: 550,
                                    speed: {
                                        min: 20,
                                        max: 50
                                    },
                                    angle: {
                                        min: 270,
                                        max: 310
                                    },
                                    scale: {
                                        start: 0.2,
                                        end: 0
                                    },
                                    alpha: {
                                        start: 0.3,
                                        end: 0
                                    },
                                    tint: 0xcccccc,
                                    lifespan: 2000,
                                    frequency: 200
                                });

                                // Add dynamic spotlight movement
                                this.tweens.add({
                                    targets: [spotlight1, spotlight2],
                                    alpha: {
                                        from: 0.3,
                                        to: 0.1
                                    },
                                    duration: 2000,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: 'Sine.easeInOut'
                                });

                                this.tweens.add({
                                    targets: [spotlight1, spotlight2],
                                    y: 300,
                                    duration: 1000,
                                    ease: 'Power2'
                                });
                                const scaleX = 800 / this.background.width;
                                const scaleY = 600 / this.background.height;
                                const scale = Math.max(scaleX, scaleY);
                                this.background.setScale(scale);
                                this.background.setDepth(-1);
                                this.cameras.main.fadeIn(1000);
                                this.showStoryText("The Final Showdown in the Arena\n\nIn the grand colosseum, the final battle...", 4000);
                            });
                        }
                        // Destroy the crown before starting new round
                        if (this.currentCrown) {
                            this.currentCrown.destroy();
                            this.currentCrown = null;
                        }
                        // Reset players for next round
                        target.hp = target.maxHp;
                        attacker.hp = attacker.maxHp;
                        target.setVisible(true);
                        target.setPosition(target === this.player1 ? 200 : 600, 300);
                        attacker.setPosition(attacker === this.player1 ? 200 : 600, 300);

                        // Update health bars and sizes
                        this.updateHealthBars();
                        this.updateBubbleSizes();
                    }

                });
            }

            // Flash the target red when hit
            target.setTint(0xff0000);
            this.time.delayedCall(200, () => {
                target.clearTint();
            });
            // Show damage number
            const damageText = this.add.text(target.x, target.y - 20, `-${damage}`, {
                fontSize: '20px',
                fill: '#ff0000'
            }).setOrigin(0.5);
            // Animate damage number floating up and fading
            this.tweens.add({
                targets: damageText,
                y: target.y - 50,
                alpha: 0,
                duration: 800,
                onComplete: () => {
                    damageText.destroy();
                }
            });
        }
        // Reset attack state after a short delay
        this.time.delayedCall(200, () => {
            attacker.isAttacking = false;
        });
        // Add attack cooldown (1 second)
        this.time.delayedCall(1000, () => {
            attacker.attackCooldown = false;
        });
    }
    startWeddingScene() {
        // Fade out current scene
        this.cameras.main.fadeOut(1000);
        // Change to wedding music
        this.changeRoundMusic(4);
        this.time.delayedCall(1000, () => {
            // Clear existing objects
            if (this.background) this.background.destroy();
            if (this.player1) this.player1.destroy();
            if (this.player2) this.player2.destroy();
            if (this.currentCrown) this.currentCrown.destroy();

            // Set the background to the wedding dance floor
            this.background = this.add.image(400, 300, 'animatedBackground4');
            const scaleX = 800 / this.background.width;
            const scaleY = 600 / this.background.height;
            const scale = Math.max(scaleX, scaleY);
            this.background.setScale(scale);
            this.background.setDepth(0);

            // Add the winner (hero) character
            const winner = this.add.sprite(300, 300, 'bubble1');
            winner.setScale(0.2);
            winner.setTint(this.player1Wins > this.player2Wins ? 0x3498DB : 0x9B59B6);
            // Create a more elaborate princess character
            const princess = this.add.sprite(500, 300, 'bubble1');
            princess.setScale(0.25);
            princess.setTint(0xE91E63); // Elegant rose color for princess
            // Create a layered effect for the princess
            const princessGlow = this.add.sprite(500, 300, 'bubble1');
            princessGlow.setScale(0.3);
            princessGlow.setAlpha(0.3);
            princessGlow.setTint(0xFFC0CB); // Light pink glow

            // Create dress effect using particles
            const dressParticles = this.add.particles('red');
            const dressEmitter = dressParticles.createEmitter({
                x: princess.x,
                y: princess.y + 20,
                speed: {
                    min: 20,
                    max: 50
                },
                scale: {
                    start: 0.1,
                    end: 0
                },
                alpha: {
                    start: 0.6,
                    end: 0
                },
                tint: 0xF8BBD0, // Soft pink for dress particles
                quantity: 1,
                frequency: 100,
                lifespan: 1000,
                blendMode: 'ADD'
            });

            // Make particles follow the princess
            dressEmitter.startFollow(princess);

            // Add crown to both characters
            const heroCrown = this.add.image(winner.x, winner.y - 50, 'crown').setScale(0.1);
            const princessCrown = this.add.image(princess.x, princess.y - 50, 'crown').setScale(0.1);

            // Dance animation for both characters
            this.tweens.add({
                targets: [winner, princess],
                y: '+=30',
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Crown floating animation
            this.tweens.add({
                targets: [heroCrown, princessCrown],
                y: '-=10',
                duration: 1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Create a romantic atmosphere
            const particles = this.add.particles('red');

            // Hearts effect
            const heartEmitter = particles.createEmitter({
                speed: {
                    min: 50,
                    max: 100
                },
                scale: {
                    start: 0.1,
                    end: 0
                },
                alpha: {
                    start: 0.6,
                    end: 0
                },
                tint: 0xFF69B4,
                quantity: 1,
                frequency: 1000,
                lifespan: 2000,
                blendMode: 'ADD',
                emitZone: {
                    type: 'random',
                    source: new Phaser.Geom.Rectangle(0, 0, 800, 100)
                }
            });

            // Sparkle effect
            const sparkleEmitter = particles.createEmitter({
                speed: {
                    min: 20,
                    max: 50
                },
                scale: {
                    start: 0.1,
                    end: 0
                },
                alpha: {
                    start: 0.6,
                    end: 0
                },
                tint: 0xFFD700,
                quantity: 2,
                frequency: 500,
                lifespan: 1500,
                blendMode: 'ADD'
            });

            // Make sparkles follow the dancing couple
            sparkleEmitter.startFollow(princess);

            // Fade in the enhanced scene
            this.cameras.main.fadeIn(1000);

            // Show the final text with delays
            this.time.delayedCall(1000, () => {
                this.showStoryText("The hero and the princess dance together in celebration of their victory and love!", 5000);

                this.time.delayedCall(6000, () => {
                    this.showStoryText("And they lived happily ever after...\nThe kingdom was safe at last.", 4000);

                    this.time.delayedCall(5000, () => {
                        // Fade out everything
                        this.cameras.main.fadeOut(2000);
                        this.time.delayedCall(2000, () => {
                            // Reset the game
                            this.scene.restart();
                        });
                    });
                });
            });
        });
    }
    changeRoundMusic(round) {
        // Stop any currently playing music
        if (this.currentMusic) {
            this.currentMusic.stop();
        }
        // Select and play the appropriate music
        let musicKey;
        switch (round) {
            case 1:
                musicKey = 'round1_music';
                break;
            case 2:
                musicKey = 'round2_music';
                break;
            case 3:
                musicKey = 'round3_music';
                break;
            case 4: // Wedding scene
                musicKey = 'wedding_music';
                break;
        }
        // Play the new music with fade-in
        if (musicKey) {
            this.currentMusic = this.sound.add(musicKey, {
                loop: true,
                volume: 0
            });
            this.currentMusic.play();

            // Fade in the new music
            this.tweens.add({
                targets: this.currentMusic,
                volume: 0.5,
                duration: 1000,
                ease: 'Linear'
            });
        }
    }
    createBubblePopEffect(target) {
        const popParticles = this.add.particles('red');
        const popEmitter = popParticles.createEmitter({
            x: target.x,
            y: target.y,
            speed: {
                min: 100,
                max: 300
            },
            scale: {
                start: 0.4,
                end: 0
            },
            angle: {
                min: 0,
                max: 360
            },
            quantity: 30,
            lifespan: 800,
            blendMode: 'ADD',
            tint: target === this.player1 ? 0x3498DB : 0x00BFFF,
            rotate: {
                min: 0,
                max: 360
            }
        });
        this.time.delayedCall(800, () => {
            popParticles.destroy();
        });
    }

    useSpecialAbility(player) {
        player.specialCooldown = true;

        // Create special ability effect
        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: {
                min: 200,
                max: 400
            },
            scale: {
                start: 0.6,
                end: 0
            },
            blendMode: 'ADD',
            tint: player === this.player1 ? 0x3498DB : 0x00BFFF,
            lifespan: 1000,
            quantity: 30
        });

        // Wave attack effect
        emitter.setPosition(player.x, player.y);
        emitter.explode(30);

        // Deal damage to nearby opponent
        const opponent = player === this.player1 ? this.player2 : this.player1;
        const distance = Phaser.Math.Distance.Between(player.x, player.y, opponent.x, opponent.y);

        if (distance < 200) {
            const damage = 20;
            opponent.hp = Math.max(0, opponent.hp - damage);

            // Show damage number
            const damageText = this.add.text(opponent.x, opponent.y - 20, `-${damage}`, {
                fontSize: '24px',
                fill: '#ff0000',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            this.tweens.add({
                targets: damageText,
                y: opponent.y - 50,
                alpha: 0,
                duration: 1000,
                onComplete: () => damageText.destroy()
            });
        }

        // Cleanup
        this.time.delayedCall(1000, () => {
            particles.destroy();
        });

        // Reset cooldown after 8 seconds
        this.time.delayedCall(8000, () => {
            player.specialCooldown = false;
        });
    }

    createShimmerEffect(particles, tint) {
        return particles.createEmitter({
            speed: {
                min: 50,
                max: 150
            },
            rotate: {
                min: 0,
                max: 360
            },
            scale: {
                start: 0.6,
                end: 0
            },
            blendMode: 'ADD',
            tint: tint,
            frequency: 50,
            quantity: 2,
            lifespan: 1000,
            alpha: {
                start: 0.8,
                end: 0
            },
            angle: {
                min: 0,
                max: 360
            }
        });
    }
    updateBubbleSizes() {
        // Calculate scale based on health percentage
        const p1HealthPercent = this.player1.hp / this.player1.maxHp;
        const p2HealthPercent = this.player2.hp / this.player2.maxHp;

        // Adjust player scales based on health percentage
        this.player1.setScale(0.2 + (p1HealthPercent * 0.2)); // Scales between 0.2 and 0.4
        this.player2.setScale(0.2 + (p2HealthPercent * 0.2)); // Scales between 0.2 and 0.4

        // Ensure Player 2 retains pink tint on shrink
        this.player2.setTint(0x00BFFF);
    }

    showStoryText(text, duration = 3000) {
        // Pause physics during story display
        this.physics.pause();

        // Create semi-transparent black background with fade in
        const bg = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
        bg.setDepth(1000);
        // Create story text
        const storyText = this.add.text(400, 300, text, {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center',
            wordWrap: {
                width: 600
            }
        }).setOrigin(0.5);
        storyText.setDepth(1001);
        // Fade in effect
        bg.alpha = 0;
        storyText.alpha = 0;
        this.tweens.add({
            targets: [bg, storyText],
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });
        // Remove after duration
        this.time.delayedCall(duration, () => {
            this.tweens.add({
                targets: [bg, storyText],
                alpha: 0,
                duration: 500,
                ease: 'Linear',
                onComplete: () => {
                    bg.destroy();
                    storyText.destroy();
                    // Resume physics after story
                    this.physics.resume();
                }
            });
        });
    }
}

const container = document.getElementById('renderDiv');
const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: Example
};

window.phaserGame = new Phaser.Game(config);