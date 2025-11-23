pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ketanjedhe'
        BACKEND_IMAGE = 'ketanjedhe/devops-automation-backend:latest'
        FRONTEND_IMAGE = 'ketanjedhe/devops-automation-frontend:latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Ketanjedhe/devops-automation-dashboard.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                        docker login -u %USER% -p %PASS%
                    """
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                bat """
                    cd backend
                    docker build -t %BACKEND_IMAGE% .
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat """
                    cd frontend
                    docker build -t %FRONTEND_IMAGE% .
                """
            }
        }

        stage('Push Images') {
            steps {
                bat """
                    docker push %BACKEND_IMAGE%
                    docker push %FRONTEND_IMAGE%
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([file(credentialsId: 'ec2-ssh-key', variable: 'SSH_KEY')]) {
                    // Windows: fix key permissions and deploy via SSH
                    bat """
                        echo Fixing key permissions...
                        
                        powershell -Command ^
                        "Get-Acl %SSH_KEY% | Set-Acl -Path %SSH_KEY%; ^
                         icacls %SSH_KEY% /inheritance:r; ^
                         icacls %SSH_KEY% /grant:r $env:USERNAME:F"

                        echo Starting Deployment...

                        ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i %SSH_KEY% ubuntu@3.110.49.133 ^
                        "cd devops-automation-dashboard && docker compose pull && docker compose down && docker compose up -d"
                    """
                }
            }
        }
    }
}
