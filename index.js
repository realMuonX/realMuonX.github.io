// Simple Auto-Rotating Earth
class SimpleEarth {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.earth = null;
        this.clouds = null;
        this.container = document.getElementById('earth-container');
        
        if (this.container) {
            this.init();
            this.animate();
        }
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera with fixed aspect ratio
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.camera.position.z = 2.5;

        // Create renderer with fixed size
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(400, 400);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create Earth
        this.createEarth();
        
        // Create clouds
        this.createClouds();
        
        // Create lighting
        this.createLighting();
    }

    createEarth() {
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const earthTexture = this.createEarthTexture();
        
        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            shininess: 0.8
        });

        this.earth = new THREE.Mesh(geometry, material);
        this.scene.add(this.earth);
    }

    createEarthTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Ocean background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(0.5, '#1e3a8a');
        gradient.addColorStop(1, '#1e40af');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Continents
        ctx.fillStyle = '#16a34a';
        
        // North America
        ctx.beginPath();
        ctx.ellipse(200, 150, 80, 60, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // South America
        ctx.beginPath();
        ctx.ellipse(250, 300, 40, 80, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Europe/Africa
        ctx.beginPath();
        ctx.ellipse(500, 200, 60, 100, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Asia
        ctx.beginPath();
        ctx.ellipse(700, 150, 100, 70, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Australia
        ctx.beginPath();
        ctx.ellipse(800, 350, 30, 20, 0, 0, 2 * Math.PI);
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }

    createClouds() {
        const geometry = new THREE.SphereGeometry(1.01, 32, 32);
        const cloudTexture = this.createCloudTexture();
        
        const material = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.4
        });

        this.clouds = new THREE.Mesh(geometry, material);
        this.scene.add(this.clouds);
    }

    createCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Random cloud patches
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 25 + 15;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);

        // Purple accent light
        const accentLight = new THREE.PointLight(0x8a2be2, 0.8, 100);
        accentLight.position.set(-3, 2, 3);
        this.scene.add(accentLight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Simple continuous rotation
        if (this.earth) {
            this.earth.rotation.y += 0.005;
        }

        if (this.clouds) {
            this.clouds.rotation.y += 0.007;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimpleEarth();
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
