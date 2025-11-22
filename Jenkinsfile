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
                    sh "docker login -u ${USER} -p ${PASS}"
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                cd backend
                docker build -t ${BACKEND_IMAGE}:latest .
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                cd frontend
                docker build -t ${FRONTEND_IMAGE}:latest .
                """
            }
        }

        stage('Push Backend Image') {
            steps {
                sh "docker push ${BACKEND_IMAGE}:latest"
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh "docker push ${FRONTEND_IMAGE}:latest"
            }
        }
    }
}
