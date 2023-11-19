
## Description

##### 객관식 설문지
##### 활용 기술스택
- typescript
- nest.js
- graphql
- typeorm
- postgresql

## Installation

```bash
$ npm install
```

## .env :  db환경 변수 설정
#### -> 반드시 .env 파일 생성하고 환경 변수 설정해야 서버가 문제없이 실행됩니다.
```bash
DB_HOST: 
DB_USERNAME: 
DB_PASSWORD: 
DB_DATABASE: 
DB_PORT:
```

## 서버 실행

```bash
$ npm run start
```

## 설문지 CRUD : graphql - 요청
```bash
http://localhost:4000/graphql
```
<a href="https://mire-wound-f4b.notion.site/3-3e24b2f72de74cd1b901abe66490a1e0?pvs=4">graphql 요청 - 노션 정리</a>

## flow
 설문지 등록 -> 문항 등록 -> 선택지 등록 -> 답변 등록 -> 설문지 조회: 완성된 설문지 조회

