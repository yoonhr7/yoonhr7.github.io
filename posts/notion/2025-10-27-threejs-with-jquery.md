---
title: "three.js with jQuery"
date: "2025-10-27"
tags: ["Library","JavaScript"]
notionId: "299a784e-4dc2-80b3-8c59-cb3d70904316"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
![3d.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/6e747234-5f1a-4a98-91d5-6f58915525af/3d.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WKLVPMEI%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE%2FfkBfrZVzK5BanNomx0vhnwzhObfhaWMU%2BSwurG69sAiBqdN2bpKL7b3XiRFq9GrZi4w%2Fv0202iAGn%2B3PVC%2B3p2iqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzB0pmqEB6AVie9eWKtwDvA1xbBOyazMWD56d%2FLQPcfAEpL7KNJr6GF%2FE6FDm5ivI6pBmHAlSQ1rOxtMVGDY%2FKwljMo9mm6Y%2Bss2fJ%2BetvpAdxlYB%2FONAfqBP1UU%2F3RsQwG0OMGKC4noimYKGhE7c50OpPPn2bYx1Pdii0hzNShGgaeaBrPU68Hb2Pu3HEwLJe1qN%2FtcJTNt3BfQNDpm1w%2BvP3cjGlbqQtwc9Ojl6iTYUeG6K5uBMdH5kZPqAyHbhSG%2BIEka3WSl9hF59Pi27hau333SiNTASi3R3e4WlwkIHggOA1hCgnlOMHQK740g%2FvIr8ojdH0FYs3lFTf0GQFEpuVY697M5l25bnsaCytyxDN2f4loK%2B47vp8fpUPOd30StAhyzPqupkmhWEMdV0wrhVSRysU5ChYN0KLrCQ8p6gw8sFb%2FeOOECx%2BfHB46eucGspQVOl7N9eFOyYDAIyqJy9t66gVPex9h074jOVYrHcowdoaDLQ2t5JwYpTRYQinEFNP7yoAu%2FsbGdJ1YUZJTKq8CNie4%2B1%2F5RjlFV3ZpWS4HStBZv5O8M%2Fa%2F%2BdGeB2dckwzD9QU1QmsO6hD%2Fq7WUIqhjvBHfrYfCHPFuRSBjkZ0S7goEavg7mPUo80akVreXLsvBBnm%2B1iL6sw9oyIywY6pgFwFqlS8VsIggkYRY74iGPVg%2BNH2P7Sl%2Fzf4SLllUYGx%2FSHzO8Od6sn6wymtjNvLmMzLE1%2FnikqqqeLJHRleetwf%2Fyk87vknCnc48VxyBozl39p%2FhRTg2S1RqpPaLPg9CCa0tWBSPphCH9dbYYI%2BHsTr%2BSVCuU5%2BpGswiH0L0dlVNjSgQhDYkgAwvHEeItf2oAxXgbgsKQwZ8g6ddgeQopDYH%2F%2FSTgW&X-Amz-Signature=7583455c541bc48f1c3d335399b19fe938b086aa4418fe8f6ca1d581ffcc692c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 주요 기술 내용

1. **경량화를 위해 GLB 확장자 사용**
    - GLTF의 바이너리 버전으로 로딩 속도 최적화
2. **OrbitControls로 마우스 회전 기능**
    - 마우스 드래그로 3D 모델 회전/확대/축소 가능
3. **Sprite로 마커 출력 및 상호작용**
    - Canvas 텍스트를 Sprite로 변환하여 3D 공간에 라벨 표시
    - Raycaster로 클릭 이벤트 처리
        - **Raycaster**는 Three.js에서 **광선(Ray)을 쏘아서 3D 객체와의 교차점을 감지**하는 기능입니다.

            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/7041175a-11ea-478b-9c3b-cceac0b8d556/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXDGKDXV%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081847Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDueoUB1LEyrdF89jin%2Ba8mNoA7o0EcH2CKg0EKoaaO0AiAvL2PCXWG2TYxNg198BVAnoIRickXf4LneMnuyueou0SqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxtbyh6wwhP46c9AiKtwDr0UD6KdEL8TtYLJkJmbzOhRSBsxMmnbT%2FchLJjN%2BsXNxh3YOc82Vtt6E2cbPk0SANV77J4MPo0Igrq%2F93JtxeePlNwlksF%2FWG1N8RalCnpmqroyZnoFb5Sv0I4hWiATAfbvpzPOgUBYb9vICg6prwETraB8xlWS8sZ5%2FVkqiEW7Dm%2BKT4QHdxuXWqXzksWWzfO1DfWXGNQJEX2RePhqOOe7MnGyzpPPZlCZ2YC2t2eY%2FYOXADEd1TLdl7tg%2BF4Q1iwg50l%2FQfWeO6TuIWAg5YacSMYdIsMsonNBAfljufHcnicQ9x7%2FjFifgS3NBHoVaWLrUN5g4XT%2B6jktF0bNEG%2BdS0wsxOBVLCQlTNqHgOJvPJK09xtOl7WnX62pm27z0x1NsydXwILils4xyi8P%2Fyt0%2F3hYk0ufkCZODx%2BK7f3EYBco65W9jsCDwQhGT6WAxzgTLnRMWanl3nLWNGGakenxb46tINpjHPWhnwIE3v9XZb%2BgrW%2FRn6idVVM73GupYc08lwXz%2BniYK4iBCHLhqZyNOjO20WqnH%2FRiuo4y62Gxy8GLMyLykMWFSZ%2FxqQPsyDCUn9u%2FFm9EqulD4v5pEcoglYfZEvOvcXYEohMg0kxX4akgpB4bjatM40LYw8o2IywY6pgFLmWrVr7abq6407lqHBPQXx%2BBfiihh3TOmnz90cr0iUj7f2pSjC%2BP7yOcOl1CL1uY9FwCwCZ6085IYa1ImVnoq3uveEuVH891S8vw1oERas40WQqQLwTfat3yMNE3TVeHua6MxV4qotyKBkDl0q7mmcXXFz%2FSKyRJZvgf88wKvGfM2x6QJhjQCMFu7GckHKQeshnJSblItQkQ1O8%2FP%2FC3LPFQy%2BiCX&X-Amz-Signature=0e4bfe557b832006bcca45bd1d647832ecbb84be7b09856dbd27c6d4c43b7105&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

4. **모델 자동 중심 정렬**
    - 제공받은 모델의 원점이 중심에 맞지 않아 Box3로 바운딩 박스 계산 후 재정렬

---


### 구현 코드


```javascript
<!-- Three.js Core -->
<script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
    }
</script>
<script type="module" src="script/three.js"></script>
```


```javascript
// three.js

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// #wrapper 요소 가져오기
const $wrapper = $("#wrapper");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(35, $wrapper.width() / $wrapper.height(), 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize($wrapper.width(), $wrapper.height());
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
$("#canvas-container").append(renderer.domElement);

// ===== Origin 표시 =====

// 1. AxesHelper (축 표시 - 빨강:X, 초록:Y, 파랑:Z)
const axesHelper = new THREE.AxesHelper(5); // 크기: 5
axesHelper.visible = false; // 숨김
scene.add(axesHelper);

// 2. Grid Helper (바닥 격자)
const gridHelper = new THREE.GridHelper(10, 10); // 크기: 10, 분할: 10
gridHelper.visible = false; // 숨김
scene.add(gridHelper);

// 3. Origin 포인트 (구체로 표시)
const originGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const originMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const originPoint = new THREE.Mesh(originGeometry, originMaterial);
originPoint.visible = false; // 숨김
scene.add(originPoint);

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 5);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 줌 범위 설정
controls.minDistance = 6; // 최소 거리 (최대 확대)
controls.maxDistance = 16; // 최대 거리 (최대 축소)

// 수직 회전 각도 제한 (라디안)
controls.minPolarAngle = Math.PI / 60; // 30도 (위에서 보는 최소 각도)
controls.maxPolarAngle = Math.PI / 4; // 90도 (수평 시야)

// 수평 회전 각도 제한 (필요시 활성화)
// controls.minAzimuthAngle = -Math.PI / 4; // -45도
// controls.maxAzimuthAngle = Math.PI / 4; // 45도

// ===== 클릭 가능한 마커 시스템 =====

// 마커 배열 및 Raycaster 설정
const markers = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 1. 기본 구체 마커 추가 함수
window.addMarker = function(x, y, z, message, color = 0xff0000, size = 0.1) {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8
    });
    const marker = new THREE.Mesh(geometry, material);
    marker.position.set(x, y, z);

    // 마커에 메시지 저장
    marker.userData = {
        message: message,
        type: 'marker'
    };

    scene.add(marker);
    markers.push(marker);

    return marker;
};

// 2. 텍스트 라벨 마커 추가 함수
window.addTextMarker = function(x, y, z, text, message, color = 0xffffff, backgroundColor = 0x000000) {
    // Canvas로 텍스트 생성
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    // 배경
    context.fillStyle = '#' + backgroundColor.toString(16).padStart(6, '0');
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 텍스트
    context.fillStyle = '#' + color.toString(16).padStart(6, '0');
    context.font = 'Bold 40px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // 텍스처 생성
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(1, 0.5, 1);

    // 스프라이트에 메시지 저장
    sprite.userData = {
        message: message || text,
        type: 'textMarker'
    };

    scene.add(sprite);
    markers.push(sprite);

    return sprite;
};

// 3. 마커 클릭 이벤트 핸들러
function onMarkerClick(event) {
    // 마우스 좌표를 정규화된 장치 좌표로 변환 (-1 ~ +1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycaster 업데이트
    raycaster.setFromCamera(mouse, camera);

    // 마커와의 교차점 확인
    const intersects = raycaster.intersectObjects(markers);

    if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        const message = clickedMarker.userData.message;

        if (message) {
            alert(message);
            console.log('🖱️ 마커 클릭:', message);
        }
    }
}

// 클릭 이벤트 리스너 추가
renderer.domElement.addEventListener('click', onMarkerClick);


const loader = new GLTFLoader();

loader.load(
    "./model/KSC_paris.glb",
    function (gltf) {
        const model = gltf.scene;

        // 모델을 씬에 먼저 추가
        scene.add(model);

        // 바운딩 박스 계산 (스케일 적용 전)
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxSize = Math.max(size.x, size.y, size.z);
        if (maxSize > 10) {
            const scale = 5 / maxSize;
            model.scale.setScalar(scale);
        }

        model.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        // 스케일 적용 후 다시 바운딩 박스 계산
        box.setFromObject(model);
        box.getCenter(center);
        box.getSize(size);

        // 모델을 이동시켜서 모델의 중심이 원점(0,0,0)에 오도록 함
        model.position.sub(center);

        // ===== 마커 자동 추가 예시 =====
        // 여기에 원하는 위치에 마커를 추가하세요
        // 텍스트 라벨 마커
        addTextMarker(1, 0.5, 0, "회의실A", "회의실A - 예약 가능", 0xffffff, 0xAE00FF);
        addTextMarker(-1, 0.5, 0.5, "회의실B", "회의실B - 예약 중", 0xffffff, 0x4DDD00);
        addTextMarker(-1, 0.5, -0.5, "회의실C", "회의실C - 예약 가능", 0xffffff, 0x007DFF);
    },
    function (xhr) {
        const percent = ((xhr.loaded / xhr.total) * 100).toFixed(0);
        console.log(percent + "% 로딩중...");
    },
    function (error) {
        console.error("❌ 로드 실패:", error);
    }
);

// ===== Origin 위치 변경 함수 =====

// Origin을 이동하는 함수
window.moveOrigin = function (x, y, z) {
    axesHelper.position.set(x, y, z);
    originPoint.position.set(x, y, z);
    gridHelper.position.set(x, y, z);

    console.log("Origin 이동:", x, y, z);
};

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

