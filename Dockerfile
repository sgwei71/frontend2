# Node.js 20.11.1 버전을 사용한 베이스 이미지
FROM node:20.11.1

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 애플리케이션이 사용할 포트 노출
ENV PORT=3002
EXPOSE 3002

# Next.js 애플리케이션을 시작
CMD ["npm", "start"]
