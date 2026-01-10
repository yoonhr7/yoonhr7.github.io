---
title: "Google Map API 연동하기 (Next.js)"
date: "2025-08-04"
notionId: "245a784e-4dc2-80c6-b068-f82328dfdcad"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
```typescript
export default function Home() {
		 /**
     * Google Map
     */
    const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
    const TARGET_ADDRESS = "인청광역시 서구 사렴로 10번길 28"; // ← 원하는 주소 입력
    const mapRef = useRef<HTMLDivElement>(null);

    const CUSTOM_MAP_STYLE = [
        {
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
        },
        {
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
        },
    ];
    useEffect(() => {
        const initMap = async () => {
            if (!window.google || !mapRef.current) return;

            const geocoder = new window.google.maps.Geocoder();

            // 주소 → 좌표 변환
            geocoder.geocode({ address: TARGET_ADDRESS }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;

                    const map = new window.google.maps.Map(mapRef.current!, {
                        center: location,
                        zoom: 15,
                        styles: CUSTOM_MAP_STYLE, // ← 여기서 스타일 적용
                    });

                    new window.google.maps.Marker({
                        position: location,
                        map,
                        title: TARGET_ADDRESS,
                    });
                } else {
                    console.error("Geocode error:", status);
                }
            });
        };

        // 스크립트 로딩 체크
        const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
        if (existingScript) {
            initMap();
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
    }, []);
    return (
     {/* google map */}
	      <div>
            <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
        </div>
    );
 }
```

