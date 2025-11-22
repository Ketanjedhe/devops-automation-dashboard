pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ketanjedhe'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/devops-automation-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops-automation-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Ketanjedhe/devops-automation-dashboard.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat "docker login -u %USER% -p %PASS%"
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                bat '''
                cd backend
                docker build -t %DOCKERHUB_USER%/devops-automation-backend:latest .
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat '''
                cd frontend
                docker build -t %DOCKERHUB_USER%/devops-automation-frontend:latest .
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                bat "docker push %DOCKERHUB_USER%/devops-automation-backend:latest"
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat "docker push %DOCKERHUB_USER%/devops-automation-frontend:latest"
            }
        }
    }
}
