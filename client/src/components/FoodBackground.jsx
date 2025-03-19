import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FoodBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // יצירת סצנה
    const scene = new THREE.Scene();
    
    // יצירת רקע גרדיאנט חמים
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2048;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 2048);
    gradient.addColorStop(0, "#ffecd2"); // בז' חמים בחלק העליון
    gradient.addColorStop(1, "#fcb69f"); // גוון אפרסק בחלק התחתון
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 2048);
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;

    // יצירת מצלמה
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // יצירת רנדרר
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // הוספת הרנדרר לדום
    mountRef.current.appendChild(renderer.domElement);
    
    // יצירת אובייקטי מזון
    const foodGroup = new THREE.Group();
    scene.add(foodGroup);
    
    // פונקציה ליצירת מודל ירק/פרי
    const createFoodItem = (type, color, x, y, z, scale = 1) => {
      let geometry, material;
      
      switch(type) {
        case 'tomato':
          geometry = new THREE.SphereGeometry(1, 32, 32);
          material = new THREE.MeshPhongMaterial({ 
            color: 0xff3b3b,
            shininess: 70, 
            specular: 0x555555
          });
          break;
        case 'carrot':
          geometry = new THREE.ConeGeometry(0.5, 2, 32);
          material = new THREE.MeshPhongMaterial({ 
            color: 0xff7f00,
            shininess: 30, 
            specular: 0x444444
          });
          break;
        case 'broccoli':
          // בסיס הברוקולי
          const broccoli = new THREE.Group();
          
          // גבעול
          const stemGeom = new THREE.CylinderGeometry(0.2, 0.3, 1, 16);
          const stemMat = new THREE.MeshPhongMaterial({ color: 0x7caf5c });
          const stem = new THREE.Mesh(stemGeom, stemMat);
          stem.position.y = -0.5;
          broccoli.add(stem);
          
          // ראש ברוקולי
          const headGeom = new THREE.SphereGeometry(0.8, 16, 16);
          const headMat = new THREE.MeshPhongMaterial({ color: 0x4ca64c });
          const head = new THREE.Mesh(headGeom, headMat);
          head.position.y = 0.3;
          broccoli.scale.set(scale, scale, scale);
          broccoli.position.set(x, y, z);
          
          // הוספת נקודות למרקם
          const bumpCount = 30;
          for (let i = 0; i < bumpCount; i++) {
            const bumpSize = 0.15 + Math.random() * 0.15;
            const bumpGeom = new THREE.SphereGeometry(bumpSize, 8, 8);
            const bump = new THREE.Mesh(bumpGeom, headMat);
            
            // מיקום רנדומלי על ראש הברוקולי
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI / 2;
            const radius = 0.8;
            
            bump.position.x = radius * Math.sin(phi) * Math.cos(theta);
            bump.position.y = 0.3 + radius * Math.cos(phi);
            bump.position.z = radius * Math.sin(phi) * Math.sin(theta);
            
            broccoli.add(bump);
          }
          
          foodGroup.add(broccoli);
          return broccoli;
        case 'pepper':
          const pepper = new THREE.Group();
          
          // גוף הפלפל
          const bodyGeom = new THREE.SphereGeometry(1, 32, 16);
          bodyGeom.scale(1, 1.2, 1);
          
          // חיתוך החלק העליון לצורה מתאימה
          for (let i = 0; i < bodyGeom.attributes.position.count; i++) {
            const y = bodyGeom.attributes.position.getY(i);
            if (y > 0.7) {
              bodyGeom.attributes.position.setY(i, y * 0.7);
            }
          }
          
          bodyGeom.computeVertexNormals();
          
          const bodyMat = new THREE.MeshPhongMaterial({ 
            color: color || 0xff0000,
            shininess: 60, 
            specular: 0x555555
          });
          
          const body = new THREE.Mesh(bodyGeom, bodyMat);
          pepper.add(body);
          
          // גבעול
          const stemGeometry = new THREE.CylinderGeometry(0.2, 0.1, 0.5, 16);
          const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
          const stem2 = new THREE.Mesh(stemGeometry, stemMaterial);
          stem2.position.y = 1.2;
          pepper.add(stem2);
          
          pepper.scale.set(scale, scale, scale);
          pepper.position.set(x, y, z);
          foodGroup.add(pepper);
          return pepper;
        case 'bread':
          const bread = new THREE.Group();
          
          // גוף הלחם
          const breadGeom = new THREE.CapsuleGeometry(1, 2, 16, 32);
          breadGeom.rotateZ(Math.PI / 2);
          
          const breadMat = new THREE.MeshPhongMaterial({ 
            color: 0xd6a968,
            shininess: 10,
            specular: 0x333333
          });
          
          const breadBody = new THREE.Mesh(breadGeom, breadMat);
          bread.add(breadBody);
          
          // יצירת חתכים עליונים
          const cutGeom = new THREE.BoxGeometry(2.2, 0.1, 0.1);
          const cutMat = new THREE.MeshPhongMaterial({ color: 0xb38b4d });
          
          for (let i = 0; i < 3; i++) {
            const cut = new THREE.Mesh(cutGeom, cutMat);
            cut.position.y = 0.5 - i * 0.4;
            cut.position.z = 0.8;
            bread.add(cut);
          }
          
          bread.scale.set(scale, scale, scale);
          bread.position.set(x, y, z);
          foodGroup.add(bread);
          return bread;
        case 'pasta':
          const pasta = new THREE.Group();
          
          // צלחת
          const plateGeom = new THREE.CylinderGeometry(1.5, 1.7, 0.2, 32);
          const plateMat = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 80, 
            specular: 0x888888
          });
          
          const plate = new THREE.Mesh(plateGeom, plateMat);
          pasta.add(plate);
          
          // הפסטה
          const pastaGeom = new THREE.TorusGeometry(0.2, 0.06, 16, 100);
          const pastaMat = new THREE.MeshPhongMaterial({ 
            color: 0xf5e6c8,
            shininess: 30
          });
          
          // יצירת מספר צורות של פסטה
          for (let i = 0; i < 15; i++) {
            const noodle = new THREE.Mesh(pastaGeom, pastaMat);
            noodle.position.y = 0.2 + Math.random() * 0.3;
            noodle.position.x = (Math.random() - 0.5) * 2;
            noodle.position.z = (Math.random() - 0.5) * 2;
            noodle.rotation.x = Math.random() * Math.PI;
            noodle.rotation.y = Math.random() * Math.PI;
            noodle.rotation.z = Math.random() * Math.PI;
            noodle.scale.set(
              0.8 + Math.random() * 0.4,
              0.8 + Math.random() * 0.4,
              0.8 + Math.random() * 0.4
            );
            pasta.add(noodle);
          }
          
          // רוטב
          const sauceGeom = new THREE.SphereGeometry(1, 32, 32);
          sauceGeom.scale(1, 0.25, 1);
          
          const sauceMat = new THREE.MeshPhongMaterial({ 
            color: 0xc14b0b,
            transparent: true,
            opacity: 0.8,
            shininess: 50
          });
          
          const sauce = new THREE.Mesh(sauceGeom, sauceMat);
          sauce.position.y = 0.3;
          sauce.scale.set(0.8, 0.8, 0.8);
          pasta.add(sauce);
          
          pasta.scale.set(scale, scale, scale);
          pasta.position.set(x, y, z);
          foodGroup.add(pasta);
          return pasta;
        default:
          geometry = new THREE.SphereGeometry(1, 16, 16);
          material = new THREE.MeshPhongMaterial({ color: color || 0xff0000 });
      }
      
      if (geometry && material) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.scale.set(scale, scale, scale);
        foodGroup.add(mesh);
        return mesh;
      }
      
      return null;
    };
    
    // יצירת מרכיבי מזון שונים
    const foodItems = [
      createFoodItem('tomato', 0xff3b3b, -8, 2, -5, 1.5),
      createFoodItem('carrot', 0xff7f00, 7, -3, -3, 1.8),
      createFoodItem('broccoli', 0x4ca64c, -5, -5, -10, 2),
      createFoodItem('pepper', 0xffeb3b, 9, 6, -8, 1.6), // פלפל צהוב
      createFoodItem('pepper', 0xff4500, -10, 8, -12, 1.7), // פלפל אדום
      createFoodItem('pepper', 0x4caf50, 12, -7, -15, 1.5), // פלפל ירוק
      createFoodItem('bread', 0xd6a968, 0, 4, -7, 1.3),
      createFoodItem('pasta', 0xf5e6c8, 4, -8, -5, 1.4)
    ];
    
    // הוספת תאורה
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(0, 10, 10);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xfff0e0, 0.7);
    fillLight.position.set(-10, 5, 0);
    scene.add(fillLight);
    
    const backLight = new THREE.DirectionalLight(0xf0e8ff, 0.5);
    backLight.position.set(5, 3, -10);
    scene.add(backLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // הוספת חלקיקים זוהרים (כמו אבק או קמח)
    const particlesCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      particlesPositions[i3] = (Math.random() - 0.5) * 30;
      particlesPositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlesPositions[i3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // מהירויות לאנימציה
    const speeds = foodItems.map(() => ({
      rotX: (Math.random() - 0.5) * 0.005,
      rotY: 0.003 + Math.random() * 0.005,
      rotZ: (Math.random() - 0.5) * 0.004,
      moveX: (Math.random() - 0.5) * 0.02,
      moveY: (Math.random() - 0.5) * 0.02,
      moveZ: (Math.random() - 0.5) * 0.01,
      time: Math.random() * Math.PI * 2
    }));
    
    // פונקציית אנימציה
    const animate = () => {
      requestAnimationFrame(animate);
      
      // סיבוב וטלטול מרכיבי המזון
      foodItems.forEach((item, index) => {
        if (item) {
          const speed = speeds[index];
          speed.time += 0.01;
          
          item.rotation.x += speed.rotX;
          item.rotation.y += speed.rotY;
          item.rotation.z += speed.rotZ;
          
          // תנועה מעגלית ונדנוד קל
          item.position.y += Math.sin(speed.time) * speed.moveY;
          item.position.x += Math.cos(speed.time) * speed.moveX;
          item.position.z += Math.sin(speed.time * 0.7) * speed.moveZ;
        }
      });
      
      // תנועה קלה של הקבוצה
      foodGroup.rotation.y += 0.001;
      
      // תנועת חלקיקים
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] -= 0.03; // נפילה איטית של החלקיקים
        
        // החזרת חלקיקים שהגיעו למטה
        if (positions[i3 + 1] < -15) {
          positions[i3 + 1] = 15;
          positions[i3] = (Math.random() - 0.5) * 30;
          positions[i3 + 2] = (Math.random() - 0.5) * 30 - 5;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // סיבוב עדין של המצלמה
      const cameraRadius = 20;
      const cameraSpeed = 0.0005;
      camera.position.x = Math.sin(Date.now() * cameraSpeed) * cameraRadius;
      camera.position.z = Math.cos(Date.now() * cameraSpeed) * cameraRadius;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    // התאמת גודל החלון
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // התחלת האנימציה
    animate();
    
    // ניקוי
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  
  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default FoodBackground;