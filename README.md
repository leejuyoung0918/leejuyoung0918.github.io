# Juyoung Lee · Engineering Portfolio

[한국어 포트폴리오](https://leejuyoung0918.github.io/) · [English](https://leejuyoung0918.github.io/en/)

프로젝트별 문제, 본인 역할, 설계 판단, 확인된 결과와 한계를 담는 정적 포트폴리오입니다. HTML·CSS·JavaScript와 GitHub Pages를 사용합니다.

## 개발 도구와 검증 경험을 먼저 보기

| 프로젝트 | 확인할 역량 | 소스와 근거 |
|---|---|---|
| SBOM Vulnerability Propagation | CLI·분석 라이브러리, 오프라인 회귀, 근거 추적, CI | [저장소](https://github.com/leejuyoung0918/sbom-vulnerability-propagation) · [사례](sbom.html) |
| PR-EIG Theoretical Experiments | 재현 가능한 실험 자동화, 수치 회귀, 패키징 | [저장소](https://github.com/leejuyoung0918/pr-eig-theoretical-experiments) · [사례](preference-learning.html) |
| BlindSpotter | 모델 비교, 불균형 평가, 장면 단위 데이터 분할 | [저장소](https://github.com/leejuyoung0918/BlindSpotter) · [사례](blindspotter.html) |
| SmartBottle | BLE 진단 화면, 인터페이스 의미와 통합 시험 | [저장소](https://github.com/leejuyoung0918/SmartBottle) · [사례](smart-bottle.html) |
| MED-MAX | 팀 UI·클라이언트 통합과 사용자 흐름 | [저장소](https://github.com/leejuyoung0918/medMax) · [사례](med-max.html) |

## 문서 작성 원칙

경험은 **문제 → 선택 이유와 대안 → 구현 → 근거가 있는 결과 → 학습과 한계** 순서로 설명합니다. 팀 결과와 개인 역할, 기대 효과와 관측 결과, 과거 기록과 새로 실행한 검증을 구분합니다. 테스트 수나 성능 수치를 적을 때는 조건과 원본 결과를 함께 연결합니다.

## 로컬 확인

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

[로컬 페이지](http://127.0.0.1:8000/)에서 한국어·영어 페이지, 내부 링크, 이미지와 모바일 화면을 확인합니다. 별도 package 설치나 build 단계가 없는 정적 사이트입니다.

## 구조와 유지보수

- `index.html`, `cv.html`: 소개·프로젝트 목록·이력
- `*.html`: 한국어 프로젝트 사례
- `en/`: 영어 페이지
- `assets/`: 이미지
- `style.css`, `nav.js`, `highlights.js`: 공통 표현과 상호작용

이번 변경은 저장소 README의 정보 구조 정리입니다. 사이트의 기존 사례 본문과 배포 설정은 별도의 자료이며, 자동화된 사이트 테스트 통과를 의미하지 않습니다.
