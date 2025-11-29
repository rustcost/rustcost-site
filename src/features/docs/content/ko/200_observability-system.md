# Observability란 무엇인가?

## 1. Abstract

### Observability는

시스템이 외부로 방출하는 Telemetry 신호를 기반으로 내부 상태를 추론할 수 있게 하는 구조적 특성으로 정의된다(CNCF, 2023).
기존 연구와 기술 문헌에 따르면, Observability는 계측을 통한 자료 수집(Instrumentation), 수집된 신호의 모니터링, 상관관계 및 맥락 분석, 그리고 근본 원인 규명(root-cause diagnosis)으로 구성되는 단계적 절차를 통해 실현된다(IBM, 2023; Google SRE, 2020).

특히 Root-Cause Diagnosis 단계는 증상 식별, 영향 분석, 신호 기반의 점진적 범위 축소(Drill-Down), 가설 생성 및 검증 활동을 포함하며, 이는 여러 문헌에서 문제 분석 절차의 핵심 구성 요소로 반복적으로 제시된다(Google SRE, 2020).
이와 같은 절차적 흐름은 Observability가 단순한 지표 및 로그의 열람을 넘어 시스템의 동작 메커니즘을 분석하고 이상 원인을 도출할 수 있도록 하는 분석적 기반임을 시사한다.

본 문서에서 제안한 Observability 계층 모델은 CNCF Glossary, IBM Observability Pillars, Google SRE의 Troubleshooting Methodology 등 기존 문헌에서 확인되는 공통 개념을 정합적으로 구조화한 것으로, Observability의 핵심 구성 요소와 문제 진단 절차를 단계적으로 설명하기 위한 하나의 개념적 프레임워크로 기능한다.

![observability_hierarchy](/src/features/docs/content/images/observability_hierarchy.svg)

> ***“Observability is a system property that defines the degree to which the system can generate actionable insights. It allows users to understand a system’s state from these external outputs and take (corrective) action.”***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

'Observability'는 시스템이 실행 가능한 통찰력을 생성할 수 있는 정도를 정의하는 시스템 속성입니다. 이를 통해 사용자는 외부 출력을 통해 시스템 상태를 파악하고 시정 조치를 취할 수 있습니다.

> ***"Computer systems are measured by observing low-level signals such as CPU time, memory, disk space, and higher-level and business signals, including API response times, errors, transactions per second, etc. These observable systems are observed (or monitored) through specialized tools, so-called observability tools."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

컴퓨터 시스템은 CPU 시간, 메모리, 디스크 공간과 같은 저수준 신호와 API 응답 시간, 오류, 초당 트랜잭션 수(TPS) 등의 고수준 및 비즈니스 신호를 관찰하여 측정합니다. 이러한 관찰 가능한 시스템은 관찰 도구(Observability tools)를 통해 관찰(또는 모니터링)됩니다.

> ***"Observable systems yield meaningful, actionable data to their operators, allowing them to achieve favorable outcomes (faster incident response, increased developer productivity) and less toil and downtime."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

관찰 가능한 시스템은 운영자에게 의미 있고 실행 가능한 데이터를 제공하여 더 빠른 사고 대응과 개발자 생산성 증가 등 유리한 결과를 얻고, 수고와 가동 중지 시간을 줄일 수 있습니다.

> ***"Consequently, how observable a system is will significantly impact its operating and development costs."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

결과적으로 시스템을 얼마나 관찰할 수 있는지에 따라 운영 및 개발 비용에 큰 영향을 미칩니다.

![observability_hierarchy](/src/features/docs/content/images/observability_hierarchy_detail.svg)

## 2. Core Components of Observability

### 2.1 Telemetry Data Collection & Instrumentation

시스템이 관찰 가능해지기 위한 첫 단계는, 내부 상태를 외부 신호로 드러내는 계측(Instrumentation)입니다. CNCF와 IBM은 관찰 가능성을 구성하는 핵심 요소로 Log, Metric, Trace를 명확히 정의하고 있으며, 이러한 신호들이 Telemetry Data Collection의 출발점이 됩니다.

> ***“Observability uses three pillars of telemetry data — metrics, logs and traces”***[observability-pillars_ibm.com](https://www.ibm.com/think/insights/observability-pillars)

> ***"Computer systems are measured by observing low-level signals such as CPU time, memory, disk space, and higher-level and business signals, including API response times, errors, transactions per second, etc."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 두 문구는 Telemetry가 Observability의 근간이며, 저수준(리소스), 고수준(비즈니스) 신호 모두가 계측 대상임을 명확히 보여줍니다.

### 2.2. Monitoring System

Telemetry가 수집되면, 다음 단계는 시스템의 상태를 지속적으로 감시하고 이상을 탐지하는 Monitoring입니다. CNCF와 IBM 문서는 "모니터링은 Observability의 일부이며 동일한 텔레메트리 데이터를 기반으로 한다"고 정의합니다.

> ***“Both monitoring and observability use the same type of telemetry data… An observability platform takes monitoring a step further. … The three pillars are: Logs, Metrics, Traces.”***[observability-pillars_ibm.com](https://www.ibm.com/think/insights/observability-pillars)

> ***"These observable systems are observed (or monitored) through specialized tools, so-called observability tools."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 문장들은 모니터링이 Observability의 하위 기능이며 Telemetry 데이터를 사용해 시스템을 관찰하는 단계임을 분명히 해줍니다.

### 2.3. Correlation & Context Analysis

단순 수집 및 모니터링을 넘어, Observability의 핵심 가치는 다양한 출력을 상관관계(Correlation)와 맥락(Context) 속에서 해석하여 시스템 상태를 정확히 이해할 수 있게 해주는 단계에 있습니다. CNCF 정의는 "시스템 상태를 파악하고(corrective action) 시정 조치를 할 수 있게 한다"고 설명합니다.

> ***"It allows users to understand a system’s state from these external outputs and take (corrective) action."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

> ***"Observable systems yield meaningful, actionable data to their operators, allowing them to achieve favorable outcomes (faster incident response, increased developer productivity) and less toil and downtime."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 문장들은 Observability가 단순 모니터링이 아니라 데이터를 해석하여 의미 있는 맥락을 도출하는 과정임을 명확히 뒷받침합니다.

### 2.4. Root Cause Diagnosis / Actionable Insight Generation

Observability의 최종 목적은 원인 분석과 실행 가능한 통찰력(actionable insights)을 도출하는 것입니다. CNCF는 Observability를 "실행 가능한 통찰력을 생성하는 능력"으로 정의하며, 운영 비용과 개발 효율성까지 직접적으로 영향을 준다고 강조합니다.

> ***"Observability is a system property that defines the degree to which the system can generate actionable insights."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

> ***"Consequently, how observable a system is will significantly impact its operating and development costs."***[Observability-glossary.cncf.io](https://glossary.cncf.io/observability/?utm_source=chatgpt.com)

이 두 문구는 Observability의 목적이 문제 해결 능력 강화와 운영·개발 비용 절감임을 직접적으로 뒷받침합니다.

또한 Observability가 이러한 actionable insights를 실제로 만들어내는 과정은 Google SRE와 CNCF가 공통적으로 강조하는 6단계 Root-Cause Diagnosis 프로세스를 기반으로 합니다.

1. 증상(Symptom) 탐지 - 알람, 대시보드를 통해 이상을 발견
2. 영향(Impact) 평가 - 어떤 서비스/SLO에 영향이 있는지 파악
3. 신호(Drill-down) 분석 - Metric -> Logs -> Traces 순으로 범위를 좁힘
4. 가설(Hypothesis) 생성 - 가능한 원인을 나열
5. 검증(Verification) - Telemetry 기반으로 가설을 배제하거나 확증
6. 근본 원인 확정 및 조치(Insight/Remediation)로 actionable insights를 도출

[What is observability 2.0 - CNCF](https://www.cncf.io/blog/2025/01/27/what-is-observability-2-0/?utm_source=chatgpt.com) \
[Effective Troubleshooting - sre.google](https://sre.google/sre-book/effective-troubleshooting/?utm_source=chatgpt.com)

이 프로세스를 반복적으로 수행함으로써 Observability는 단순 Monitoring 수준을 넘어서 실제 문제 해결 능력 강화와 운영·개발 비용 절감이라는 목적을 달성하게 됩니다.

## 3. Conclusion

Observability는 시스템이 방출하는 다양한 Telemetry 신호를 기반으로 내부 상태를 추론하고 문제의 원인을 규명할 수 있도록 하는 구조적 속성이다. 본 문서에서 제시된 Observability 계층 모델은 계측, 모니터링, 상관·맥락 분석, 근본 원인 진단으로 이어지는 일련의 절차가 기존 문헌(CNCF, IBM, Google SRE)에서 제시되는 개념들과 일치함을 보여준다.

특히 Root-Cause Diagnosis를 중심으로 한 분석 과정은 Observability가 단순한 모니터링 기능을 넘어, 복잡한 시스템에서 발생하는 이상 신호를 해석하고 실행 가능한 통찰력을 도출할 수 있게 하는 핵심 메커니즘임을 시사한다. 이와 같은 구조적 접근은 시스템 신뢰성 향상, 문제 해결 시간 단축, 운영 및 개발 비용 절감과 같은 실질적 효과를 제공하며, 현대적 분산 시스템 환경에서 Observability를 필수적인 기술적 능력으로 위치시키고 있다.



\*본 문서는 ChatGPT 5.1의 도움을 받아 제작되었습니다.