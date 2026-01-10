---
title: "kakaoMap API"
date: "2025-02-12"
tags: ["Vue","API","Library"]
notionId: "198a784e-4dc2-808b-8c64-e95b234a4200"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 지도 좌표 데이터 예시


```html
[
  {
    address: '한글 주소 정보',
    position: { lat: 35.1980895, lon: 129.0614443 }
  },
  {
    address: '한글 주소 정보',
    position: { lat: 35.5136122, lon: 129.2966401 }
  }
]
```


### kakaoMap.vue (component)


```html
<template><div id="map"></div></template>
```


```javascript
<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
    positions: {
        type: Array
    },
    selectedIdx: {
        type: Number
    }
})

const propsPosIdx = computed(() => props.selectedIdx)
const propsPositions = computed(() => props.positions)

watch(propsPosIdx, (newVal, oldVal) => {
    if (window.kakao && window.kakao.maps) {
        panTo(propsPositions.value[newVal].position.lat, propsPositions.value[newVal].position.lon)
    }
    updateSelectedMarker(newVal, oldVal)
})
// 지도 세팅
onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap()
    } else {
        const script = document.createElement('script')
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap)
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1516e0c13fa3aa9251a2988693cd794a&libraries=clusterer`
        document.head.appendChild(script)
    }
})

const map = ref(null)
const markers = ref([])
const infowindows = ref([])

const emit = defineEmits(['clickMarker'])

const initMap = async () => {
    const container = document.getElementById('map')
    const centerPosition = getCenterPosition(propsPositions.value) // 중앙 좌표 계산

    const options = {
        center: new kakao.maps.LatLng(centerPosition.lat, centerPosition.lon),
        level: 2
    }

    // 지도 객체를 등록합니다.
    // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
    map.value = new kakao.maps.Map(container, options)

    await addMarkers()
    await initMarkerStyle()

    await setupClusterer()
    await setupMapEventListeners()
}

const initMarkerStyle = () => {
    // infowindow 기존 스타일 초기화
    const markerParents = document.querySelectorAll('.marker-info')
    markerParents.forEach((e) => {
        var w = e.offsetWidth
        var ml = w / 2
        e.parentElement.style.top = 0
        e.parentElement.style.bottom = '60px'
        e.parentElement.style.left = '50%'
        e.parentElement.style.marginLeft = -ml + 'px'
        e.parentElement.style.width = w + 'px'
        e.parentElement.previousSibling.style.display = 'none'
        e.parentElement.parentElement.style.zIndex = 10
        e.parentElement.parentElement.style.height = '32px'
        e.parentElement.parentElement.style.border = '0px'
        e.parentElement.parentElement.style.background = 'unset'
    })
}

const getImage = (status, isSelected) => {
    if (isSelected) {
        return new URL(`/assets/img/common/marker-selected.svg`, import.meta.url).href
    }
    switch (status) {
        case 'success':
            return new URL(`/assets/img/common/marker.svg`, import.meta.url).href
        default:
            return new URL(`/assets/img/common/marker-error.svg`, import.meta.url).href
    }
}
const updateMarkerImage = (marker, status, isSelected) => {
    const imageSrc = getImage(status, isSelected)
    const markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(36, 36))
    marker.setImage(markerImage)
}
const updateSelectedMarker = (newVal, oldVal) => {
    const oldMarker = markers.value[oldVal]
    if (oldMarker) {
        updateMarkerImage(oldMarker, propsPositions.value[oldVal].status, false)
    }

    const newMarker = markers.value[newVal]
    if (newMarker) {
        updateMarkerImage(newMarker, propsPositions.value[newVal].status, true)
    }
}

const addMarkers = () => {
    markers.value.forEach((marker) => marker.setMap(null)) // 기존 마커 제거
    markers.value = [] // 마커 배열 초기화
    infowindows.value = [] // 인포윈도우 배열 초기화

    propsPositions.value.map((el, idx) => {
        const isSelected = idx === propsPosIdx.value
        const markerImage = new kakao.maps.MarkerImage(getImage(el.status, isSelected), new kakao.maps.Size(36, 36))

        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(el.position.lat, el.position.lon),
            image: markerImage // 커스텀 마커 이미지 설정
        })

        markers.value.push(marker) // 마커 배열에 추가

        const infowindow = new kakao.maps.InfoWindow({
            content: `<div class="marker-info${el.fireLvl ? ` fire-${el.fireLvl}` : ''}" data-id="${el.name}">
        ${el.fireLvl ? `<img src="/assets/img/common/fire-${el.fireLvl}.svg"/>` : ''}
        <div class="marker-name">${el.name}</div>
        ${el.outstadingVlt > 0 ? `<span class="outstanding">+${el.outstadingVlt}</span>` : ''}
        ${el.status !== 'success' ? `<span class="${el.status}">${el.statusNm}</span>` : ''}
      </div>`
        })

        infowindows.value.push(infowindow) // 인포윈도우 배열에 추가
        infowindow.open(map.value, marker) // 인포윈도우를 지도에 바로 표시

        // 클릭 이벤트
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', () => emit('clickMarker', el, idx))
        // 인포윈도우에 클릭이벤트를 등록합니다
        const infowindowElement = document.querySelector(`.marker-info[data-id="${el.name}"]`)
        if (infowindowElement) infowindowElement.addEventListener('click', () => emit('clickMarker', el, idx))
    })
}

const setupClusterer = () => {
    const clusterer = new kakao.maps.MarkerClusterer({
        map: map.value,
        averageCenter: true,
        minLevel: 6, // clusterer 동작할 레벨
        styles: [
            {
                width: '14rem',
                height: '14rem',
                background: 'url("/assets/img/common/clusterer.svg") 0px 0px',
                backgroundSize: '100%',
                borderRadius: '50%',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '14rem',
                fontSize: '2rem'
            }
        ]
    })

    clusterer.addMarkers(markers.value)
}

const setupMapEventListeners = () => {
    kakao.maps.event.addListener(map.value, 'zoom_changed', () => {
        const level = map.value.getLevel()
        if (level > 5) {
            // clusterer 동작하는 레벨보다 클 때 모든 인포윈도우 닫기
            infowindows.value.forEach((infowindow) => {
                infowindow.close()
            })
        } else {
            // 특정 레벨 이하에서는 모든 인포윈도우 다시 열기
            infowindows.value.forEach((infowindow, index) => {
                infowindow.open(map.value, markers.value[index])
            })
            initMarkerStyle()
        }
    })
}

// 중심점 계산 함수
function getCenterPosition(positions) {
    var latSum = 0,
        lngSum = 0
    positions.forEach((el) => {
        latSum += el.position.lat
        lonSum += el.position.lon
    })
    return {
        lat: latSum / positions.length,
        lon: lonSum / positions.length
    }
}

// 지도 이동
function panTo(lat, lon) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLon(lat, lon)

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.value.panTo(moveLatLon)
}

// 이벤트 해제
onBeforeUnmount(() => {
    if (map.value) {
        kakao.maps.event.removeListener(map.value, 'zoom_changed')
        markers.value.forEach((marker) => kakao.maps.event.removeListener(marker, 'click'))
        // infowindows.value.forEach((infowindow) => kakao.maps.event.removeListener(infowindow, 'domready'))
    }
})
</script>
```


```scss
<style lang="scss">
#map {
    width: 100%;
    height: calc(100vh - 68px);
    div:has(.marker-info) {
        position: unset;
    }
    .marker-info {
        cursor: pointer;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0px 2px 4px 0px rgba(8, 41, 72, 0.15);
        color: #222;
        font-size: 1.4rem;
        font-weight: 400;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            margin-right: 12px;
        }
        .marker-name {
            max-width: 120px;
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span:not(.marker-name) {
            flex-shrink: 0;
            margin-left: 1rem;
            padding-left: 1rem;
            border-left: 1px solid #eee;
        }
        &:has(.outstanding) {
            border: 1px solid #f96969;
            span {
                color: #f96969;
            }
        }
        &.fire-high {
            border: none;
            background: #f96969;
            &,
            span {
                color: #fff;
            }
        }
        &.fire-medium {
            border: none;
            background: #f99c69;
            &,
            span {
                color: #fff;
            }
        }
        &.fire-low {
            border: none;
            background: #ffc701;
            &,
            span {
                color: #fff;
            }
        }
        &:has(.error) {
            span {
                color: rgba(34, 34, 34, 0.5);
            }
        }
        &:has(.uninstalled) {
            background: #f1f1f1;
            color: rgba(34, 34, 34, 0.5);
            span {
                color: #bdbdbd;
            }
        }
    }
}
</style>
```


### resize 센터 유지


```javascript
onMounted(() => {
	// resize이벤트 추
	window.addEventListener('resize', updateMapCenter);
});
// Resize 시 지도 중심 업데이트
function updateMapCenter() {
    const centerPosition = getCenterPosition(positions.value); // 중앙 좌표 계산
    map.value.setCenter(new kakao.maps.LatLng(centerPosition.lat, centerPosition.lon)); // 지도 중심 업데이트
}
onBeforeUnmount(() => {
    // 마운트 해제 시 이벤트 리스너 제거
    window.removeEventListener('resize', updateMapCenter);
});
```

