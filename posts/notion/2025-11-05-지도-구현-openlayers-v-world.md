---
title: "지도 구현 (OpenLayers & V-WORLD)"
date: "2025-11-05"
tags: ["API","Library"]
notionId: "2a2a784e-4dc2-8061-9f3b-e97a7a382d44"
lastEditedTime: "2026-01-10T09:20:00.000Z"
---
![v-world.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/5350764e-ef14-4b4e-bb6f-7db1229fb72e/v-world.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KTCOACV%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T092051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCBMHeQCTf%2B76l8HCzt%2Be%2BbU5c48w%2FQ8SQ6u5L%2Fb54wRgIhAKmbDE884XUq9qo5vsRgj%2FDB%2Fke2B2U1UKnCmdHizKgAKogECLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwL2BCwWUyRJlu5N5Yq3APgbM1I%2FGYTzICO%2BYZbbLTRYSR2dUxBuYnTlj%2B8xeDi3P0GBIe9dP1NZJXqt1%2B51xZrXjX9KwaU0ekT1bOd6go2ts28TGlztxDAdsuwkJV%2F%2BQvCzsuCYtQBgecBFh4eXYpt1h5DSZUjaoO0YMfwT2SyANZAnMYLa4rD7FVcZXWF4IUnC76pj277KXhu1QTcaVIm8SzCYt85U6aC%2B4GwWEXXWk67yC0RwyBZDplPiFHYDLyGmgWaCCRodUVoW0SXRGJxSdZzXQC%2BnsR3yKmHgto1weI45g720aXqC5aq55SzVCmK5RTa0wTRZSGFETjOZutvzxvPJx083CcoRCTf8FFDwd5%2FzhSzDN5tHODy%2B%2FWHP6vgmmAgXCzNGDuf0gBWflj8AD0HlshtWbaNSVeM%2BRcp6IIH4NLp3ZNgLM666dPl2ujS%2BhEzCJ%2FI1cf0rDQ7ew7obQH6%2Bekie8zkF7zqhsbHRRA9xI6HmNMULBc8r8QpRUMnWkKKbpdyqjx69zIRT%2FSaZxaPr1HmTnWBgrSJRAyKxWJzL%2BOjsCwBjlv%2Bu44ix%2FpLmEaw0mwx3PtpHbHCOH7yen7UnVMlAbZ9e8qQFqXjtkvWaDGDAirM%2FBKGOqyrB4grF7E0DjwKNZKyijC9qYjLBjqkAWf%2BQWTWCXpGILbjS%2FrN6EnozMbGT4ALLfnKV2xtMeLcjdj9FBCYU%2FGPNKdihemPrl9gT9NjXXYDHmhttDN%2BXwWrRk9%2F1SSnJWq1FO2mo2t6U0G3ERe02V37KaPxR4C0cC4yOjzkEjFEJSua%2FyTdWFeRKK94Z8mDRIZpXfqi0V0teiY6Rq8WPnToNt78cizyIbC8f8bm4zcMV8AIYR1tpObNoGgm&X-Amz-Signature=27e60d2f4728a56772abd01d33157ff389f2afde7e777e09ef5ec56b3d1476d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 1. 시작하기 전에


![e6792fd4-c37e-4914-ada4-720974c808a7.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/3c221330-8002-476e-b161-52ef59daeffd/e6792fd4-c37e-4914-ada4-720974c808a7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KTCOACV%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T092051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCBMHeQCTf%2B76l8HCzt%2Be%2BbU5c48w%2FQ8SQ6u5L%2Fb54wRgIhAKmbDE884XUq9qo5vsRgj%2FDB%2Fke2B2U1UKnCmdHizKgAKogECLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwL2BCwWUyRJlu5N5Yq3APgbM1I%2FGYTzICO%2BYZbbLTRYSR2dUxBuYnTlj%2B8xeDi3P0GBIe9dP1NZJXqt1%2B51xZrXjX9KwaU0ekT1bOd6go2ts28TGlztxDAdsuwkJV%2F%2BQvCzsuCYtQBgecBFh4eXYpt1h5DSZUjaoO0YMfwT2SyANZAnMYLa4rD7FVcZXWF4IUnC76pj277KXhu1QTcaVIm8SzCYt85U6aC%2B4GwWEXXWk67yC0RwyBZDplPiFHYDLyGmgWaCCRodUVoW0SXRGJxSdZzXQC%2BnsR3yKmHgto1weI45g720aXqC5aq55SzVCmK5RTa0wTRZSGFETjOZutvzxvPJx083CcoRCTf8FFDwd5%2FzhSzDN5tHODy%2B%2FWHP6vgmmAgXCzNGDuf0gBWflj8AD0HlshtWbaNSVeM%2BRcp6IIH4NLp3ZNgLM666dPl2ujS%2BhEzCJ%2FI1cf0rDQ7ew7obQH6%2Bekie8zkF7zqhsbHRRA9xI6HmNMULBc8r8QpRUMnWkKKbpdyqjx69zIRT%2FSaZxaPr1HmTnWBgrSJRAyKxWJzL%2BOjsCwBjlv%2Bu44ix%2FpLmEaw0mwx3PtpHbHCOH7yen7UnVMlAbZ9e8qQFqXjtkvWaDGDAirM%2FBKGOqyrB4grF7E0DjwKNZKyijC9qYjLBjqkAWf%2BQWTWCXpGILbjS%2FrN6EnozMbGT4ALLfnKV2xtMeLcjdj9FBCYU%2FGPNKdihemPrl9gT9NjXXYDHmhttDN%2BXwWrRk9%2F1SSnJWq1FO2mo2t6U0G3ERe02V37KaPxR4C0cC4yOjzkEjFEJSua%2FyTdWFeRKK94Z8mDRIZpXfqi0V0teiY6Rq8WPnToNt78cizyIbC8f8bm4zcMV8AIYR1tpObNoGgm&X-Amz-Signature=8e28c1cbe14cf5093eff15d37976a18d6fbf7971eb3b8df2e99f475d6c43fb1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 1) OpenLayers란?


**OpenLayers (OL)**는 웹 브라우저에서 지도를 **렌더링하고 조작할 수 있는 JavaScript 라이브러리**입니다.

- **핵심 기능**
    - 다양한 지도 소스(OSM, Google, Mapbox, VWorld 등)를 불러와 표시
    - 마커, 벡터 레이어, 그리기/편집, 좌표 변환 지원
    - 줌, 회전, 드래그 등 기본 인터랙션 내장
    - 완전한 오픈소스 (Apache 2.0 License)
> 공식 문서:   
> [https://openlayers.org/en/latest/apidoc/](https://openlayers.org/en/latest/apidoc/)

### 2) 지도 소스별 예시 정리


| 지도 소스                  | 코드 예시                                                                                                                                                                                       | 공식 링크 / 참고                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **OpenStreetMap (기본)** | `js\nnew ol.source.OSM()\n`                                                                                                                                                                 | [https://www.openstreetmap.org](https://www.openstreetmap.org/)                                      |
| ✅ **VWorld (한국형)**     | `js\nnew ol.source.XYZ({\n  url: 'https://api.vworld.kr/req/wmts/1.0.0/{YOUR_KEY}/Base/{z}/{y}/{x}.png'\n})\n`                                                                              | [https://www.vworld.kr/dev/v4api.do](https://www.vworld.kr/dev/v4api.do)                             |
| **Google Maps (비공식)**  | `js\nnew ol.source.XYZ({\n  url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'\n})\n`                                                                                                | [https://developers.google.com/maps/documentation](https://developers.google.com/maps/documentation) |
| **Google 위성지도**        | `js\nnew ol.source.XYZ({\n  url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'\n})\n`                                                                                                | 동일                                                                                                   |
| **Mapbox (스타일 가능)**    | `js\nnew ol.source.XYZ({\n  url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={YOUR_TOKEN}',\n  attributions: '© Mapbox',\n  tileSize: 512,\n  maxZoom: 18,\n})\n` | [https://docs.mapbox.com/api/maps/styles/](https://docs.mapbox.com/api/maps/styles/)                 |
| **Bing Maps**          | `js\nnew ol.source.BingMaps({\n  key: '{YOUR_KEY}',\n  imagerySet: 'Road'\n})\n`                                                                                                            | [https://learn.microsoft.com/en-us/bingmaps/](https://learn.microsoft.com/en-us/bingmaps/)           |
| **WMS (위성·GIS 데이터)**   | `js\nnew ol.source.TileWMS({\n  url: 'https://ahocevar.com/geoserver/wms',\n  params: { LAYERS: 'topp:states', TILED: true }\n})\n`                                                         | https://docs.openlayers.org/latest/apidoc/module-ol_source_TileWMS-TileWMS.html                      |


### 3) 좌표계 개념

- **좌표계·변환 요약표**

    | 구분                          | 좌표계                                | 사용 예시                 | 변환 필요 여부 및 방법                                                                              |
    | --------------------------- | ---------------------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
    | **OpenLayers**              | `EPSG:3857`                        | 기본 View, TileLayer    | ❌                                                                                          |
    | **VWorld 타일지도**             | `EPSG:3857`                        | XYZ, WMTS             | ❌                                                                                          |
    | **VWorld API 결과 (POI, 주소)** | `EPSG:4326`                        | 검색, Reverse Geocoding | ✅
    `fromLonLat([lon, lat])` 또는 `transform([lon, lat], 'EPSG:4326', 'EPSG:3857')`            |
    | **GeoJSON 파일**              | `EPSG:4326`                        | 데이터 표시                | ✅
    `readFeatures(geojson, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })` |
    | **GIS 서버 
    (예: GeoServer)**  | 다양 (보통 `EPSG:4326` 또는 `EPSG:5179`) | WMS/WFS 응답            | ✅ (상황에 따라)
    `transform(geometry, sourceProjection, 'EPSG:3857')`                            |


---


## 2. 구현하기


<aside data-icon="📃">

기능 정의

- 주요 기능
    1. 행정구역 출력 (V-WORLD API)
        1. 행정구역 마우스 이벤트
    2. 마커 출력
        1. 마커 클러스터링
        2. 마커 이벤트 → 오버레이 출력
- 기본 기능
    1. 지도 기본 동작
        1. zoom in & out / move
    2. zoom out 제한 (대한민국 영역까지만)

</aside>


<aside data-icon="📁">

프로젝트 구조


project/
├── css/
│   └── 스타일파일
├── node_modules/
├── script/
│   ├── jquery.library.js
│   └── map.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js

</aside>


### 1) V-World API (국토교통부)

- **인증키 발급** →  [https://www.vworld.kr/mypo/mypo_apiKey_i001.do](https://www.vworld.kr/mypo/mypo_apiKey_i001.do)
- ⚠️ **CORS 오류**
    - V-World API가 프록시 없이 직접 API 호출하면 CORS 오류가 발생
    → **vite.config.js** 설정

        ```javascript
        import { defineConfig } from 'vite';
        
        export default defineConfig({
            server: {
                port: 5173, // 원하는 포트 번호로 설정
                strictPort: true,
                proxy: {
                    '/api/vworld': {
                        target: 'https://api.vworld.kr',
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api\/vworld/, ''),
                        secure: false,
                        configure: (proxy, options) => {
                            proxy.on('proxyRes', (proxyRes, req, res) => {
                                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                            });
                        }
                    }
                }
            }
        });
        ```

- **행정구역 코드**
    > **V-WORLD API**  
    > [https://www.vworld.kr/dev/v4dv_2ddataguide2_s002.do?svcIde=adsigg](https://www.vworld.kr/dev/v4dv_2ddataguide2_s002.do?svcIde=adsigg)
    - **시군구 속성정보**

        | **속성명**    | **단일검색*** | **샘플데이터**    | **설명**         |
        | ---------- | --------- | ------------ | -------------- |
        | emdCd      | Y         | 11110101     | 읍면동 코드읍면동코드 조회 |
        | sig_cd     | Y         | 11650        | 행정구역코드         |
        | full_nm    | Y         | 서울특별시 서초구    | 행정구역명          |
        | sig_kor_nm | Y         | 서초구          | 시군구명           |
        | sig_eng_nm | N         | Seocho-gu    | 시군구 영문명        |
        | ag_geom    | N         | POLYGON(...) | GEOMETRY 데이터   |


        <aside data-icon="📎">
        
        행정구역코드는 국토행정부에서 제공되는 코드와 일치
        
        
        [%EA%B5%AD%ED%86%A0%EA%B5%90%ED%86%B5%EB%B6%80_%ED%96%89%EC%A0%95%EA%B5%AC%EC%97%AD%EB%B2%95%EC%A0%95%EB%8F%99%EC%BD%94%EB%93%9C_20250807.csv](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/efe41276-1616-48d5-8160-94e496bdeed6/%EA%B5%AD%ED%86%A0%EA%B5%90%ED%86%B5%EB%B6%80_%ED%96%89%EC%A0%95%EA%B5%AC%EC%97%AD%EB%B2%95%EC%A0%95%EB%8F%99%EC%BD%94%EB%93%9C_20250807.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMKDOJP3%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T092103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzUStX7QjKfS1cUT0vOyy%2Bo9aTj8eHJTZmr%2BbsIxhZSAiEAyvpKDGSZgYP%2FtNcceMcS1vpULEQFJRiReCYpvQyb7zcqiAQIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLBbt94vFNm7q2AsgCrcA4Bs6jv6Cg1zLOF%2BCrPRfifLp5PT8KrhmyKn1gZ2INMo31NaEMzgvY7PxqlX3JxTqsyU2qQUr%2FGqpJoM9lR817Ellg%2BFPJCusxdDKqzjc6uCFtpJCd0pHHQQxZH%2FnRYZv2RBNUcEYaYhHQbA3E6woea6wzlL0nWz2ZIk0xoVFpgUNN4vIbi4PgkIx3V%2FuMUDvJUTJZhP2SwK60w05wSuJljNG%2FibV8izE5YLwzbxEL%2F1Rk7BOGmFqrdBbHt3xGxxdRdFvoS6X%2BzK9Yzx0%2BhGM%2BfBO2Df%2BIXEcGBITv5MnHP9cYy1iZjkk2ZaHcLmLZ07abBa%2B9ObT4Lt3ZYnD%2FjUcf0ZvicgM8Zr2eMBt75TqgefgYUDB4eTBvisJq8lvL8DlFXXMnGOnN%2BpElhMN1wMHq0sD5D%2FyYT69PoxwVzi%2BoGMwcih7WW4F%2FidGK8JPNLHH7vQ7sM1N17Yc5Ceb%2BrydYq3ILGFoQnK58%2BE6LZlHmK0S5ZAnlJ3nJSBuW9fxT9vICWtI7LxgZcMGZ%2F6FrRsEIh7%2FrNj%2FEdgRJCIq1l1KCzOyCWuCiKjWgNuRS3%2BBMzwB4kY%2FoBUv2rsZIsQmRoR%2BPrvH2NQt%2Fdd42y%2B4ZzlnMtjBarDg2E1ENNi2evdMLGpiMsGOqUBDG%2B%2Bo9grKApTbnkjyXT6JeTfrfIjCYMNBx%2FL1pqxE9QmkVxcR7XsW029CMeUuykGuCcs%2BqmYCILEknt5QyUfIB9jQzGABwhjX4N2WF00Gt2S4zsr5TkPga5AbJqjkVMsbks0tdmZX%2FTrGlyiWbVaolpbPZEkSRMwC58Ri82%2FdjmMVKJ9eU2%2BfDzzgqCmZStiCjnosW8Q%2BcdHhQN%2FKNEyniUZvv72&X-Amz-Signature=6efaf2ecadc89a40ec69991c33ef7e5a0f9e681477b5609d540a9bd32fbf0afc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
        
        
        [https://www.data.go.kr/data/15122602/fileData.do?recommendDataYn=Y](https://www.data.go.kr/data/15122602/fileData.do?recommendDataYn=Y)
        
        </aside>


### 2) OpenLayers 지도

- 설치 및 실행

    ```shell
    # npm 설치
    npm install ol
    
    # 실행
    npm start
    ```

- 모듈 불러오기

    ```html
    <!-- style -->
    <link rel="stylesheet" href="node_modules/ol/ol.css" />
    ```


    ```javascript
    import Map from "ol/Map.js";
    import View from "ol/View.js";
    import TileLayer from "ol/layer/Tile.js";
    import VectorLayer from "ol/layer/Vector.js";
    import VectorSource from "ol/source/Vector.js";
    import Cluster from "ol/source/Cluster.js";
    import OSM from "ol/source/OSM.js";
    import XYZ from "ol/source/XYZ.js";
    import GeoJSON from "ol/format/GeoJSON.js";
    import { Style, Fill, Stroke, Circle as CircleStyle, Text } from "ol/style.js";
    import { fromLonLat } from "ol/proj.js";
    import Feature from "ol/Feature.js";
    import Point from "ol/geom/Point.js";
    import Overlay from "ol/Overlay.js";
    ```

- 지도 그리기
    1. 인증키 설정

        ```javascript
        // V-World API 설정
        const VWORLD_CONFIG = {
            key: "
        발급받은 브이월드 인증키
        ",
        };
        ```

    2. 마커 생성 및 스타일 정의 함수

        ```javascript
        // hover 상태 추적 변수
        let hoveredAdminFeature = null;
        let hoveredMarkerFeature = null;
        
        // 행정구역 기본 스타일
        const adminBoundaryStyle = new Style({
            stroke: new Stroke({
                color: "#3388ff",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(51, 136, 255, 0.1)",
            }),
        });
        
        // 행정구역 hover 스타일
        const adminBoundaryHoverStyle = new Style({
            stroke: new Stroke({
                color: "#FF6B6B",
                width: 3,
            }),
            fill: new Fill({
                color: "rgba(255, 107, 107, 0.2)",
            }),
        });
        
        // 행정구역 스타일 함수 
        const adminBoundaryStyleFunction = function (feature) {
            if (feature === hoveredAdminFeature) {
                return adminBoundaryHoverStyle;
            }
            return adminBoundaryStyle;
        };
        
        // 행정구역 렌더 순서 함수 (hover된 feature를 나중에 렌더링하여 앞에 표시)
        const adminBoundaryRenderOrder = function (featureA, featureB) {
            // hover된 feature를 나중에 렌더링 (더 높은 값 = 나중에 렌더링 = 앞에 표시)
            if (featureA === hoveredAdminFeature) {
                return 1;
            }
            if (featureB === hoveredAdminFeature) {
                return -1;
            }
            return 0;
        };
        
        // V-World 행정구역 경계 벡터 레이어
        const adminBoundaryLayer = new VectorLayer({
            source: new VectorSource(),
            style: adminBoundaryStyleFunction,
            renderOrder: adminBoundaryRenderOrder,
            zIndex: 5,
        });
        
        // 원본 마커 Source (클러스터 내부에서 사용)
        const markerSource = new VectorSource();
        
        // 클러스터 Source
        const clusterSource = new Cluster({
            distance: 50,
            source: markerSource,
        });
        
        // 클러스터 스타일 함수
        const clusterStyle = function (feature) {
            const features = feature.get("features");
            const size = features ? features.length : 0;
            const isHovered = feature === hoveredMarkerFeature;
        
            if (size > 1) {
                // 여러 개 클러스터: 숫자 표시
                return new Style({
                    image: new CircleStyle({
                        radius: isHovered ? 18 : 16,
                        fill: new Fill({ color: isHovered ? "#FF4444" : "#FF6B6B" }),
                        stroke: new Stroke({ 
                            color: isHovered ? "#FF444488" : "#FF6B6B88", 
                            width: isHovered ? 12 : 10 
                        }),
                    }),
                    text: new Text({
                        text: size.toString(),
                        fill: new Fill({ color: "#fff" }),
                        font: "bold 12px sans-serif",
                    }),
                });
            } else if (size === 1) {
                // 단일 마커
                return new Style({
                    image: new CircleStyle({
                        radius: isHovered ? 8 : 6,
                        fill: new Fill({ color: isHovered ? "#FF4444" : "#FF6B6B" }),
                        stroke: new Stroke({ 
                            color: "#ffffff", 
                            width: isHovered ? 3 : 2 
                        }),
                    }),
                });
            }
        
            return null;
        };
        
        // 마커 레이어
        const markerLayer = new VectorLayer({
            source: clusterSource,
            style: clusterStyle,
            zIndex: 10,
        });
        
        // V-World Geocoding API를 사용한 주소 -> 좌표 변환
        function geocodeAddress(address) {
            const url = new URL("/api/vworld/req/address", window.location.origin);
            url.searchParams.append("service", "address");
            url.searchParams.append("request", "getcoord");
            url.searchParams.append("version", "2.0");
            url.searchParams.append("crs", "epsg:4326");
            url.searchParams.append("address", address);
            url.searchParams.append("refine", "true");
            url.searchParams.append("simple", "false");
            url.searchParams.append("format", "json");
            url.searchParams.append("type", "road");
            url.searchParams.append("key", VWORLD_CONFIG.key);
        
            return fetch(url)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return response.json();
                })
                .then(function (data) {
                    if (data.response.status === "OK" && data.response.result) {
                        const result = data.response.result.point;
                        return {
                            lon: parseFloat(result.x),
                            lat: parseFloat(result.y),
                        };
                    }
        
                    throw new Error("좌표를 찾을 수 없습니다");
                })
                .catch(function (error) {
                    console.error(`Geocoding 실패 (${address}):`, error.message);
                    return null;
                });
        }
        
        // 마커 추가 함수 (병렬 처리로 속도 개선)
        async function addMarkers() {
        
            // 모든 주소에 대해 병렬로 geocoding 수행
            const promises = busanAddresses.map(function (location) {
                return geocodeAddress(location.address)
                    .then(function (coords) {
                        if (coords) {
                            const coordinate = fromLonLat([coords.lon, coords.lat]);
                            return new Feature({
                                geometry: new Point(coordinate),
                                name: location.name,
                                address: location.address,
                            });
                        }
                        return null;
                    })
                    .catch(function (error) {
                        console.error(`마커 생성 실패 (${location.name}):`, error);
                        return null;
                    });
            });
        
            // 모든 Promise가 완료될 때까지 대기
            const results = await Promise.all(promises);
        
            // null이 아닌 마커만 필터링
            const featuresToAdd = results.filter(function (feature) {
                return feature !== null;
            });
        
            const successCount = featuresToAdd.length;
            const failCount = busanAddresses.length - successCount;
        
            // 원본 markerSource에 한 번에 추가 (클러스터가 제대로 계산되도록)
            if (featuresToAdd.length > 0) {
                markerSource.clear();
                markerSource.addFeatures(featuresToAdd);
                markerSource.changed();
            }
        
            console.log(`마커 생성 완료: ${successCount}개 성공, ${failCount}개 실패`);
        }
        
        // 마커 생성 초기화
        function initMap() {
            // 부산 행정구역 경계 먼저 로드
            loadAdminBoundary()
                .then(function () {
                    console.log("부산 행정구역 경계 로드 완료");
                    return addMarkers();
                })
                .catch(function (error) {
                    console.error("초기화 실패:", error);
                });
        }
        ```

    3. 지도 생성

        ```javascript
        // 지도 생성
        const map = new Map({
            renderer: 'webgl',
            layers: [
                // v-world 지도 불러오기
                new TileLayer({
                  source: new XYZ({
                        url: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_CONFIG.key}/Base/{z}/{y}/{x}.png`,
                    }),
                }),
                // source: new OSM(), // OpenStreetMap API 사용
                adminBoundaryLayer,
                markerLayer,
            ],
            target: "map",
            view: new View({
                center: [14135490, 4518348],
                zoom: 7,
                minZoom: 7, // 최소 줌 레벨 (대한민국 크기)
                maxZoom: 19, // 최대 줌 레벨
            }),
        });
        ```

    4. 오버레이 (팝업) 생성

        ```javascript
        // 팝업 오버레이 생성
        const $popup = $('<div class="ol-popup"></div>');
        $popup.append('<div class="ol-popup-closer" id="popup-closer">✖</div>');
        $popup.append('<div class="ol-popup-content" id="popup-content"></div>');
        $("body").append($popup);
        
        const overlay = new Overlay({
            element: $popup[0],
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });
        map.addOverlay(overlay);
        
        // 팝업 닫기 버튼 이벤트
        $("#popup-closer").on("click", function () {
            overlay.setPosition(undefined);
            return false;
        });
        ```

    5. 마커 및 행정구역 마우스 이벤트

        ```javascript
        // 마커 클릭 이벤트 (클러스터 처리 포함)
        map.on("click", function (evt) {
          // 1) 마커 클릭 우선 처리
          const feature = map.forEachFeatureAtPixel(
            evt.pixel,
            function (feature, layer) {
              if (layer === markerLayer) {
                return feature;
              }
            }
          );
        
          if (!feature) {
            // 마커가 아니면 이후 행정구역 클릭 처리로 진행
          } else {
            // 클러스터 피처에서 실제 피처들 가져오기
            const features = feature.get("features");
            if (!features || features.length === 0) {
              // 마커 처리 불가 시 행정구역 처리 진행
            } else if (features.length === 1) {
              // 단일 마커: 팝업 표시
              const singleFeature = features[0];
              const coordinate = singleFeature.getGeometry().getCoordinates();
              const name = singleFeature.get("name");
              const address = singleFeature.get("address");
        
              $("#popup-content").html(
                `<strong>${name}</strong><br/><div class="contents">${address}</div>`
              );
              overlay.setPosition(coordinate);
              return; // 마커 처리가 끝났으므로 종료
            } else {
              // 클러스터: 줌 레벨 확인
              const view = map.getView();
              const currentZoom = view.getZoom();
              const maxZoom = 18;
        
              // 최대 줌에 도달했거나 충분히 확대된 경우 리스트 표시
              if (currentZoom >= maxZoom - 1 || currentZoom >= 16) {
                // 팝업에 모든 마커 리스트 표시
                let content =
                  '<div class="cluster-popup"><strong>이 위치의 장소들</strong><ul>';
                features.forEach(function (f) {
                  const name = f.get("name");
                  const address = f.get("address");
                  content += `<li><strong>${name}</strong><br/><div class="contents">${address}</div></li>`;
                });
                content += "</ul></div>";
        
                $("#popup-content").html(content);
                overlay.setPosition(feature.getGeometry().getCoordinates());
                return; // 마커 처리가 끝났으므로 종료
              } else {
                // 아직 여유가 있으면 줌인
                overlay.setPosition(undefined);
                view.animate({
                  zoom: currentZoom + 1,
                  center: feature.getGeometry().getCoordinates(),
                  duration: 300,
                });
                return; // 마커 처리가 끝났으므로 종료
              }
            }
          }
        
          // 2) 마커가 아니면 행정구역 클릭 처리
          const adminFeature = map.forEachFeatureAtPixel(
            evt.pixel,
            function (feature, layer) {
              if (layer === adminBoundaryLayer) {
                return feature;
              }
            }
          );
        
          if (adminFeature) {
            const adminName =
              adminFeature.get("sig_kor_nm") ||
              adminFeature.get("full_nm") ||
              adminFeature.get("adm_nm") ||
              "행정구역";
            alert(adminName);
            return;
          }
        });
        
        // 마우스 커서 변경 및 hover 효과 (rAF로 스로틀링)
        let currentAdminFeature = null;
        let _pointerScheduled = false;
        let _lastPointerPixel = null;
        
        function processPointerMove() {
          _pointerScheduled = false;
          const pixel = _lastPointerPixel;
          if (!pixel) return;
        
          // 1) 마커 우선 탐지 (캔버스 readback 1회)
          const markerFeature = map.forEachFeatureAtPixel(
            pixel,
            function (feature, layer) {
              if (layer === markerLayer) {
                return feature;
              }
            }
          );
        
          // 2) 마커가 없을 때만 행정구역 탐지 (필요 시에만 추가 readback)
          let adminFeature = null;
          if (!markerFeature) {
            adminFeature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
              if (layer === adminBoundaryLayer) {
                return feature;
              }
            });
          }
        
          // hover 상태 업데이트 및 스타일 변경
          let styleChanged = false;
        
          if (markerFeature !== hoveredMarkerFeature) {
            hoveredMarkerFeature = markerFeature;
            styleChanged = true;
          }
          if (adminFeature !== hoveredAdminFeature) {
            hoveredAdminFeature = adminFeature;
            styleChanged = true;
          }
        
          if (styleChanged) {
            markerLayer.changed();
            adminBoundaryLayer.changed();
          }
        
          if (markerFeature) {
            $("#map").css("cursor", "pointer");
            currentAdminFeature = null;
          } else if (adminFeature) {
            $("#map").css("cursor", "pointer");
            currentAdminFeature = adminFeature;
          } else {
            $("#map").css("cursor", "");
            currentAdminFeature = null;
            overlay.setPosition(undefined);
          }
        }
        
        map.on("pointermove", function (evt) {
          if (evt.dragging) {
            return; // 드래그 중일 때는 hit-detection 생략
          }
          _lastPointerPixel = map.getEventPixel(evt.originalEvent);
          if (!_pointerScheduled) {
            _pointerScheduled = true;
            requestAnimationFrame(processPointerMove);
          }
        });
        
        // V-World Data API로 행정구역 경계 가져오기
        function loadAdminBoundary() {
          const url = new URL("/api/vworld/req/data", window.location.origin);
          url.searchParams.append("service", "data");
          url.searchParams.append("request", "GetFeature");
          url.searchParams.append("data", "LT_C_ADSIGG_INFO");
          url.searchParams.append("key", VWORLD_CONFIG.key);
          url.searchParams.append("domain", "http://localhost:5173");
          url.searchParams.append("geometry", "true");
          url.searchParams.append("size", "1000");
          url.searchParams.append("page", "1");
          url.searchParams.append("attrFilter", "sig_cd:like:26"); // 부산광역시 (26)
        
          return fetch(url)
            .then(function (response) {
              if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
              }
              return response.json();
            })
            .then(function (data) {
              console.log("V-World Data API 응답:", data);
        
              if (
                data.response &&
                data.response.status === "OK" &&
                data.response.result
              ) {
                const geojson = {
                  type: "FeatureCollection",
                  features: data.response.result.featureCollection.features,
                };
        
                const features = new GeoJSON().readFeatures(geojson, {
                  dataProjection: "EPSG:4326",
                  featureProjection: "EPSG:3857",
                });
        
                adminBoundaryLayer.getSource().addFeatures(features);
        
                if (features.length > 0) {
                  const extent = adminBoundaryLayer.getSource().getExtent();
                  map.getView().fit(extent, { padding: [50, 50, 50, 50] });
                }
        
                console.log(`${features.length}개의 행정구역 경계가 로드되었습니다.`);
                return features;
              } else {
                throw new Error("행정구역 데이터를 찾을 수 없습니다.");
              }
            })
            .catch(function (error) {
              console.error("행정구역 데이터 로드 실패:", error);
              throw error;
            });
        }
        ```

    6. init

        ```javascript
        // jQuery ready 이벤트
        $(document).ready(function () {
            // V-World API 초기화
            if (VWORLD_CONFIG.key !== "YOUR_VWORLD_API_KEY") {
                initMap();
            } else {
                console.warn("V-World API 키를 설정해주세요. http://www.vworld.kr 에서 발급받을 수 있습니다.");
            }
        
            // jQuery를 사용한 줌 버튼 이벤트
            $("#zoom-out").on("click", function () {
                const view = map.getView();
                view.setZoom(view.getZoom() - 1);
            });
        
            $("#zoom-in").on("click", function () {
                const view = map.getView();
                view.setZoom(view.getZoom() + 1);
            });
        });
        ```

    7. 목업 데이터

        ```javascript
        // 부산 주소 데이터
        const busanAddresses = [
            { name: "삼성전기 부산사업장", address: "부산광역시 강서구 녹산산단382로 40" },
            { name: "롯데케미칼 부산영업소", address: "부산광역시 해운대구 센텀중앙로 97" },
            { name: "BNK부산은행 본점", address: "부산광역시 남구 문현금융로 30" },
            { name: "부산항만공사", address: "부산광역시 중구 대교로 122" },
            { name: "현대자동차 부산서비스센터", address: "부산광역시 연제구 중앙대로 1168" },
            { name: "기아자동차 부산지점", address: "부산광역시 연제구 반송로 18" },
            { name: "한국수자원공사 부산권지사", address: "부산광역시 연제구 법원로 12" },
            { name: "한국전력공사 부산본부", address: "부산 부산진구 중앙대로666번길 43" },
            { name: "부산교통공사 본사", address: "부산광역시 부산진구 중앙대로644번길 20" },
            { name: "삼성SDS 부산물류센터", address: "부산광역시 강서구 유통단지1로 41" },
            { name: "한진택배 부산터미널", address: "부산광역시 사상구 학장로 145" },
            { name: "부산항국제물류센터", address: "부산광역시 남구 신선로 132" },
            { name: "현대미포조선 부산지사", address: "부산광역시 해운대구 센텀중앙로 78" },
            { name: "한국선급 부산본부", address: "부산광역시 해운대구 APEC로 30" },
            { name: "한국해양대학교", address: "부산광역시 영도구 태종로 727" },
            { name: "부산디자인진흥원", address: "부산광역시 해운대구 센텀동로 57" },
            { name: "부산정보산업진흥원", address: "부산광역시 해운대구 센텀중앙로 55" },
            { name: "부산경제진흥원", address: "부산광역시 해운대구 센텀중앙로 79" },
            { name: "부산창조경제혁신센터", address: "부산광역시 해운대구 센텀중앙로 79" },
            { name: "LS전선 부산지점", address: "부산광역시 사상구 학감대로 220" },
            { name: "동서식품 부산공장", address: "부산광역시 사상구 학장로 297" },
            { name: "한국남부발전 본사", address: "부산광역시 남구 문현금융로 40" },
            { name: "한국자산관리공사 부산본사", address: "부산광역시 남구 문현금융로 40" },
            { name: "부산도시공사", address: "부산광역시 부산진구 신천대로 156" },
        ];
        ```

